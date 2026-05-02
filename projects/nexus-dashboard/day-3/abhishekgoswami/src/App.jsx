import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import ThemeSwitcher from './components/common/ThemeSwitcher'
import PomodoroWidget from './components/widgets/PomodoroWidget'
import StatsWidget from './components/widgets/StatsWidget'

function Dashboard() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ background: 'var(--color-primary)' }}
            aria-hidden="true"
          >
            N
          </div>
          <div>
            <span className="font-bold text-[var(--color-text)]">Nexus Dashboard</span>
            <span className="ml-2 text-xs text-[var(--color-muted)]">
              Day 3 — Flow Pomodoro Timer
            </span>
          </div>
        </div>
        <ThemeSwitcher />
      </header>

      {/* Main grid */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="dashboard-grid">
          {/* Pomodoro timer — full width */}
          <PomodoroWidget />

          {/* Info tiles */}
          <StatsWidget />

          {/* How it works */}
          <div className="tile tile-full">
            <h2 className="text-sm font-semibold text-[var(--color-text)] mb-3">
              🛠 Phase 3 — What was built
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-[var(--color-muted)]">
              {[
                {
                  title: 'Circular SVG Ring',
                  body: 'SVG strokeDashoffset animates smoothly as time drains. Pulses while running, flashes green on completion.',
                },
                {
                  title: 'useEffect + setInterval',
                  body: 'Interval is created on start and cleaned up on pause/unmount. State machine: idle → running → done.',
                },
                {
                  title: 'Sound + Notification',
                  body: 'Web Audio API synthesises a "ding" tone on completion. Browser Notification API fires an alert (with permission).',
                },
              ].map(({ title, body }) => (
                <div key={title} className="bg-[var(--color-surface2)] rounded-lg p-4">
                  <p className="font-semibold text-[var(--color-text)] mb-1">{title}</p>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}
