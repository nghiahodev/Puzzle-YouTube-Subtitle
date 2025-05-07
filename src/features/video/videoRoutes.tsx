import { RouteObject } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import AddVideoPage from './pages/AddVideoPage'
import RequiredAuth from '~/common/components/RequiredAuth'

const videoRoutes: RouteObject[] = [
  {
    path: 'admin/videos',
    element: <RequiredAuth role='admin' />,
    children: [
      {
        element: <MainLayout />,
        children: [{ path: 'add', element: <AddVideoPage /> }],
      },
    ],
  },
]

export default videoRoutes
