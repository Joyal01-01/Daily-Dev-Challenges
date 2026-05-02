/** Format a Date to "Apr 30, 2026 · 14:32" */
export function formatDateTime(date = new Date()) {
  return date.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false,
  })
}

/** Generate a simple unique ID */
export function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
