import { useRoutes } from 'react-router-dom'
import baseRoutes from './features/base/baseRoutes'

const AppRoutes = () => {
  // Aggregate the route list from different features
  return useRoutes([...baseRoutes])
}

export default AppRoutes
