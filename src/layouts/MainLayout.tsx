import { Box, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <Box>
      <Typography variant='h1'>MainLayout</Typography>
      <Box>
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
