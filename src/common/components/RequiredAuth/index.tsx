import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '~/redux/store'
import Loading from '../Loading'

interface RequiredAuthProps {
  role: 'admin' | 'user'
}

const RequiredAuth = ({ role }: RequiredAuthProps) => {
  const { token, user, loading } = useSelector((state: RootState) => state.user)

  if (loading) {
    return <Loading />
  }

  // If the user is not logged in
  if (!token) return <Navigate to='/login' replace />

  // If the user is logged in but not an admin
  if (user?.role !== role) return <Navigate to='/403' replace />

  // User is allowed to access
  return <Outlet />
}

export default RequiredAuth
