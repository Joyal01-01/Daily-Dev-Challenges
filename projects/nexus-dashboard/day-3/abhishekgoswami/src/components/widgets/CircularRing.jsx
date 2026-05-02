import React from 'react'

/**
 * CircularRing — SVG circular progress indicator.
 *
 * @param {{ progress: number, running: boolean, done: boolean, size?: number, stroke?: number }} props
 *   progress: 0–1 (fraction elapsed)
 */
export default function CircularRing({
  progress = 0,
  running  = false,
  done     = false,
  size     = 240,
  stroke   = 10,
}) {
  const r      = (size - stroke) / 2          // radius
  const cx     = size / 2
  const cy     = size / 2
  const circum = 2 * Math.PI * r              // full circumference

  // dashoffset: 0 = full ring, circum = empty ring
  // We want the ring to drain as time passes
  const offset = circum * progress            // elapsed portion is "consumed"

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className={`-rotate-90 ${running ? 'timer-ring-running' : ''} ${done ? 'timer-done' : ''}`}
      style={{ display: 'block' }}
    >
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--color-surface2)"
        strokeWidth={stroke}
      />

      {/* Progress arc */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={done ? 'var(--color-success)' : 'var(--color-primary)'}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circum}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s ease' }}
      />
    </svg>
  )
}
