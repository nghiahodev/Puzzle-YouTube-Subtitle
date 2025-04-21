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
import RHFTextField from '~/common/components/RHFTextField'
import {
  InfoOutlined,
  Lock,
  PersonOutline,
  Visibility,
} from '@mui/icons-material'
import { useState } from 'react'
import { Signup } from '../authTypes'
import authApi from '../authApis'
import myToast from '~/config/toast'

const SignupPage = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
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

  const onSubmit = async (data: Signup) => {
    const id = myToast.loading()
    try {
      await authApi.signup(data)
      myToast.update(id, 'Đăng ký thành công!', 'success')
    } catch (error: any) {
      console.log(error)
      myToast.update(id, error?.message, 'error')
    }
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: `calc(100vh - ${theme.app.headerHeight}px)`,
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
            rules={{
              required: 'Không thể thiếu tên người dùng',
            }}
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
            rules={{
              required: 'Không thể thiếu tên đăng nhập!',
            }}
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
            rules={{
              required: 'Không thể thiếu mật khẩu!',
            }}
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

export default SignupPage
