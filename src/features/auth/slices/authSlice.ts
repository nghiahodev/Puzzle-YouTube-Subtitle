import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../authTypes'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: AuthState['user']
        token: string
      }>,
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.loading = false

      // Optional: persist to localStorage
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.loading = false

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    loadUser: (state) => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        state.token = token
        state.user = JSON.parse(user)
      }
      state.loading = false
    },
  },
})

export const { login, logout, loadUser } = authSlice.actions
export default authSlice.reducer
