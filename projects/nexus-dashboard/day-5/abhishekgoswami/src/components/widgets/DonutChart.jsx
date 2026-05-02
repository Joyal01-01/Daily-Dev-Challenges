import React from 'react'
import { motion } from 'framer-motion'

const SIZE   = 160
const STROKE = 18
const R      = (SIZE - STROKE) / 2
const CIRCUM = 2 * Math.PI * R
const CX     = SIZE / 2
const CY     = SIZE / 2

const SEGMENTS = [
  { key: 'high',   color: '#ef4444', label: 'High'   },
  { key: 'medium', color: '#f59e0b', label: 'Medium' },
  { key: 'low',    color: '#22c55e', label: 'Low'    },
]

/**
 * DonutChart — SVG donut showing task distribution by priority.
 * Each segment is animated with Framer Motion's custom SVG props.
 */
export default function DonutChart({ byPriority, total }) {
  // Build segments with start offsets
  let offset = 0
  const segments = SEGMENTS.map(({ key, color, label }) => {
    const item  = byPriority.find((b) => b.priority === key) ?? { total: 0 }
    const share = total ? item.total / total : 0
    const dash  = share * CIRCUM
    const gap   = CIRCUM - dash
    const start = offset
    offset += dash
    return { key, color, label, dash, gap, start, count: item.total }
  })

  return (
    <div className="flex flex-col items-center gap-4">
      {/* SVG donut */}
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-label="Task distribution donut chart"
          role="img"
          className="-rotate-90"
        >
          {/* Track */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="var(--color-surface2)"
            strokeWidth={STROKE}
          />

          {/* Segments */}
          {segments.map(({ key, color, dash, gap, start }, i) => (
            <motion.circle
              key={key}
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke={color}
              strokeWidth={STROKE}
              strokeLinecap="butt"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-start}
              initial={{ strokeDasharray: `0 ${CIRCUM}` }}
              animate={{ strokeDasharray: `${dash} ${gap}` }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
            />
          ))}
        </svg>

        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-bold text-[var(--color-text)]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {total}
          </motion.span>
          <span className="text-[10px] text-[var(--color-muted)]">tasks</span>
        </div>
      </div>

      {/* Legend */}
      <ul className="flex gap-4 list-none" aria-label="Chart legend">
        {segments.map(({ key, color, label, count }) => (
          <li key={key} className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: color }}
              aria-hidden="true"
            />
            {label} ({count})
          </li>
        ))}
      </ul>
    </div>
  )
}
