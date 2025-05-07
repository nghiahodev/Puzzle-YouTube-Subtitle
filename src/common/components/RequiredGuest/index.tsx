import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '~/redux/store'

const RequiredGuest = () => {
  const { token, user } = useSelector((state: RootState) => state.auth)
  const previousUrlRef = useRef(localStorage.getItem('previousUrl'))

  if (token) {
    const previousUrl = previousUrlRef.current
    if (previousUrl) {
      localStorage.removeItem('previousUrl')
      return <Navigate to={previousUrl} replace />
    }
    if (user?.role === 'admin') {
      return <Navigate to='/admin' replace />
    }
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

export default RequiredGuest
