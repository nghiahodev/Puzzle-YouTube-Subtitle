import { Box, Typography } from '@mui/material'
import { SegmentType } from '~/common/types'

interface SegmentItemProps {
  index: number
  segment: SegmentType
  isActive: boolean
  onClick?: (time: number) => void
}

const Segment = ({ index, segment, isActive, onClick }: SegmentItemProps) => {
  const handleOnClick = () => {
    const selection = window.getSelection()
    const isSelecting =
      selection && selection.type === 'Range' && selection.toString().length > 0

    if (!isSelecting) {
      onClick?.(index)
    }
  }
  return (
    <Box
      id={`segment-${index}`}
      onClick={handleOnClick}
      sx={{
        borderRadius: 2,
        padding: 2,
        mb: 1.5,
        backgroundColor: isActive ? '#e3f2fd' : '#ffffff',
        border: isActive ? '1px solid #1976d2' : '1px solid #eee',
        boxShadow: isActive
          ? '0 0 6px rgba(25, 118, 210, 0.5)'
          : '0 1px 3px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.1s ease',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 0.5,
        }}
      >
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ fontWeight: 'bold' }}
        >
          {index + 1}
        </Typography>
        <Typography variant='caption' sx={{ fontStyle: 'italic' }}>
          {segment.start}s – {segment.end}s
        </Typography>
      </Box>

      <Box sx={{ fontWeight: 'bold', mb: 0.5 }}>{segment.text}</Box>

      <Typography
        variant='body2'
        color='text.secondary'
        sx={{ fontWeight: 'bold' }}
      >
        {segment.translate}
      </Typography>
    </Box>
  )
}

export default Segment
