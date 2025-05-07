import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '~/redux/store'
import Loading from '../Loading'
import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'

interface RequiredAuthProps {
  role: 'admin' | 'member'
}

const RequiredAuth = ({ role }: RequiredAuthProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { token, user, loading } = useSelector((state: RootState) => state.auth)
  const [openDialog, setOpenDialog] = useState(false)

  const handleLogin = () => navigate('/login')

  useEffect(() => {
    if (!token && !loading) {
      console.log('hello')
      setOpenDialog(true)
      localStorage.setItem('previousUrl', location.pathname)
    }
  }, [token, loading])

  if (loading) {
    return <Loading />
  }

  if (user && user?.role !== role) return <Navigate to='/403' replace />

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='xs'
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 8, // Làm cho góc bo tròn
            boxShadow: 24, // Thêm bóng đổ cho dialog
            padding: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            color: '#1976d2', // Màu tiêu đề
            fontWeight: 'bold',
          }}
        >
          Thông báo
        </DialogTitle>
        <DialogContent>
          <Typography
            variant='body1'
            sx={{
              textAlign: 'center', // Canh giữa nội dung
              color: '#333', // Màu chữ đậm
            }}
          >
            Hết hạn phiên đăng nhập. Vui lòng đăng nhập lại
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleLogin}
            color='primary'
            variant='contained'
            sx={{
              backgroundColor: '#1976d2', // Màu nền nút
              '&:hover': {
                backgroundColor: '#115293', // Màu khi hover
              },
              paddingX: 4, // Điều chỉnh khoảng cách bên trong nút
            }}
          >
            Đăng nhập
          </Button>
        </DialogActions>
      </Dialog>
      <Outlet />
    </>
  )
}

export default RequiredAuth
