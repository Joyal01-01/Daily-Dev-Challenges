import { useMemo } from 'react'
import { getItem } from '../utils/localStorage'
import { pct } from '../utils/formatters'

const STORAGE_KEY = 'nexus-tasks-v2'

// Fallback demo data when no real tasks exist
const DEMO_TASKS = [
  { priority: 'high',   done: true  },
  { priority: 'high',   done: true  },
  { priority: 'high',   done: false },
  { priority: 'high',   done: false },
  { priority: 'medium', done: true  },
  { priority: 'medium', done: true  },
  { priority: 'medium', done: true  },
  { priority: 'medium', done: false },
  { priority: 'low',    done: true  },
  { priority: 'low',    done: false },
  { priority: 'low',    done: false },
]

/**
 * useAnalytics — derives productivity stats from the Day-4 task store.
 * Falls back to demo data if no tasks are found.
 */
export function useAnalytics() {
  return useMemo(() => {
    const raw = getItem(STORAGE_KEY, DEMO_TASKS)
    const tasks = Array.isArray(raw) ? raw : DEMO_TASKS

    const total     = tasks.length
    const done      = tasks.filter((t) => t.done).length
    const active    = total - done
    const completion = pct(done, total)

    const byPriority = ['high', 'medium', 'low'].map((p) => {
      const all      = tasks.filter((t) => t.priority === p)
      const finished = all.filter((t) => t.done)
      return {
        priority: p,
        total:    all.length,
        done:     finished.length,
        pct:      pct(finished.length, all.length),
      }
    })

    // Weekly mock data (last 7 days) — in a real app this would come from a DB
    const today = new Date()
    const weekly = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today)
      d.setDate(today.getDate() - (6 - i))
      const label = d.toLocaleDateString('en-US', { weekday: 'short' })
      // Simulate realistic-looking data seeded from real task count
      const base = Math.max(1, Math.floor(total / 7))
      const value = i === 6 ? done : Math.floor(Math.random() * base * 2 + 1)
      return { label, value }
    })

    const maxWeekly = Math.max(...weekly.map((w) => w.value), 1)

    return { total, done, active, completion, byPriority, weekly, maxWeekly }
  }, [])
}
