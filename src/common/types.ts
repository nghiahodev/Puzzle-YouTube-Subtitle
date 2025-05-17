export interface UserType {
  id: string
  name: string
  picture?: string
  role: 'admin' | 'user'
}

export interface SegmentType {
  id: string
  start: number
  end: number
  text: string
  translate: string
  note?: any
}

export interface VideoType {
  userId: string
  youtubeId: string
  categories: string[]
  title: string
  duration: number
  thumbnail: string
  summary: any
  segments: SegmentType[]
}
