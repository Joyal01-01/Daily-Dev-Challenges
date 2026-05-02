import React, { useState } from 'react'
import { useTasks, PRIORITIES } from '../../context/TaskContext'

const PRIORITY_LABELS = { high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low' }

export default function TaskForm() {
  const { dispatch } = useTasks()
  const [text, setText]         = useState('')
  const [priority, setPriority] = useState('medium')
  const [error, setError]       = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) { setError('Task text cannot be empty.'); return }
    dispatch({ type: 'ADD', text, priority })
    setText('')
    setPriority('medium')
    setError('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Add new task"
      className="flex flex-col sm:flex-row gap-3"
    >
      {/* Text input */}
      <div className="flex-1 flex flex-col gap-1">
        <label htmlFor="task-input" className="sr-only">Task description</label>
        <input
          id="task-input"
          type="text"
          value={text}
          onChange={(e) => { setText(e.target.value); setError('') }}
          placeholder="Add a new task…"
          aria-describedby={error ? 'task-error' : undefined}
          aria-invalid={!!error}
          className="w-full bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
        />
        {error && (
          <p id="task-error" role="alert" className="text-xs text-[var(--color-danger)]">
            {error}
          </p>
        )}
      </div>

      {/* Priority select */}
      <div>
        <label htmlFor="task-priority" className="sr-only">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-[var(--color-surface2)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition cursor-pointer"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] whitespace-nowrap"
      >
        + Add Task
      </button>
    </form>
  )
}
