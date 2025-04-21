import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { cloneElement, ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface SidebarItemProps {
  icon: ReactElement
  text: string
  path: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, path }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isMatch = location.pathname === path.split('?')[0]

  const handleGoPath = () => {
    if (!isMatch) navigate(path)
  }

  return (
    <ListItem disablePadding sx={{ display: 'block' }} onClick={handleGoPath}>
      <ListItemButton>
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 1,
            color: isMatch ? 'primary.main' : '',
          }}
        >
          {cloneElement(icon)}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{
            '& .MuiTypography-root': {
              fontSize: 14,
              color: isMatch ? 'primary.main' : '',
              fontWeight: isMatch ? 'bold' : '',
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}
export default SidebarItem
