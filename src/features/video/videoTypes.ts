import { JSONContent } from '@tiptap/react'

export interface AddVideoBody {
  youtubeUrl: string
}
export interface GetVideoParams {
  videoId: string
}
export interface PlayVideoProps {
  id: string
  segments: Segment[]
  playSegmentIndex?: number
  seekTo?: { start: number; end: number } | null
  onChange: (index: number) => void
  onLoading: (isLoading: boolean) => void
}

export interface Segment {
  id: string
  start: number
  end: number
  text: string
  translate: string
  note?: string
}

export interface Video {
  userId: string
  youtubeId: string
  categories: string[]
  title: string
  duration: number
  thumbnail: string
  summary: string
  segments: Segment[]
}

export interface SegmentItemProps {
  index: number
  segment: Segment
  isActive: boolean
  onClick?: (time: number) => void
}

export interface EditSegmentFormBody {
  text: string
  translate: string
  start: number
  end: number
  note?: JSONContent
}
export interface EditInfoFormBody {
  summary: JSONContent
}
export interface EditInfoFormProps {
  video: Video
}

export interface EditSegmentFormProps {
  segments: Segment[]
  index: number
  onSeekTo: (range: { start: number; end: number }) => void
}
