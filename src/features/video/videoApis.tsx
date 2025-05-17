import { privateApi } from '~/config/axios'
import { AddVideoBody, EditSegmentBody } from './videoSchemas'
import { VideoType } from '~/common/types'

export interface GetVideoParams {
  videoId: string
}
export interface EditSegmentParams {
  videoId: string
  segmentId: string
}

const videoApi = {
  addVideo(body: AddVideoBody) {
    return privateApi.post('/videos', body)
  },
  getVideo(params: GetVideoParams): Promise<VideoType> {
    return privateApi.get(`/videos/${params.videoId}`)
  },
  editSegment(params: EditSegmentParams, body: EditSegmentBody) {
    console.log(body)
    return privateApi.patch(
      `/videos/${params.videoId}/segment/${params.segmentId}`,
      body,
    )
  },
}

export default videoApi
