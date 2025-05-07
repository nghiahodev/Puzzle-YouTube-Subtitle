import { publicApi } from '~/config/axios'
import {
  GoogleOauthBody,
  LoginBody,
  LoginResponse,
  RegisterBody,
} from './authTypes'

const authApi = {
  googleOauth(body: GoogleOauthBody): Promise<LoginResponse> {
    return publicApi.post('/auth/oauth/google', body, {
      withCredentials: true,
    })
  },
  register(body: RegisterBody) {
    return publicApi.post('/auth/register', body)
  },
  login(body: LoginBody): Promise<LoginResponse> {
    return publicApi.post('/auth/login', body, {
      withCredentials: true,
    })
  },
}

export default authApi
