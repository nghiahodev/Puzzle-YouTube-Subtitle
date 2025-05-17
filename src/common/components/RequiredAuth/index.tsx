import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '~/redux/store'
import Loading from '../Loading'
import { useEffect, useState } from 'react'
import CustomDialog from '../CustomDialog'

interface RequiredAuthProps {
  role: 'admin' | 'member'
}

const RequiredAuth = ({ role }: RequiredAuthProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { token, user, loading } = useSelector((state: RootState) => state.auth)
  const [openDialog, setOpenDialog] = useState(false)

  const handleConfirm = () => navigate('/login')

  useEffect(() => {
    if (!token && !loading) {
      setOpenDialog(true)
      localStorage.setItem('previousUrl', location.pathname)
    }
  }, [token, loading])

  if (loading) {
    return <Loading />
  }
  if (!user) return <Navigate to='/login' replace />
  if (user && user?.role !== role) return <Navigate to='/403' replace />

  return (
    <>
      <CustomDialog
        open={openDialog}
        title='Phiên đăng nhập đã hết hạn'
        message='Vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ '
        onConfirm={handleConfirm}
      />
      <Outlet />
    </>
  )
}

export default RequiredAuth
