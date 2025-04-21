import { RouteObject } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainLayout from '~/layouts/MainLayout'
import SignupPage from './pages/SignupPage'

const authRoutes: RouteObject[] = [
  {
    path: '',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
]

export default authRoutes
