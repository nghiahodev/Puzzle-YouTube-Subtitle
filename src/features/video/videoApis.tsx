import { privateApi } from '~/config/axios'
import { AddVideoBody, GetVideoParams, Video } from './videoTypes'

const videoApi = {
  addVideo(body: AddVideoBody) {
    return privateApi.post('/videos', body)
  },
  getVideo(params: GetVideoParams): Promise<Video> {
    return privateApi.get(`/videos/${params.videoId}`)
  },
}

export default videoApi
