export const formatKbToMb = (kb?: number): string => {
  const formatted = ((kb ?? 1) / 1024).toFixed(0)
  return formatted + ' MB'
}

export const getURLHostname = (url?: string) => {
  return url ? new URL(url).hostname : ''
}
