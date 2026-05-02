/** Round temperature to 1 decimal */
export const roundTemp = (t) => Math.round(t * 10) / 10

/** Convert Unix timestamp to readable time */
export function unixToTime(unix, timezone = 0) {
  const d = new Date((unix + timezone) * 1000)
  return d.toUTCString().slice(17, 22)
}

/** Capitalise first letter of each word */
export const titleCase = (str) =>
  str.replace(/\b\w/g, (c) => c.toUpperCase())

/** Format a Date to "Mon, Apr 28" */
export function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}
