import React, { useState, useMemo } from 'react'
import { useTasks, FILTERS } from '../../context/TaskContext'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'

const FILTER_LABELS = {
  all: 'All', active: 'Active', completed: 'Done',
  high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low',
}

export default function TaskManager() {
  const { tasks, dispatch } = useTasks()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // ── Derived stats ──────────────────────────────────────────────────────────
  const total     = tasks.length
  const done      = tasks.filter((t) => t.done).length
  const active    = total - done
  const pct       = total ? Math.round((done / total) * 100) : 0

  // ── Filtered + searched list ───────────────────────────────────────────────
  const visible = useMemo(() => {
    let list = tasks

    // Filter
    if (filter === 'active')    list = list.filter((t) => !t.done)
    else if (filter === 'completed') list = list.filter((t) => t.done)
    else if (['high', 'medium', 'low'].includes(filter))
      list = list.filter((t) => t.priority === filter)

    // Search
    if (search.trim())
      list = list.filter((t) =>
        t.text.toLowerCase().includes(search.toLowerCase())
      )

    return list
  }, [tasks, filter, search])

  return (
    <div className="tile tile-full flex flex-col gap-5">
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-text)]">📋 Smart Task Manager</h2>
          <p className="text-xs text-[var(--color-muted)]">
            {active} active · {done} done · {total} total
          </p>
        </div>
        {done > 0 && (
          <button
            onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
            className="text-xs text-[var(--color-danger)] hover:underline focus:outline-none focus:underline"
            aria-label="Clear all completed tasks"
          >
            Clear completed
          </button>
        )}
      </div>

      {/* ── Progress bar ────────────────────────────── */}
      <div>
        <div className="flex justify-between text-xs text-[var(--color-muted)] mb-1">
          <span>Progress</span>
          <span>{pct}%</span>
        </div>
        <div
          className="h-2 rounded-full bg-[var(--color-surface2)] overflow-hidden"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${pct}% of tasks complete`}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
            }}
          />
        </div>
      </div>

      {/* ── Add task form ────────────────────────────── */}
      <TaskForm />

      {/* ── Search ──────────────────────────────────── */}
      <div>
        <label htmlFor="task-search" className="sr-only">Search tasks</label>
        <input
          id="task-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search tasks…"
          className="w-full bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
        />
      </div>

      {/* ── Filter tabs ─────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Filter tasks"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
              filter === f
                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                : 'bg-transparent text-[var(--color-muted)] border-[var(--color-border)] hover:text-[var(--color-text)]'
            }`}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {/* ── Task list ───────────────────────────────── */}
      {visible.length === 0 ? (
        <p className="text-center text-sm text-[var(--color-muted)] py-8">
          {search ? `No tasks matching "${search}"` : 'No tasks here — add one above!'}
        </p>
      ) : (
        <ul
          aria-label="Task list"
          aria-live="polite"
          className="list-none"
        >
          {visible.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}

      {/* ── Stats row ───────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[var(--color-border)]">
        {[
          { label: 'High priority', value: tasks.filter((t) => t.priority === 'high' && !t.done).length, color: 'var(--color-danger)' },
          { label: 'In progress',   value: active, color: 'var(--color-warning)' },
          { label: 'Completed',     value: done,   color: 'var(--color-success)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <p className="text-xl font-bold" style={{ color }}>{value}</p>
            <p className="text-[10px] text-[var(--color-muted)]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
