import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { TaskProvider } from './context/TaskContext'
import ThemeSwitcher from './components/common/ThemeSwitcher'
import TaskManager from './components/widgets/TaskManager'

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
              Day 4 — Smart Task Manager
            </span>
          </div>
        </div>
        <ThemeSwitcher />
      </header>

      {/* Main grid */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="dashboard-grid">
          {/* Task manager — full width */}
          <TaskManager />

          {/* Info tile */}
          <div className="tile tile-full">
            <h2 className="text-sm font-semibold text-[var(--color-text)] mb-3">
              🛠 Phase 4 — What was built
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-[var(--color-muted)]">
              {[
                {
                  title: 'useReducer State',
                  body: 'All CRUD actions (ADD, TOGGLE, EDIT, DELETE, CLEAR_COMPLETED) go through a single reducer. Predictable, testable state transitions.',
                },
                {
                  title: 'Priority Levels',
                  body: 'Three priority levels — High 🔴, Medium 🟡, Low 🟢 — with colour-coded badges and filter tabs.',
                },
                {
                  title: 'localStorage Persistence',
                  body: 'Tasks are saved on every dispatch via useEffect. State is rehydrated from localStorage on mount with seed data as fallback.',
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
      <TaskProvider>
        <Dashboard />
      </TaskProvider>
    </ThemeProvider>
  )
}
