import { Navigate, useRoutes } from 'react-router-dom'
import statusRoutes from './features/status/statusRoute'
import authRoutes from './features/auth/authRoutes'
import homeRoutes from './features/home/homeRoutes'

const AppRoutes = () => {
  // Aggregate the route list from different features
  return useRoutes([
    ...statusRoutes,
    ...homeRoutes,
    ...authRoutes,
    { path: '*', element: <Navigate to='/404' replace /> },
  ])
}

export default AppRoutes
