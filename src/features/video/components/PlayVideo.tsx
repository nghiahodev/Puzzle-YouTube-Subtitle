import { Box, Skeleton } from '@mui/material'
import ReactPlayer from 'react-player/youtube'
import { PlayVideoProps } from '../videoTypes'
import { useEffect, useRef, useState } from 'react'
import { OnProgressProps } from 'react-player/base'

const PlayVideo = ({
  id,
  segments,
  playSegmentIndex,
  seekTo,
  onChange,
  onLoading,
}: PlayVideoProps) => {
  const playRef = useRef<ReactPlayer | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  // useEffect(() => {
  //   if (playSegmentIndex > -1) {
  //     const segment = segments[playSegmentIndex]
  //     const duration = (segment.end - segment.start) * 1000
  //     const bufferDelay = playing === null ? 1000 : 700
  //     const currentVolume = playRef.current?.getInternalPlayer().getVolume?.()

  //     // Clear previous timeout
  //     if (timeoutRef.current) clearTimeout(timeoutRef.current)

  //     // Play the video from the beginning to load the audio
  //     playRef.current?.seekTo(0, 'seconds')
  //     playRef.current?.getInternalPlayer()?.setVolume?.(1)
  //     setPlaying(true)

  //     timeoutRef.current = setTimeout(() => {
  //       playRef.current?.getInternalPlayer()?.setVolume?.(currentVolume)
  //       playRef.current?.seekTo(segment.start, 'seconds')
  //       timeoutRef.current = setTimeout(() => {
  //         setPlaying(false)
  //         onChange(playSegmentIndex)
  //       }, duration)
  //     }, bufferDelay)

  //     return () => {
  //       if (timeoutRef.current) clearTimeout(timeoutRef.current)
  //     }
  //   }
  // }, [playSegmentIndex])
  useEffect(() => {
    if (seekTo !== undefined && seekTo !== null) {
      const duration = (seekTo.end - seekTo.start) * 1000
      const bufferDelay = playing === null ? 2000 : 500

      // Clear previous timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      // Play the video from the beginning to load the audio
      playRef.current?.seekTo(0, 'seconds')
      setPlaying(true)

      timeoutRef.current = setTimeout(() => {
        playRef.current?.seekTo(seekTo.start, 'seconds')
        timeoutRef.current = setTimeout(() => {
          setPlaying(false)
        }, duration)
      }, bufferDelay)

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
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
