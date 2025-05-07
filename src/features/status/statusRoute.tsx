import { RouteObject } from 'react-router-dom'
import ErrorPage from './pages/StatusPage'

const statusRoutes: RouteObject[] = [
  {
    path: '/403',
    element: (
      <ErrorPage
        code={403}
        message='Forbidden'
        description='Bạn không có quyền truy cập trang này.'
      />
    ),
  },
  {
    path: '/404',
    element: (
      <ErrorPage
        code={404}
        message='Not found'
        description='Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.'
      />
    ),
  },
]

export default statusRoutes
