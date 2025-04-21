import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: {
    id: string
    name: string
    picture?: string
    role: 'admin' | 'user'
  } | null
  token: string | null
  expiresAt: number | null
  loading: boolean
}

const initialState: UserState = {
  user: null,
  token: null,
  expiresAt: null,
  loading: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: UserState['user']
        token: string
        expiresAt: number
      }>,
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.expiresAt = action.payload.expiresAt
      state.loading = false

      // Optional: persist to localStorage
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('expiresAt', action.payload.expiresAt.toString())
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.expiresAt = null
      state.loading = false

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('expiresAt')
    },
    loadUser: (state) => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      const expiresAt = localStorage.getItem('expiresAt')

      if (token && user && expiresAt) {
        state.token = token
        state.user = JSON.parse(user)
        state.expiresAt = parseInt(expiresAt, 10)
      }
      state.loading = false
    },
  },
})

export const { login, logout, loadUser } = userSlice.actions
export default userSlice.reducer
