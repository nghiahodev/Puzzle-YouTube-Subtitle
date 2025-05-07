import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'

const MainLayout = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen)
  return (
    <Box>
      <Header />
      <Sidebar />
      <Box>
        <Box
          sx={{ ml: isOpen ? '260px' : 0, transition: 'margin-left 0.2s ease' }}
        >
          <Container maxWidth='lg'>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
