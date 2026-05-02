import React from 'react'
import { motion } from 'framer-motion'

/**
 * WeeklyChart — animated bar chart showing tasks completed per day (last 7 days).
 */
export default function WeeklyChart({ weekly, maxWeekly }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-widest">
        Weekly Activity
      </h3>

      <div
        className="flex items-end gap-2 h-24"
        role="img"
        aria-label="Weekly task completion bar chart"
      >
        {weekly.map(({ label, value }, i) => {
          const heightPct = maxWeekly ? (value / maxWeekly) * 100 : 0
          const isToday   = i === weekly.length - 1

          return (
            <div key={label} className="flex flex-col items-center gap-1 flex-1">
              {/* Bar */}
              <div
                className="w-full rounded-t-md overflow-hidden flex items-end"
                style={{ height: '80px', background: 'var(--color-surface2)' }}
                title={`${label}: ${value} tasks`}
              >
                <motion.div
                  className="w-full rounded-t-md"
                  style={{
                    background: isToday
                      ? 'linear-gradient(180deg, var(--color-accent), var(--color-primary))'
                      : 'var(--color-primary)',
                    opacity: isToday ? 1 : 0.55,
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: 'easeOut' }}
                  aria-label={`${label}: ${value}`}
                />
              </div>

              {/* Day label */}
              <span
                className={`text-[10px] ${
                  isToday
                    ? 'text-[var(--color-accent)] font-semibold'
                    : 'text-[var(--color-muted)]'
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
