import { RouteObject } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import AddVideoPage from './pages/AddVideoPage'
import RequiredAuth from '~/common/components/RequiredAuth'
import EditVideoPage from './pages/EditVideoPage'

const videoRoutes: RouteObject[] = [
  {
    path: 'admin/videos',
    element: <RequiredAuth role='admin' />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: 'add', element: <AddVideoPage /> },
          { path: 'edit/:videoId', element: <EditVideoPage /> },
        ],
      },
    ],
  },
]

export default videoRoutes
