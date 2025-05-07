import { Typography, Container, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '~/redux/store'

interface StatusPageProps {
  code: 403 | 404
  message: string
  description: string
}

const StatusPage = ({ code, message, description }: StatusPageProps) => {
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)

  const handleGoHome = () => {
    if (user?.role === 'admin') navigate('/admin')
    else navigate('/')
  }

  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant='h2' color='error' fontWeight='bold' gutterBottom>
        {code} - {message}
      </Typography>
      <Typography variant='h6' gutterBottom>
        {description}
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

export default StatusPage
