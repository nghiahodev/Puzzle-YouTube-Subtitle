import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import queryString from 'query-string'
import env from './env'
import { logout } from '~/features/auth/slices/authSlice'
import store from '~/redux/store'

// Flag to track if a token refresh request is already in progress
// Prevents sending multiple refresh token requests at the same time
let isRefreshing = false

// A queue holds the requests that received a 401 error while the token refresh process is in progress.
let failedQueue: {
  resolve: (token: string) => void
  reject: (error: any) => void
}[] = []

// Handle all pending requests in the queue after the token refresh either succeeds or fails
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

const createAxiosInstance = (isPrivate = false) => {
  const instance = axios.create({
    baseURL: env.API_URL,
    paramsSerializer: (params) => queryString.stringify(params), // Use query-string to handle nest object
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use(
    async (
      config: InternalAxiosRequestConfig,
    ): Promise<InternalAxiosRequestConfig> => {
      if (isPrivate) {
        const token = localStorage.getItem('token')
        if (token) config.headers.set('Authorization', `Bearer ${token}`)
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  instance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      const originalRequest = error.config
      const status = error?.response?.status

      // originalRequest._retry mark the original request as retried to prevent infinite loops in case the refresh also fails
      if (isPrivate && status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                resolve(instance(originalRequest))
              },
              reject: (error) => reject(error),
            })
          })
        }

        isRefreshing = true

        try {
          const { data } = await axios.get(
            `${env.API_URL}/auth/refresh-token`,
            {
              withCredentials: true,
            },
          )
          const newToken = data.accessToken
          localStorage.setItem('token', newToken)
          processQueue(null, newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return instance(originalRequest)
        } catch (error) {
          store.dispatch(logout())
          processQueue(error, null)
          return Promise.reject((error as AxiosError)?.response || error)
        } finally {
          isRefreshing = false
        }
      }
      return Promise.reject(error?.response?.data || error)
    },
  )

  return instance
}

export const publicApi = createAxiosInstance(false)
export const privateApi = createAxiosInstance(true)
