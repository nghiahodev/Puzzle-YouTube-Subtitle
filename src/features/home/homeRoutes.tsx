import { RouteObject } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import AdminHomePage from './pages/AdminHomePage'
import RequiredAuth from '~/common/components/RequiredAuth'
import HomePage from './pages/HomePage'

const homeRoutes: RouteObject[] = [
  {
    element: <RequiredAuth role='admin' />,
    children: [
      {
        element: <MainLayout />,
        children: [{ path: '/admin', element: <AdminHomePage /> }],
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [{ path: '', element: <HomePage /> }],
  },
]

export default homeRoutes
