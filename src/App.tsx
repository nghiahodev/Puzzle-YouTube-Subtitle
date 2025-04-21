import { CssBaseline } from '@mui/material'
import AppRoutes from './AppRoutes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadUser } from './features/auth/slices/userSlice'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  return (
    <>
      <CssBaseline />
      <AppRoutes />
      <ToastContainer />
    </>
  )
}

export default App
