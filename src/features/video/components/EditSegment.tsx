import { Box, Button, FormControl } from '@mui/material'
import RHFTextField from '~/common/components/RHFTextField'
import TextEditor from '~/common/components/TextEditor'
import { Delete, Merge, PlayArrow } from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import videoSchemas, { EditSegmentInput } from '../videoSchemas'
import { SegmentType, VideoType } from '~/common/types'
import videoApi from '../videoApis'
import { useParams } from 'react-router-dom'
import RHFNumberBoundField from './NumberBoundField'
import myToast from '~/config/toast'
import { getError } from '~/common/utils/error'
import videoErrors from '../videoErrors'

interface EditSegmentProps {
  segments: SegmentType[]
  index: number
  duration: number
  onSeekTo: (range: { start: number; end: number } | null) => void
  onUpdate: React.Dispatch<React.SetStateAction<VideoType | null>>
}

const EditSegment = ({
  segments,
  index,
  duration,
  onSeekTo,
  onUpdate,
}: EditSegmentProps) => {
  const { videoId } = useParams()
  const { control, handleSubmit, reset, getValues, trigger, setValue } =
    useForm({
      resolver: zodResolver(videoSchemas.editSegment),
      defaultValues: {
        text: '',
        translate: '',
        start: 0,
        end: 0,
      },
    })

  const onSubmit = async (input: EditSegmentInput) => {
    const id = myToast.loading()
    if (!videoId) return
    const segment = segments[index]
    const editedSegment = {
      ...segment,
      ...input, // overide the fields in the input
    }
    console.log(editedSegment)
    try {
      const result = await videoApi.editSegment(
        { videoId, segmentId: editedSegment.id },
        editedSegment,
      )
      console.log(result)
      myToast.update(id, 'Lưu thay đổi phụ đề thành công', 'success')
    } catch (error: any) {
      console.log(error)
      myToast.update(id, getError(error?.code, videoErrors), 'error')
    }
  }

  const handleTimeTest = async () => {
    const checkRules = await trigger(['start', 'end'])
    if (!checkRules) return

    const { start, end } = getValues()
    const startNum = Number(start)
    const endNum = Number(end)

    onSeekTo({ start: startNum, end: endNum })
  }

  const handleMerge = () => {
    onUpdate((prev) => {
      if (!prev) return prev

      const segments = [...prev.segments]
      if (index < 0 || index >= segments.length - 1) return prev

      const current = segments[index]
      const next = segments[index + 1]

      const merged: SegmentType = {
        id: current.id, // hoặc tạo ID mới nếu cần
        start: current.start,
        end: next.end,
        text: `${current.text} | ${next.text}`.trim(),
        translate: `${current.translate} | ${next.translate}`.trim(),
        note: current.note || next.note, // ưu tiên giữ note đầu, hoặc gộp nếu muốn
      }

      segments.splice(index, 2, merged) // xoá 2 phần tử và chèn phần tử gộp vào

      return {
        ...prev,
        segments,
      }
    })
  }

  useEffect(() => {
    if (index === -1) return
    const currentSegment = segments[index]
    reset({
      text: currentSegment.text || '',
      translate: currentSegment.translate || '',
      start: currentSegment.start || 0,
      end: currentSegment.end || 0,
      note: currentSegment.note,
    })
  }, [index, segments])
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
        <RHFNumberBoundField
          label='Bắt đầu (s)'
          name='start'
          control={control}
          variant='standard'
          fullWidth
          setValue={setValue}
          min={segments[index - 1]?.end ?? 0}
          max={segments[index + 1]?.start ?? duration}
          autoComplete='off'
        />
        <RHFNumberBoundField
          label='Kết thúc (s)'
          name='end'
          control={control}
          variant='standard'
          fullWidth
          setValue={setValue}
          min={segments[index - 1]?.end ?? 0}
          max={segments[index + 1]?.start ?? duration}
          autoComplete='off'
        />
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
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}
      ></Box>
      <FormControl
        margin='normal'
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Button
          variant='outlined'
          type='submit'
          sx={{
            minWidth: '48px',
          }}
          disabled={index === -1}
        >
          {`Lưu thay đổi`}
        </Button>
        <Button
          variant='outlined'
          onClick={handleTimeTest}
          sx={{
            minWidth: '48px',
          }}
          disabled={index === -1}
        >
          <PlayArrow />
        </Button>
        <Button
          variant='outlined'
          onClick={handleMerge}
          sx={{
            minWidth: '48px',
          }}
          disabled={index === -1}
        >
          <Merge />
        </Button>
        <Button
          variant='outlined'
          color='error'
          sx={{
            minWidth: '48px',
          }}
          disabled={index === -1}
        >
          <Delete />
        </Button>
      </FormControl>
    </form>
  )
}

export default EditSegment
