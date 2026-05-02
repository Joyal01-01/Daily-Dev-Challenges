import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { getItem, setItem } from '../utils/localStorage'
import { uid, formatDateTime } from '../utils/formatters'

// ── Constants ─────────────────────────────────────────────────────────────────
export const PRIORITIES = ['high', 'medium', 'low']
export const FILTERS    = ['all', 'active', 'completed', 'high', 'medium', 'low']

const STORAGE_KEY = 'nexus-tasks-v2'

// ── Default seed tasks ────────────────────────────────────────────────────────
const SEED_TASKS = [
  { id: uid(), text: 'Set up Vite + Tailwind',          priority: 'low',    done: true,  createdAt: formatDateTime() },
  { id: uid(), text: 'Build theme engine (Day 1)',       priority: 'medium', done: true,  createdAt: formatDateTime() },
  { id: uid(), text: 'Integrate OpenWeatherMap (Day 2)', priority: 'medium', done: true,  createdAt: formatDateTime() },
  { id: uid(), text: 'Build Pomodoro timer (Day 3)',     priority: 'high',   done: true,  createdAt: formatDateTime() },
  { id: uid(), text: 'Build Smart Task Manager (Day 4)', priority: 'high',   done: false, createdAt: formatDateTime() },
  { id: uid(), text: 'Add drag-and-drop reordering',    priority: 'low',    done: false, createdAt: formatDateTime() },
]

// ── Reducer ───────────────────────────────────────────────────────────────────
function tasksReducer(state, action) {
  switch (action.type) {

    case 'ADD':
      return [
        {
          id: uid(),
          text: action.text.trim(),
          priority: action.priority,
          done: false,
          createdAt: formatDateTime(),
        },
        ...state,
      ]

    case 'TOGGLE':
      return state.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t
      )

    case 'DELETE':
      return state.filter((t) => t.id !== action.id)

    case 'EDIT':
      return state.map((t) =>
        t.id === action.id
          ? { ...t, text: action.text.trim(), priority: action.priority }
          : t
      )

    case 'CLEAR_COMPLETED':
      return state.filter((t) => !t.done)

    case 'REORDER': {
      // Move task from `from` index to `to` index
      const next = [...state]
      const [moved] = next.splice(action.from, 1)
      next.splice(action.to, 0, moved)
      return next
    }

    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    undefined,
    () => getItem(STORAGE_KEY, SEED_TASKS)
  )

  // Persist on every change
  useEffect(() => {
    setItem(STORAGE_KEY, tasks)
  }, [tasks])

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used inside TaskProvider')
  return ctx
}
