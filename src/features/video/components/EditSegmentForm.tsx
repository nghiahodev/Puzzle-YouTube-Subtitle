import { JSONContent } from '@tiptap/react'
import { Box, Button, FormControl } from '@mui/material'
import RHFTextField from '~/common/components/RHFTextField'
import TextEditor from '~/common/components/TextEditor'
import {
  Delete,
  Merge,
  Science,
  VerticalAlignBottom,
} from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'
import { EditSegmentFormBody, EditSegmentFormProps } from '../videoTypes'
import { useEffect } from 'react'
import { parseJsonContent } from '~/common/utils/tiptap'

const EditSegmentForm = ({
  segments,
  index,
  onSeekTo,
}: EditSegmentFormProps) => {
  const { control, handleSubmit, reset, getValues, setError, trigger } =
    useForm({
      defaultValues: {
        text: '',
        translate: '',
        start: 0,
        end: 0,
        note: { type: 'doc', content: [] } as JSONContent,
      },
    })

  const validateTime = (start: number, end: number) => {
    const prev = segments[index - 1]
    const next = segments[index + 1]
    let isValid = true

    if (start >= end) {
      setError('start', {
        message: 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc',
      })
      setError('end', {
        message: 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu',
      })
      isValid = false
    }

    if (prev && start <= prev.end) {
      setError('start', {
        message: `Thời gian bắt đầu phải lớn hơn (${prev.end}s)`,
      })
      isValid = false
    }

    if (next && end >= next.start) {
      setError('end', {
        message: `Thời gian kết thúc phải bé hơn (${next.start}s)`,
      })
      isValid = false
    }

    return isValid
  }

  const onSubmit = async (body: EditSegmentFormBody) => {
    const { start, end } = body
    const isValid = validateTime(start, end)
    if (isValid) console.log(body)
  }

  const handleTimeTest = async () => {
    const checkRules = await trigger(['start', 'end'])

    if (!checkRules) return
    const { start, end } = getValues()
    const isValid = validateTime(start, end)
    if (!isValid) return
    onSeekTo({ start, end })
  }

  useEffect(() => {
    if (index === -1) return
    console.log('reset')
    const currentSegment = segments[index]
    reset({
      text: currentSegment.text || '',
      translate: currentSegment.translate || '',
      start: currentSegment.start || 0,
      end: currentSegment.end || 0,
      note: parseJsonContent(currentSegment.note),
    })
  }, [index])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        label='Nội dung'
        name='text'
        control={control}
        rules={{ required: 'Không để trống trường này' }}
        variant='standard'
        multiline
      />
      <RHFTextField
        label='Bản dịch'
        name='translate'
        control={control}
        rules={{ required: 'Không để trống trường này' }}
        variant='standard'
        multiline
      />
      <Box display='flex' gap={2}>
        <RHFTextField
          label='Bắt đầu (giây)'
          name='start'
          control={control}
          rules={{
            required: 'Không để trống trường này',
            min: { value: 0, message: 'Giá trị phải ≥ 0' },
            validate: (value) => !isNaN(Number(value)) || 'Phải là số hợp lệ',
          }}
          variant='standard'
          fullWidth
        />
        <RHFTextField
          label='Kết thúc (giây)'
          name='end'
          control={control}
          rules={{
            required: 'Không để trống trường này',
            min: { value: 0, message: 'Giá trị phải ≥ 0' },
            validate: (value) => !isNaN(Number(value)) || 'Phải là số hợp lệ',
          }}
          variant='standard'
          fullWidth
        />
        <Button
          variant='outlined'
          onClick={handleTimeTest}
          sx={{
            minWidth: 40,
            minHeight: 40,
            px: 2,
            alignSelf: 'center',
          }}
          disabled={index === -1}
        >
          <Science />
        </Button>
        <Button
          variant='outlined'
          sx={{
            minWidth: 40,
            minHeight: 40,
            px: 2,
            alignSelf: 'center',
          }}
          disabled={index === -1}
        >
          <Merge />
        </Button>
        <Button
          variant='outlined'
          color='error'
          sx={{
            minWidth: 40,
            minHeight: 40,
            px: 2,
            alignSelf: 'center',
          }}
          disabled={index === -1}
        >
          <Delete />
        </Button>
      </Box>
      <Controller
        control={control}
        name='note'
        render={({ field }) => (
          <TextEditor
            onChange={field.onChange}
            value={field.value}
            placeholder='Chú thích nếu có...'
          />
        )}
      />
      <FormControl
        margin='normal'
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button variant='outlined' type='submit' disabled={index === -1}>
          {`Cập nhật phụ đề ${index + 1 || ''}`}
        </Button>
      </FormControl>
    </form>
  )
}

export default EditSegmentForm
