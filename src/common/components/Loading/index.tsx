import { CircularProgress, Backdrop } from '@mui/material'

const Loading = () => {
  return (
    <Backdrop
      sx={{
        backgroundColor: 'transparent',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress color='primary' size={50} />
    </Backdrop>
  )
}

export default Loading
