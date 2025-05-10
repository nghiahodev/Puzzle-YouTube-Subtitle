import { Box, Grid2, Tab, Tabs } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import videoApi from '../videoApis'
import PlayVideo from '../components/PlayVideo'
import { Video } from '../videoTypes'
import SegmentItem from '../components/SegmentItem'
import EditSegmentForm from '../components/EditSegmentForm'
import EditInfoForm from '../components/EditInfoForm'

const EditVideoPage = () => {
  const { videoId } = useParams()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [video, setVideo] = useState<Video | null>(null)
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
  }

  useEffect(() => {
    if (!videoId) {
      return
    }
    ;(async () => {
      try {
        const video = await videoApi.getVideo({ videoId })
        setVideo(video)
      } catch (error) {
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

  return (
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
              <Tab label='Chỉnh sửa phân đoạn' />
            </Tabs>
            {video &&
              (tabIndex === 1 ? (
                <EditSegmentForm
                  index={currentIndex}
                  segments={video.segments}
                  onSeekTo={setSeekTo}
                />
              ) : (
                <EditInfoForm video={video} />
              ))}
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
          {video && (
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
                      <SegmentItem
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
          )}
        </Box>
      </Grid2>
    </Grid2>
  )
}

export default EditVideoPage
