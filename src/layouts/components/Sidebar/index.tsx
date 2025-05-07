import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { Box, ListSubheader } from '@mui/material'
import SidebarItem from './SidebarItem'
import { Add, Edit, Home } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { toggleSidebar } from '~/layouts/slices/sidebarSlice'

const drawerWidth = 260

const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen)
  const dispatch = useDispatch()

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: (theme) => theme.app.headerHeight,
          zIndex: (theme) => theme.zIndex.appBar - 1,
        },
      }}
      variant='persistent'
      anchor='left'
      open={isOpen}
      onClose={() => dispatch(toggleSidebar())}
    >
      <List>
        <Box>
          <SidebarItem icon={<Home />} text='Trang chủ' path='/admin' />
        </Box>
      </List>
      <List>
        <ListSubheader>
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            Videos
          </Typography>
        </ListSubheader>
        <Box>
          <SidebarItem
            icon={<Add />}
            text='Thêm mới'
            path='/admin/videos/add'
          />
          <SidebarItem
            icon={<Edit />}
            text='Chỉnh sửa'
            path='/admin/videos/edit'
          />
        </Box>
      </List>
      <Divider />
    </Drawer>
  )
}

export default Sidebar
