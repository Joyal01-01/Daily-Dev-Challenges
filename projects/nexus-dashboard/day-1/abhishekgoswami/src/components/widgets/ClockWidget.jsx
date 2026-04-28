import React, { useState, useEffect } from 'react'
import { formatTime, formatDate } from '../../utils/formatters'

/**
 * ClockWidget — live clock using setInterval, cleaned up on unmount.
 */
export default function ClockWidget() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="tile tile-third flex flex-col justify-between h-full">
      <p className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-widest mb-2">
        🕐 Clock
      </p>
      <div>
        <p
          className="text-3xl font-bold font-mono text-[var(--color-primary)] leading-none mb-1"
          aria-live="polite"
          aria-label={`Current time: ${formatTime(now)}`}
        >
          {formatTime(now)}
        </p>
        <p className="text-xs text-[var(--color-muted)]">{formatDate(now)}</p>
      </div>
    </div>
  )
}
