import { publicApi } from '~/config/axios'
import { GoogleLogin, LoginForm, Signup } from './authTypes'

const authApi = {
  googleLogin(body: GoogleLogin) {
    return publicApi.post('/auth/google-login', body)
  },
  signup(body: Signup) {
    return publicApi.post('/auth/signup', body)
  },
  login(body: LoginForm) {
    return publicApi.post('/auth/login', body)
  },
}

export default authApi
