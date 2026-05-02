import React, { useState, useRef, useEffect } from 'react'
import { useTasks, PRIORITIES } from '../../context/TaskContext'

const BADGE = { high: 'badge-high', medium: 'badge-medium', low: 'badge-low' }
const PRIORITY_LABELS = { high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low' }

export default function TaskItem({ task }) {
  const { dispatch } = useTasks()
  const [editing, setEditing]   = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [editPri, setEditPri]   = useState(task.priority)
  const inputRef = useRef(null)

  // Focus input when entering edit mode
  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const saveEdit = () => {
    if (!editText.trim()) return
    dispatch({ type: 'EDIT', id: task.id, text: editText, priority: editPri })
    setEditing(false)
  }

  const cancelEdit = () => {
    setEditText(task.text)
    setEditPri(task.priority)
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter')  saveEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <li className="task-item flex items-start gap-3 py-3 border-b border-[var(--color-border)] last:border-0 group">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => dispatch({ type: 'TOGGLE', id: task.id })}
        aria-label={`Mark "${task.text}" as ${task.done ? 'incomplete' : 'complete'}`}
        className="mt-0.5 w-4 h-4 rounded accent-[var(--color-primary)] cursor-pointer flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Edit task text"
              className="flex-1 bg-[var(--color-surface2)] border border-[var(--color-primary)] rounded px-3 py-1.5 text-sm text-[var(--color-text)] focus:outline-none"
            />
            <select
              value={editPri}
              onChange={(e) => setEditPri(e.target.value)}
              aria-label="Edit priority"
              className="bg-[var(--color-surface2)] border border-[var(--color-border)] rounded px-2 py-1.5 text-xs text-[var(--color-text)] focus:outline-none"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
              ))}
            </select>
            <div className="flex gap-1">
              <button
                onClick={saveEdit}
                aria-label="Save edit"
                className="px-3 py-1.5 rounded bg-[var(--color-success)] text-black text-xs font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-success)]"
              >
                ✓
              </button>
              <button
                onClick={cancelEdit}
                aria-label="Cancel edit"
                className="px-3 py-1.5 rounded bg-[var(--color-surface2)] text-[var(--color-muted)] text-xs hover:text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-sm flex-1 min-w-0 break-words transition-colors ${
                task.done
                  ? 'line-through text-[var(--color-muted)]'
                  : 'text-[var(--color-text)]'
              }`}
            >
              {task.text}
            </span>
            {/* Priority badge */}
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${BADGE[task.priority]}`}
              aria-label={`Priority: ${task.priority}`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
        )}

        {/* Created at */}
        {!editing && (
          <p className="text-[10px] text-[var(--color-muted)] mt-0.5">{task.createdAt}</p>
        )}
      </div>

      {/* Actions — visible on hover/focus */}
      {!editing && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => setEditing(true)}
            aria-label={`Edit task: ${task.text}`}
            className="p-1.5 rounded text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface2)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-xs"
          >
            ✏️
          </button>
          <button
            onClick={() => dispatch({ type: 'DELETE', id: task.id })}
            aria-label={`Delete task: ${task.text}`}
            className="p-1.5 rounded text-[var(--color-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-surface2)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-danger)] text-xs"
          >
            🗑️
          </button>
        </div>
      )}
    </li>
  )
}
