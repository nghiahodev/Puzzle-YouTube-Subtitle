import {
  Box,
  Typography,
  Paper,
  InputAdornment,
  FormControl,
  Button,
} from '@mui/material'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import authApi from '../authApis'
import { useDispatch } from 'react-redux'
import { login } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import myToast from '~/config/toast'
import { useForm } from 'react-hook-form'
import RHFTextField from '~/common/components/RHFTextField'
import { Lock, PersonOutline, Visibility } from '@mui/icons-material'
import { useState } from 'react'
import { getError } from '~/common/utils/error'
import authErrors from '../authErrors'
import { zodResolver } from '@hookform/resolvers/zod'
import authSchemas, { LoginInput } from '../authSchemas'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchemas.login),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleMouseDown = () => setShowPassword(true)
  const handleMouseUp = () => setShowPassword(false)
  const handleMouseLeave = () => setShowPassword(false)

  const handleGoRegister = () => navigate('/register')

  const onSubmit = async (body: LoginInput) => {
    const id = myToast.loading()
    try {
      const { user, token } = await authApi.login(body)
      dispatch(login({ user, token }))
      myToast.update(id, 'Đăng nhập thành công', 'success')
    } catch (error: any) {
      console.log(error)
      myToast.update(id, getError(error?.code, authErrors), 'error')
    }
  }

  const handleSuccess = async (response: CredentialResponse) => {
    const toastId = myToast.loading()

    const credential = response?.credential
    if (!credential) {
      myToast.update(toastId, 'Xác thực không hợp lệ', 'error')
      return
    }

    try {
      const { user, token } = await authApi.googleOauth({ credential })
      dispatch(login({ user, token }))
      myToast.update(toastId, 'Đăng nhập thành công', 'success')
    } catch (error: any) {
      console.error(error)
      myToast.update(toastId, getError(error?.code, authErrors), 'error')
    }
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `calc(100vh - ${theme.app.headerHeight})`,
      })}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 500,
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            control={control}
            name='username'
            placeholder='Tên đăng nhập'
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <PersonOutline
                      sx={{
                        color: errors.username ? 'error.main' : '',
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
          <RHFTextField
            control={control}
            name='password'
            placeholder='Mật khẩu'
            type={showPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <Lock
                      sx={{
                        color: errors.username ? 'error.main' : '',
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position='end'
                    sx={{
                      cursor: 'pointer',
                      '&:active': { color: 'primary.main' },
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Visibility />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Typography
            variant='body2'
            align='right'
            style={{ cursor: 'pointer' }}
            onClick={handleGoRegister}
          >
            Bạn chưa có tài khoản ?
          </Typography>
          <FormControl margin='normal'>
            <Button size='large' variant='outlined' type='submit'>
              Đăng nhập
            </Button>
          </FormControl>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log('Google Login Fail')}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginPage
