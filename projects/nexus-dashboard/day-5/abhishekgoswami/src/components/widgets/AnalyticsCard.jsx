import React from 'react'
import { motion } from 'framer-motion'
import { useAnalytics } from '../../hooks/useAnalytics'
import AnimatedBar from './AnimatedBar'
import DonutChart from './DonutChart'
import WeeklyChart from './WeeklyChart'
import StatCard from './StatCard'
import { formatDate } from '../../utils/formatters'

export default function AnalyticsCard() {
  const { total, done, active, completion, byPriority, weekly, maxWeekly } = useAnalytics()

  const STAT_CARDS = [
    { icon: '✅', label: 'Completed', value: done,       color: '#22c55e' },
    { icon: '🔄', label: 'Active',    value: active,     color: '#f59e0b' },
    { icon: '📊', label: 'Total',     value: total,      color: '#6c63ff' },
  ]

  return (
    <>
      {/* ── Stat cards row ──────────────────────────── */}
      {STAT_CARDS.map((s, i) => (
        <StatCard key={s.label} {...s} index={i} />
      ))}

      {/* ── Main analytics card ─────────────────────── */}
      <motion.div
        className="tile tile-full flex flex-col gap-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text)]">
              📈 Productivity Stats
            </h2>
            <p className="text-xs text-[var(--color-muted)]">{formatDate()}</p>
          </div>

          {/* Overall completion badge */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: 'var(--color-surface2)' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <span className="text-xs text-[var(--color-muted)]">Overall</span>
            <span
              className="text-lg font-bold"
              style={{ color: 'var(--color-primary)' }}
              aria-label={`Overall completion: ${completion}%`}
            >
              {completion}%
            </span>
          </motion.div>
        </div>

        {/* Overall progress bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs text-[var(--color-muted)]">
            <span>Overall completion</span>
            <span>{done} / {total} tasks</span>
          </div>
          <div
            className="h-4 rounded-full overflow-hidden"
            style={{ background: 'var(--color-surface2)' }}
            role="progressbar"
            aria-valuenow={completion}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Overall: ${completion}% complete`}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${completion}%` }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Two-column: priority bars + donut */}
        <div className="grid sm:grid-cols-2 gap-8">
          {/* Priority breakdown bars */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-widest">
              Completion by Priority
            </h3>
            {byPriority.map((item, i) => (
              <AnimatedBar key={item.priority} {...item} index={i} />
            ))}
          </div>

          {/* Donut chart */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-widest">
              Task Distribution
            </h3>
            <DonutChart byPriority={byPriority} total={total} />
          </div>
        </div>

        {/* Weekly bar chart */}
        <WeeklyChart weekly={weekly} maxWeekly={maxWeekly} />
      </motion.div>
    </>
  )
}
