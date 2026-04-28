import React, { useState } from 'react'
import { getItem, setItem } from '../../utils/localStorage'

const DEFAULT_TASKS = [
  { id: 1, text: 'Set up Vite + Tailwind',          done: true  },
  { id: 2, text: 'Build CSS variable theme engine',  done: true  },
  { id: 3, text: 'Create dashboard grid layout',     done: true  },
  { id: 4, text: 'Add Midnight / Forest / Sunset',   done: true  },
  { id: 5, text: 'Wire up ThemeContext + localStorage', done: false },
  { id: 6, text: 'Build widget components',          done: false },
]

/**
 * TasksWidget — simple task list with toggle, persisted to localStorage.
 */
export default function TasksWidget() {
  const [tasks, setTasks] = useState(() => getItem('nexus-tasks', DEFAULT_TASKS))

  const toggle = (id) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    setTasks(updated)
    setItem('nexus-tasks', updated)
  }

  const done  = tasks.filter((t) => t.done).length
  const total = tasks.length
  const pct   = Math.round((done / total) * 100)

  return (
    <div className="tile tile-half flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--color-text)]">📋 Tasks</h2>
        <span className="text-xs text-[var(--color-muted)]">{done}/{total} done</span>
      </div>

      {/* Progress bar */}
      <div className="progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${pct}% tasks complete`}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      {/* Task list */}
      <ul className="flex flex-col gap-2 list-none" role="list">
        {tasks.map(({ id, text, done }) => (
          <li key={id}>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={done}
                onChange={() => toggle(id)}
                className="w-4 h-4 rounded accent-[var(--color-primary)] cursor-pointer"
                aria-label={text}
              />
              <span
                className={`text-sm transition-colors ${
                  done
                    ? 'line-through text-[var(--color-muted)]'
                    : 'text-[var(--color-text-soft)] group-hover:text-[var(--color-text)]'
                }`}
              >
                {text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
