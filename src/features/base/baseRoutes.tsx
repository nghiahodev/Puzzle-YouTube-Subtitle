import { RouteObject } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import HomePage from './pages/HomePage'

const baseRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [{ path: '/', element: <HomePage /> }],
  },
]

export default baseRoutes
