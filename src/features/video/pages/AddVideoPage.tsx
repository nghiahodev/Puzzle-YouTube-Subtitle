import { Box, Button, FormControl, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import RHFTextField from '~/common/components/RHFTextField'
import { AddVideoBody } from '../videoTypes'
import videoApi from '../videoApis'
import myToast from '~/config/toast'

const AddVideoPage = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      youtubeUrl: '',
    },
  })

  const onSubmit = async (body: AddVideoBody) => {
    const id = myToast.loading()
    try {
      await videoApi.addVideo(body)
      myToast.update(id, 'Thêm mới thành công', 'success')
    } catch (error: any) {
      console.log(error)
      myToast.update(id, error?.data?.message, 'error')
    }
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
      })}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: 2 }}>
          <Typography color='text.primary' fontWeight='bold' component='span'>
            Lưu ý hệ thống chỉ hỗ trợ:
          </Typography>
          <Typography color='text.secondary'>
            1. Video có phụ đề ( Subtitles / CC )
            <br />
            2. Video công khai ( Tránh video riêng tư, giới hạn độ tuổi )
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <RHFTextField
              label='Đường dẫn đến video trên YouTube'
              name='youtubeUrl'
              control={control}
              rules={{
                required: 'Không để trống trường này',
              }}
            />

            <FormControl>
              <Box display='flex' justifyContent='center'>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  sx={{
                    px: 5,
                    py: 1,
                    textWrap: 'nowrap',
                  }}
                >
                  Thêm mới videos
                </Button>
              </Box>
            </FormControl>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default AddVideoPage
