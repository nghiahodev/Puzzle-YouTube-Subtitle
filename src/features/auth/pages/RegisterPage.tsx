import {
  Box,
  Typography,
  Paper,
  InputAdornment,
  FormControl,
  Button,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import RHFTextField from '~/common/components/RHFTextField'
import {
  InfoOutlined,
  Lock,
  PersonOutline,
  Visibility,
} from '@mui/icons-material'
import { useState } from 'react'
import authApi from '../authApis'
import myToast from '~/config/toast'
import authSchemas, { RegisterBody, RegisterInput } from '../authSchemas'
import { getError } from '~/common/utils/error'
import authErrors from '../authErrors'

const RegisterPage = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchemas.register),
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  })

  const handleMouseDown = () => setShowPassword(true)
  const handleMouseUp = () => setShowPassword(false)
  const handleMouseLeave = () => setShowPassword(false)

  const handleGoLogin = () => navigate('/login')

  const onSubmit = async (body: RegisterInput) => {
    const id = myToast.loading()
    try {
      await authApi.register(body)
      myToast.update(id, 'Đăng ký thành công!', 'success')
    } catch (error: any) {
      console.log(error)
      myToast.update(id, getError(error?.code, authErrors), 'error')
    }
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: `calc(100vh - ${theme.app.headerHeight})`,
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
            name='name'
            placeholder='Tên hoặc biệt danh'
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <InfoOutlined
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
            onClick={handleGoLogin}
          >
            Về trang đăng nhập ?
          </Typography>
          <FormControl margin='normal'>
            <Button size='large' variant='outlined' type='submit'>
              Đăng ký
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Box>
  )
}

export default RegisterPage
