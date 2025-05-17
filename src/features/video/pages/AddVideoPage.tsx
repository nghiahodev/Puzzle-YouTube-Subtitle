import { Box, Button, FormControl, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import RHFTextField from '~/common/components/RHFTextField'
import videoApi from '../videoApis'
import myToast from '~/config/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import videoSchemas, { AddVideoInput } from '../videoSchemas'
import { getError } from '~/common/utils/error'
import videoErrors from '../videoErrors'

const AddVideoPage = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(videoSchemas.addVideo),
    defaultValues: {
      youtubeUrl: '',
    },
  })

  const onSubmit = async (input: AddVideoInput) => {
    const id = myToast.loading()
    const { youtubeId } = videoSchemas.addVideoInfer.parse(input)
    try {
      await videoApi.addVideo({ youtubeId })
      myToast.update(id, 'Thêm video thành công', 'success')
    } catch (error: any) {
      console.log(error)
      myToast.update(id, getError(error?.code, videoErrors), 'error')
    }
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        pt: 2,
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
            />

            <FormControl>
              <Box display='flex' justifyContent='center'>
                <Button
                  variant='outlined'
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
