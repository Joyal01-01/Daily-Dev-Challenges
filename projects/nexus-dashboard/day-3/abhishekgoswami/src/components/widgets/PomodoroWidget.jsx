import React from 'react'
import { usePomodoro, MODES } from '../../hooks/usePomodoro'
import CircularRing from './CircularRing'
import { formatCountdown } from '../../utils/formatters'

// ── Session dots ──────────────────────────────────────────────────────────────
function SessionDots({ count }) {
  const dots = Array.from({ length: 4 })
  return (
    <div className="flex gap-2 justify-center" aria-label={`${count % 4} of 4 sessions complete`}>
      {dots.map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
            i < count % 4
              ? 'bg-[var(--color-primary)]'
              : 'bg-[var(--color-surface2)]'
          }`}
        />
      ))}
    </div>
  )
}

// ── Main widget ───────────────────────────────────────────────────────────────
export default function PomodoroWidget() {
  const {
    mode, timeLeft, running, done, sessions,
    progress, start, pause, reset, switchMode, resetSessions,
  } = usePomodoro()

  const currentMode = MODES[mode]

  return (
    <div className="tile tile-full flex flex-col items-center gap-6 py-8">
      {/* ── Mode tabs ──────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Timer mode"
        className="flex gap-2 bg-[var(--color-surface2)] rounded-full p-1"
      >
        {Object.entries(MODES).map(([key, { label, icon }]) => (
          <button
            key={key}
            role="tab"
            aria-selected={mode === key}
            onClick={() => switchMode(key)}
            className={`mode-tab ${mode === key ? 'active' : ''}`}
          >
            <span aria-hidden="true">{icon}</span>{' '}
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Circular ring + countdown ──────────────── */}
      <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
        <CircularRing progress={progress} running={running} done={done} size={240} stroke={12} />

        {/* Centre content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <span
            className="text-5xl font-bold font-mono tracking-tight text-[var(--color-text)]"
            aria-live="polite"
            aria-label={`Time remaining: ${formatCountdown(timeLeft)}`}
          >
            {formatCountdown(timeLeft)}
          </span>
          <span className="text-sm text-[var(--color-muted)]">
            {done ? '✅ Done!' : currentMode.label}
          </span>
        </div>
      </div>

      {/* ── Controls ───────────────────────────────── */}
      <div className="flex items-center gap-5" role="group" aria-label="Timer controls">
        {/* Reset */}
        <button
          onClick={reset}
          aria-label="Reset timer"
          className="ctrl-btn w-12 h-12 bg-[var(--color-surface2)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
        >
          ↺
        </button>

        {/* Start / Pause */}
        <button
          onClick={running ? pause : start}
          aria-label={running ? 'Pause timer' : 'Start timer'}
          aria-pressed={running}
          className="ctrl-btn w-16 h-16 text-white text-2xl"
          style={{ background: 'var(--color-primary)' }}
        >
          {running ? '⏸' : '▶'}
        </button>

        {/* Skip to next mode */}
        <button
          onClick={() => {
            const order = ['focus', 'shortBreak', 'longBreak']
            const next  = order[(order.indexOf(mode) + 1) % order.length]
            switchMode(next)
          }}
          aria-label="Skip to next mode"
          className="ctrl-btn w-12 h-12 bg-[var(--color-surface2)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
        >
          ⏭
        </button>
      </div>

      {/* ── Session tracker ────────────────────────── */}
      <div className="flex flex-col items-center gap-3">
        <SessionDots count={sessions} />
        <p className="text-xs text-[var(--color-muted)]">
          {sessions} session{sessions !== 1 ? 's' : ''} completed today
          {sessions > 0 && (
            <button
              onClick={resetSessions}
              className="ml-2 text-[var(--color-danger)] hover:underline focus:outline-none focus:underline"
              aria-label="Reset session count"
            >
              (reset)
            </button>
          )}
        </p>
      </div>

      {/* ── Done banner ────────────────────────────── */}
      {done && (
        <div
          role="status"
          aria-live="polite"
          className="px-6 py-3 rounded-full text-sm font-semibold"
          style={{ background: 'var(--color-success)', color: '#000' }}
        >
          {mode === 'focus'
            ? `🍅 Focus complete! Session #${sessions}`
            : '☕ Break over — ready to focus?'}
        </div>
      )}
    </div>
  )
}
