export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  const hh = h > 0 ? `${h}:` : ''
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m)
  const ss = String(s).padStart(2, '0')

  return `${hh}${mm}:${ss}`
}

export function extractYoutubeId(url: string): string | null {
  const YOUTUBE_URL_REGEX =
    /^(?:https?:\/\/)?(?:(www)\.)?(youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|)([A-Za-z0-9_-]{11})(?:[&#?].*)?$/
  const match = url.trim().match(YOUTUBE_URL_REGEX)
  return match ? match[3] : null
}
