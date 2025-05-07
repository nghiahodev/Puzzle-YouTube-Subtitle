export interface AddVideoBody {
  youtubeUrl: string
}
export interface GetVideoParams {
  videoId: string
}
export interface PlayVideoProps {
  id: string
  segments: Segment[]
  onChange: (index: number) => void
  seekTo?: number | null
  playSegmentIndex: number | null
}

export interface Segment {
  id: string
  start: number
  end: number
  text: string
  translate: string
}

export interface Video {
  userId: string
  youtubeId: string
  categories: string[]
  title: string
  duration: number
  thumbnail: string
  segments: Segment[]
}

export interface SegmentItemProps {
  index: number
  segment: {
    start: number
    end: number
    text: string
    translate: string
  }
  isActive: boolean
  onClick?: (time: number) => void
}
