/** Format a number as a percentage string */
export const pct = (n, total) => (total ? Math.round((n / total) * 100) : 0)

/** Clamp 0–100 */
export const clamp100 = (v) => Math.min(100, Math.max(0, v))

/** Format date to "Mon, Apr 28" */
export function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}
