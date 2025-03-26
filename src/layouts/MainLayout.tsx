import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const MainLayout = () => {
  return (
    <Box>
      <Header />
      <Sidebar />
      <Box
        sx={{
          ml: (theme) => `calc(${theme.spacing(7)})`,
        }}
      >
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
