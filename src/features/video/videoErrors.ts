import errors from '~/common/errors'

const videoErrors = {
  ENGLISH_SUBTITLES_NOT_FOUND:
    'Video không có phụ đề tiếng Anh, vui lòng chọn video khác.',
  YOUTUBE_VIDEO_NOT_FOUND: 'Không tìm thấy video trên YouTube.',
  VIDEO_NOT_FOUND: 'Không tìm thấy video trong hệ thống.',
  VIDEO_ALREADY_EXISTS: 'Video đã tồn tại trong hệ thống.',
  ...errors,
}

export default videoErrors
