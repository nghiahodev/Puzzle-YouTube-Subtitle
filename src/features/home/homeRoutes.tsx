import { RouteObject } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import AdminHomePage from './pages/AdminHomePage'
import RequiredAuth from '~/components/RequiredAuth'
import HomePage from './pages/HomePage'

const homeRoutes: RouteObject[] = [
  {
    path: 'admin',
    element: <RequiredAuth role='admin' />,
    children: [
      {
        element: <MainLayout />,
        children: [{ path: '', element: <AdminHomePage /> }],
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [{ path: '', element: <HomePage /> }],
  },
]

export default homeRoutes
