import { Box, Skeleton } from '@mui/material'
import ReactPlayer from 'react-player/youtube'
import { useEffect, useRef, useState } from 'react'
import { OnProgressProps } from 'react-player/base'
import { SegmentType } from '~/common/types'
import YouTubePlayer from 'react-player/youtube'

const DELAY_FAST = 0
const DELAY_SLOW = 0.5
const RESET_MS = 10000

interface PlayVideoProps {
  id: string
  segments: SegmentType[]
  seekTo?: { start: number; end: number } | null
  onChange: (index: number) => void
  onLoading: (isLoading: boolean) => void
}

const PlayVideo = ({
  id,
  segments,
  seekTo,
  onChange,
  onLoading,
}: PlayVideoProps) => {
  const playRef = useRef<ReactPlayer | null>(null)
  const timeoutPlayRef = useRef<NodeJS.Timeout | null>(null)
  const intervalPlayRef = useRef<NodeJS.Timeout | null>(null)
  const delayRef = useRef(DELAY_SLOW)
  const timeoutDelayRef = useRef<NodeJS.Timeout | null>(null)

  const [playing, setPlaying] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  const handleReady = () => {
    setLoading(false)
    onLoading(false)
  }

  const handlePlay = () => setPlaying(true)
  const handlePause = () => setPlaying(false)

  const handleProgress = (state: OnProgressProps) => {
    const current = state.playedSeconds
    const currentIndex = segments.findIndex((s) => {
      return current >= s.start && current < s.end
    })
    if (currentIndex !== -1) onChange(currentIndex)
  }

  const getCurrentTime = (
    playRef: React.RefObject<YouTubePlayer | null>,
  ): number => {
    if (!playRef) return 0
    const internal = playRef.current?.getInternalPlayer()
    if (!internal) return 0

    try {
      if (typeof internal.getCurrentTime === 'function') {
        return internal.getCurrentTime() // YouTube, Vimeo
      } else if (typeof internal.currentTime === 'number') {
        return internal.currentTime // HTML5 video
      }
    } catch (e) {
      console.warn('getCurrentTime failed:', e)
    }

    return 0
  }

  useEffect(() => {
    if (seekTo !== undefined && seekTo !== null) {
      const duration = (seekTo.end - seekTo.start) * 1000

      // Clear previous timeout
      if (timeoutPlayRef.current) clearTimeout(timeoutPlayRef.current)
      if (intervalPlayRef.current) clearInterval(intervalPlayRef.current)

      // Play the video from the beginning to load the audio
      playRef.current?.seekTo(seekTo.start, 'seconds')

      const internalPlayer = playRef.current?.getInternalPlayer?.()

      let prevVolume: number | null = null
      if (internalPlayer?.getVolume && internalPlayer?.setVolume) {
        prevVolume = internalPlayer.getVolume()
        internalPlayer.setVolume(1)
      }

      setPlaying(true)

      intervalPlayRef.current = setInterval(() => {
        const currentTime = getCurrentTime(playRef)
        if (currentTime - seekTo.start > delayRef.current) {
          playRef.current?.seekTo(seekTo.start, 'seconds')

          if (prevVolume !== null) {
            internalPlayer?.setVolume?.(prevVolume)
          }
          timeoutPlayRef.current = setTimeout(() => {
            setPlaying(false)
          }, duration)
          clearInterval(intervalPlayRef.current!)

          //
          delayRef.current = DELAY_FAST
          if (timeoutDelayRef.current) clearTimeout(timeoutDelayRef.current)
          timeoutDelayRef.current = setTimeout(() => {
            delayRef.current = DELAY_SLOW
          }, RESET_MS)
        }
      }, 100)

      return () => {
        clearInterval(intervalPlayRef.current!)
        clearTimeout(timeoutPlayRef.current!)
      }
    }
  }, [seekTo])

  return (
    <Box
      sx={{
        position: 'relative',
        paddingTop: '56.25%', // 16:9 aspect ratio
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {loading && (
        <Skeleton
          variant='rectangular'
          width='100%'
          height='100%'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${id}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
        width='100%'
        height='100%'
        controls
        onProgress={handleProgress}
        ref={playRef}
        onPlay={handlePlay}
        onPause={handlePause}
        {...(playing !== null ? { playing } : {})}
        onReady={handleReady}
      />
    </Box>
  )
}

export default PlayVideo
