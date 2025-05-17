import { z } from 'zod'
import { JSONContent } from '@tiptap/react'
import { extractYoutubeId } from './videoUtil'

const noteSchema: z.ZodType<JSONContent> = z
  .object({
    type: z.string(),
    content: z.array(z.any()).optional(),
  })
  .passthrough()

const noteSchemaStrict = noteSchema.refine(
  (val) => {
    const hasMeaningfulText = val.content?.some(
      (node: any) =>
        node.type === 'paragraph' &&
        Array.isArray(node.content) &&
        node.content.some(
          (n: any) =>
            n.type === 'text' &&
            typeof n.text === 'string' &&
            n.text.trim() !== '',
        ),
    )
    return hasMeaningfulText
  },
  { message: 'Ghi chú không được để trống' },
)

const timeSchema = z.preprocess(
  (val) => {
    if (typeof val === 'string') {
      if (val.trim() === '') return undefined // bắt trường hợp chuỗi rỗng
      const num = Number(val)
      return isNaN(num) ? val : num
    }
    return val
  },
  z
    .number({
      required_error: 'End là bắt buộc',
      invalid_type_error: 'End phải là số',
    })
    .min(0, 'End phải lớn hơn hoặc bằng 0'),
)

const addVideo = z.object({
  youtubeUrl: z.string().refine((url) => !!extractYoutubeId(url), {
    message: 'URL không hợp lệ',
  }),
})

const addVideoInfer = addVideo.transform((data) => ({
  youtubeId: extractYoutubeId(data.youtubeUrl)!,
}))

const editSegment = z
  .object({
    text: z.string().min(1, 'Text không được để trống'),
    translate: z.string(),
    start: timeSchema,
    end: timeSchema,
    note: noteSchema.optional(),
  })
  .refine(
    (data) => {
      return data.end > data.start
    },
    {
      message: 'End phải lớn hơn Start',
      path: ['end'],
    },
  )

const editInfo = z.object({
  summary: noteSchemaStrict,
})

export type AddVideoInput = z.input<typeof addVideo>
export type AddVideoInfer = z.infer<typeof addVideoInfer>
export type AddVideoBody = AddVideoInfer
export type EditSegmentInput = z.input<typeof editSegment>
export type EditSegmentBody = EditSegmentInput
export type EditInfoInput = z.input<typeof editInfo>

const videoSchemas = {
  addVideo,
  addVideoInfer,
  editSegment,
  editInfo,
}

export default videoSchemas
