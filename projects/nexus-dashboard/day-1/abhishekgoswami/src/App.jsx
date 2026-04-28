import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import ThemeSwitcher from './components/common/ThemeSwitcher'
import WelcomeWidget from './components/widgets/WelcomeWidget'
import ClockWidget from './components/widgets/ClockWidget'
import StatsWidget from './components/widgets/StatsWidget'
import ThemePreviewWidget from './components/widgets/ThemePreviewWidget'
import TasksWidget from './components/widgets/TasksWidget'

function Dashboard() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      {/* ── Header ─────────────────────────────────── */}
      <header className="border-b border-[var(--color-border)] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ background: 'var(--color-primary)' }}
            aria-hidden="true"
          >
            N
          </div>
          <span className="font-bold text-[var(--color-text)]">Nexus</span>
        </div>

        {/* Theme switcher in header */}
        <ThemeSwitcher />
      </header>

      {/* ── Main grid ──────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="dashboard-grid">

          {/* Row 1 — Welcome banner (full width) */}
          <WelcomeWidget />

          {/* Row 2 — Clock + 3 stat tiles */}
          <ClockWidget />
          <StatsWidget />

          {/* Row 3 — Theme preview + Tasks */}
          <ThemePreviewWidget />
          <TasksWidget />

          {/* Row 4 — Theme engine info tile */}
          <div className="tile tile-full">
            <h2 className="text-sm font-semibold text-[var(--color-text)] mb-3">
              🎨 Theme Engine — How it works
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-[var(--color-muted)]">
              <div className="bg-[var(--color-surface2)] rounded-lg p-4">
                <p className="font-semibold text-[var(--color-text)] mb-1">CSS Variables</p>
                <p>
                  Each theme defines a full set of{' '}
                  <code className="text-[var(--color-accent)] font-mono">--color-*</code> custom
                  properties scoped to{' '}
                  <code className="text-[var(--color-accent)] font-mono">[data-theme]</code>.
                </p>
              </div>
              <div className="bg-[var(--color-surface2)] rounded-lg p-4">
                <p className="font-semibold text-[var(--color-text)] mb-1">Instant Swap</p>
                <p>
                  Switching themes sets{' '}
                  <code className="text-[var(--color-accent)] font-mono">
                    document.documentElement.setAttribute(&apos;data-theme&apos;, id)
                  </code>{' '}
                  — no re-render needed.
                </p>
              </div>
              <div className="bg-[var(--color-surface2)] rounded-lg p-4">
                <p className="font-semibold text-[var(--color-text)] mb-1">Persistence</p>
                <p>
                  The chosen theme is saved to{' '}
                  <code className="text-[var(--color-accent)] font-mono">localStorage</code> and
                  restored on next visit.
                </p>
              </div>
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
