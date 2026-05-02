import React from 'react'
import { motion } from 'framer-motion'

const PRIORITY_COLORS = {
  high:   { bar: '#ef4444', bg: 'rgba(239,68,68,0.12)',  label: '🔴 High'   },
  medium: { bar: '#f59e0b', bg: 'rgba(245,158,11,0.12)', label: '🟡 Medium' },
  low:    { bar: '#22c55e', bg: 'rgba(34,197,94,0.12)',  label: '🟢 Low'    },
}

/**
 * AnimatedBar — a single Framer Motion animated progress bar row.
 */
export default function AnimatedBar({ priority, done, total, pct, index }) {
  const { bar, bg, label } = PRIORITY_COLORS[priority]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      className="flex flex-col gap-1.5"
    >
      {/* Label row */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-[var(--color-text)]">{label}</span>
        <span className="text-[var(--color-muted)]">
          {done}/{total} &nbsp;
          <span className="font-semibold" style={{ color: bar }}>{pct}%</span>
        </span>
      </div>

      {/* Track */}
      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ background: bg }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} tasks: ${pct}% complete`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: bar }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: index * 0.12 + 0.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
