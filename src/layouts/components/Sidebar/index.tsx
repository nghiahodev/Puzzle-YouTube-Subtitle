import { styled } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { Box, ListSubheader } from '@mui/material'
import SidebarItem from './SidebarItem'
import { Add, Menu } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { toggleSidebar } from '~/layouts/slices/sidebarSlice'

const drawerWidth = 260

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen)
  const dispatch = useDispatch()

  const handleDrawerClose = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='temporary'
      anchor='left'
      open={isOpen}
      onClose={() => dispatch(toggleSidebar())}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <Menu />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListSubheader>
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            Videos
          </Typography>
        </ListSubheader>
        <Box>
          <SidebarItem
            icon={<Add />}
            text='Thêm mới YouTube videos'
            path='/admin/videos/add'
          />
        </Box>
      </List>
      <Divider />
    </Drawer>
  )
}

export default Sidebar
