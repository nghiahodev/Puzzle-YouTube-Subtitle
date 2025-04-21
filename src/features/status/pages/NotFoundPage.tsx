import { Typography, Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => navigate('/')

  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant='h2' color='error' fontWeight='bold' gutterBottom>
        404 - Không tìm thấy trang
      </Typography>
      <Typography variant='h6' gutterBottom>
        Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={handleGoHome}
        sx={{ mt: 4 }}
      >
        Quay về trang chủ
      </Button>
    </Container>
  )
}

export default NotFoundPage
