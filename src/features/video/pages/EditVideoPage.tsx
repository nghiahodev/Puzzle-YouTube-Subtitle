import { Box, Grid2, Tab, Tabs } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import videoApi from '../videoApis'
import PlayVideo from '../components/PlayVideo'
import EditSegment from '../components/EditSegment'
import EditInfo from '../components/EditInfo'
import CustomDialog from '~/common/components/CustomDialog'
import Segment from '../components/Segment'
import { VideoType } from '~/common/types'

const EditVideoPage = () => {
  const navigate = useNavigate()
  const { videoId } = useParams()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [video, setVideo] = useState<VideoType | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [loadingVideo, setLoadingVideo] = useState(true)
  const [seekTo, setSeekTo] = useState<{ start: number; end: number } | null>(
    null,
  )
  const [tabIndex, setTabIndex] = useState(0)

  const handleLoading = (loading: boolean) => {
    setLoadingVideo(loading)
  }

  const handleSegmentChange = (index: number) => {
    setCurrentIndex(index)
  }
  const handleSegmentClick = (index: number) => {
    setSelectedIndex(index)
    setCurrentIndex(index)
  }

  const handleConfirm = () => navigate('/admin/videos/edit')

  useEffect(() => {
    if (!videoId) {
      return
    }
    ;(async () => {
      try {
        const video = await videoApi.getVideo({ videoId })
        setVideo(video)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    })()
  }, [videoId])

  useEffect(() => {
    if (currentIndex !== -1 && scrollRef.current) {
      const element = document.getElementById(`segment-${currentIndex}`)
      if (element) {
        const top = element.offsetTop
        const containerTop = scrollRef.current.offsetTop

        scrollRef.current.scrollTo({
          top: top - containerTop,
          behavior: 'smooth',
        })
      }
    }
  }, [currentIndex])

  useEffect(() => {
    if (selectedIndex !== -1 && video?.segments[selectedIndex]) {
      const s = video.segments[selectedIndex]
      setSeekTo({ start: s.start, end: s.end }) // mặc định chỉ seek tới start
    }
  }, [selectedIndex])

  return video ? (
    <Grid2 container spacing={2} sx={{ top: '48px' }}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Box
          sx={(theme) => ({
            position: 'sticky',
            top: theme.app.headerHeight,
            height: `calc(100vh - ${theme.app.headerHeight})`,
            py: 1,
          })}
        >
          <Box
            sx={{
              overflowY: 'auto',
              overflowX: 'hidden',
              height: '100%',
              p: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={(e, newValue) => setTabIndex(newValue)}
            >
              <Tab label='Thông tin video' />
              <Tab label='Chỉnh sửa phụ đề' />
            </Tabs>
            {tabIndex === 1 ? (
              <EditSegment
                index={currentIndex}
                segments={video.segments}
                duration={video.duration}
                onSeekTo={setSeekTo}
                onUpdate={setVideo}
              />
            ) : (
              <EditInfo video={video} />
            )}
          </Box>
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Box
          sx={(theme) => ({
            height: `calc(100vh - ${theme.app.headerHeight})`,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            py: 1,
          })}
        >
          <>
            <Box sx={{ flexShrink: 0 }}>
              <PlayVideo
                id={video.youtubeId}
                segments={video.segments}
                onChange={handleSegmentChange}
                seekTo={seekTo}
                onLoading={handleLoading}
              />
            </Box>
            <Box
              ref={scrollRef}
              sx={{
                overflowY: 'auto',
                flexGrow: 1,
                height: '100%',
              }}
            >
              {!loadingVideo && (
                <Box>
                  {video?.segments.map((s, index) => (
                    <Segment
                      key={index}
                      index={index}
                      segment={s}
                      isActive={currentIndex === index}
                      onClick={handleSegmentClick}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </>
        </Box>
      </Grid2>
    </Grid2>
  ) : (
    <>
      <CustomDialog
        open={!loading}
        title='Không tìm thấy video'
        message='Video bạn đang tìm kiếm không tồn tại hoặc đã bị xoá.'
        onConfirm={handleConfirm}
      />
    </>
  )
}

export default EditVideoPage
