import axios from 'axios'
import queryString from 'query-string'

const createAxiosInstance = (isPrivate = false) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    paramsSerializer: (params) => queryString.stringify(params), // Use query-string to handle nest object
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use(
    async (config) => {
      if (isPrivate) {
        // Handle private
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (isPrivate && error.response?.status === 401) {
        // Handle private
      }
      return Promise.reject(error.response)
    },
  )

  return instance
}

export const publicApi = createAxiosInstance(false)
export const privateApi = createAxiosInstance(true)
