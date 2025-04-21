import { RouteObject } from 'react-router-dom'
import ForbiddenPage from './pages/ForbiddenPage'
import NotFoundPage from './pages/NotFoundPage'

const statusRoutes: RouteObject[] = [
  { path: '/403', element: <ForbiddenPage /> },
  { path: '/404', element: <NotFoundPage /> },
]

export default statusRoutes
