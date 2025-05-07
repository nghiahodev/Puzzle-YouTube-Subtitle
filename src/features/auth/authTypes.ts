export interface RegisterBody {
  name: string
  username: string
  password: string
}

export interface GoogleOauthBody {
  credential: string
}

export interface LoginBody {
  username: string
  password: string
}

export interface User {
  id: string
  name: string
  picture?: string
  role: 'admin' | 'user'
}

export interface LoginResponse {
  user: User
  token: string
}
