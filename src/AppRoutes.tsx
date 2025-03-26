import { useRoutes } from 'react-router-dom'
import homeRoutes from './features/home/homeRoutes'

const AppRoutes = () => {
  // Aggregate the route list from different features
  return useRoutes([...homeRoutes])
}

export default AppRoutes
