import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material'

interface CustomDialogProps {
  open: boolean
  onClose?: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'OK',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 8,
          boxShadow: 24,
          padding: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          color: '#1976d2',
          fontWeight: 'bold',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography
          variant='body1'
          sx={{
            textAlign: 'center',
            color: '#333',
          }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={onConfirm}
          color='primary'
          variant='contained'
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#115293',
            },
            paddingX: 4,
          }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog
