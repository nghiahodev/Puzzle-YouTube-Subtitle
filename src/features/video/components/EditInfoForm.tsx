import { JSONContent } from '@tiptap/react'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Typography,
} from '@mui/material'
import TextEditor from '~/common/components/TextEditor'
import { Controller, useForm } from 'react-hook-form'
import { EditInfoFormBody, EditInfoFormProps } from '../videoTypes'
import { parseJsonContent } from '~/common/utils/tiptap'

const EditInfoForm = ({ video }: EditInfoFormProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      summary: parseJsonContent(video.summary),
    },
  })

  const onSubmit = async (body: EditInfoFormBody) => {
    console.log(body)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth margin='normal'>
        <FormLabel>Tiêu đề</FormLabel>
        <Typography
          variant='body1'
          sx={{
            bgcolor: 'action.disabledBackground',
            px: 2,
            py: 1,
            borderRadius: 1,
            pointerEvents: 'none', // tránh tương tác
            '&:hover': {
              bgcolor: 'action.disabledBackground', // giữ nguyên khi hover
            },
          }}
        >
          {video.title}
        </Typography>
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <FormLabel>Danh mục</FormLabel>
        <Typography
          variant='body1'
          sx={{
            bgcolor: 'action.disabledBackground',
            px: 2,
            py: 1,
            borderRadius: 1,
            pointerEvents: 'none', // tránh tương tác
            '&:hover': {
              bgcolor: 'action.disabledBackground', // giữ nguyên khi hover
            },
          }}
        >
          {video.categories.join(', ') || 'Không có danh mục'}
        </Typography>
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <FormLabel>Thời lượng (giây)</FormLabel>
        <Typography
          variant='body1'
          sx={{
            bgcolor: 'action.disabledBackground',
            px: 2,
            py: 1,
            borderRadius: 1,
            pointerEvents: 'none', // tránh tương tác
            '&:hover': {
              bgcolor: 'action.disabledBackground', // giữ nguyên khi hover
            },
          }}
        >
          {video.duration}
        </Typography>
      </FormControl>
      <Controller
        control={control}
        name='summary'
        rules={{
          validate: (value: JSONContent) => {
            const hasMeaningfulText = value?.content?.some(
              (node) =>
                node.type === 'paragraph' &&
                node.content?.some((n) => n.type === 'text' && n.text?.trim()),
            )

            return hasMeaningfulText || 'Không để trống trường này'
          },
        }}
        render={({ field, fieldState }) => (
          <FormControl fullWidth margin='normal' error={!!fieldState?.error}>
            <FormLabel sx={{ marginBottom: '8px', fontWeight: 500 }}>
              Nội dung chính
            </FormLabel>
            <TextEditor
              onChange={field.onChange}
              value={field.value}
              placeholder='Nội dung chính của video...'
            />
            {fieldState?.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <FormControl
        margin='normal'
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button variant='outlined' type='submit'>
          {`Cập nhật thông tin`}
        </Button>
      </FormControl>
    </form>
  )
}

export default EditInfoForm
