import { ExitToApp, Menu as MenuIcon } from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import myToast from '~/config/toast'
import { logout } from '~/features/auth/slices/authSlice'
import { toggleSidebar } from '~/layouts/slices/sidebarSlice'
import { RootState } from '~/redux/store'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleGoLogin = () => {
    navigate('/login')
  }

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar())
  }

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleCloseMenu()
    navigate('/')
    dispatch(logout())
    myToast.success('Đăng xuất thành công!')
  }
  return (
    <AppBar
      color='inherit'
      sx={{
        position: 'sticky',
        top: 0,
      }}
    >
      <Toolbar
        sx={(theme) => ({
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: {
            sm: theme.app.headerHeight,
          },
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton aria-label='open drawer' onClick={handleToggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Typography
              color='primary'
              sx={{
                fontWeight: 'bold',
              }}
            >
              Puzzle
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              <Typography variant='body1'>
                Xin chào,{' '}
                <Typography
                  color='primary'
                  component='span'
                  sx={{ fontWeight: 'bold' }}
                >
                  {user?.name}
                </Typography>
              </Typography>
              <IconButton size='small' onClick={handleClickAvatar}>
                <Avatar
                  src={user?.picture}
                  alt='User Avatar'
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      minWidth: '300px',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              >
                <MenuItem onClick={handleLogout} sx={{ typography: 'body2' }}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  Đăng xuất
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button variant='outlined' onClick={handleGoLogin}>
                Đăng nhập
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default Header
