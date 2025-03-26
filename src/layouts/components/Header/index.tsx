import { Menu } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { toggleSidebar } from '~/layouts/slices/sidebarSlice'

const Header = () => {
  const dispatch = useDispatch()
  return (
    <AppBar
      sx={{
        position: 'sticky',
        top: 0,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: { sm: 56 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            aria-label='open drawer'
            onClick={() => dispatch(toggleSidebar())}
          >
            <Menu />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Typography
              variant='h4'
              sx={{
                fontWeight: 'bold',
              }}
            >
              TYS
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default Header
