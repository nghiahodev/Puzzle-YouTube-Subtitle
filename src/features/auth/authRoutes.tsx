import { RouteObject } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainLayout from '~/layouts/MainLayout'
import RegisterPage from './pages/RegisterPage'
import RequiredGuest from '~/common/components/RequiredGuest'

const authRoutes: RouteObject[] = [
  {
    path: '',
    element: <RequiredGuest />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
    ],
  },
]

export default authRoutes
