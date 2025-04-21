import { Typography, Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ForbiddenPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => navigate('/')
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant='h2' color='error' fontWeight='bold' gutterBottom>
        403 - Forbidden
      </Typography>
      <Typography variant='h6' gutterBottom>
        Bạn không có quyền truy cập trang này.
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

export default ForbiddenPage
