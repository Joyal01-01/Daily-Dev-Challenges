import React from 'react'

const STATS = [
  { label: 'Tasks Done',   value: 24, icon: '✅', delta: '+3 today' },
  { label: 'In Progress',  value: 7,  icon: '🔄', delta: '2 due soon' },
  { label: 'Streak',       value: 12, icon: '🔥', delta: 'days' },
]

/**
 * StatsWidget — three quick-stat tiles in a row.
 */
export default function StatsWidget() {
  return (
    <>
      {STATS.map(({ label, value, icon, delta }) => (
        <div key={label} className="tile tile-third flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-[var(--color-muted)] font-medium uppercase tracking-wide">
              {label}
            </p>
            <span aria-hidden="true" className="text-lg">{icon}</span>
          </div>
          <div>
            <p className="stat-value" aria-label={`${label}: ${value}`}>{value}</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">{delta}</p>
          </div>
        </div>
      ))}
    </>
  )
}
