/** Format seconds as MM:SS */
export function formatCountdown(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/** Format a Date to "Mon, Apr 28" */
export function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}
