import { useState, useEffect, useRef, useCallback } from 'react'
import { getItem, setItem } from '../utils/localStorage'

// ── Mode durations (seconds) ──────────────────────────────────────────────────
export const MODES = {
  focus:      { label: 'Focus',       duration: 25 * 60, icon: '🍅' },
  shortBreak: { label: 'Short Break', duration:  5 * 60, icon: '☕' },
  longBreak:  { label: 'Long Break',  duration: 15 * 60, icon: '🛋️' },
}

const SESSIONS_BEFORE_LONG = 4

/**
 * usePomodoro — manages the full Pomodoro state machine:
 *   - mode switching (focus / short break / long break)
 *   - start / pause / reset
 *   - setInterval tick via useEffect
 *   - session counter (auto long break after 4 focus sessions)
 *   - Web Audio API tick sound on completion
 *   - Browser Notification on completion
 *   - Persists session count to localStorage
 */
export function usePomodoro() {
  const [mode, setMode]           = useState('focus')
  const [timeLeft, setTimeLeft]   = useState(MODES.focus.duration)
  const [running, setRunning]     = useState(false)
  const [done, setDone]           = useState(false)
  const [sessions, setSessions]   = useState(() => getItem('nexus-pomo-sessions', 0))

  const audioCtxRef = useRef(null)

  // ── Helpers ─────────────────────────────────────────────────────────────────

  /** Play a short "ding" using Web Audio API (no external file needed) */
  const playDing = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioCtxRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, ctx.currentTime)          // A5
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4) // A4

      gain.gain.setValueAtTime(0.4, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.6)
    } catch {
      // AudioContext not available — fail silently
    }
  }, [])

  /** Request notification permission and fire a notification */
  const notify = useCallback((title, body) => {
    if (!('Notification' in window)) return
    if (Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.svg' })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') new Notification(title, { body, icon: '/favicon.svg' })
      })
    }
  }, [])

  // ── Timer tick ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!running) return

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id)
          setRunning(false)
          setDone(true)

          // Sound + notification
          playDing()

          if (mode === 'focus') {
            const next = sessions + 1
            setSessions(next)
            setItem('nexus-pomo-sessions', next)
            const isLong = next % SESSIONS_BEFORE_LONG === 0
            notify(
              '🍅 Focus session complete!',
              isLong ? 'Time for a long break — you earned it!' : 'Take a short break.'
            )
          } else {
            notify('☕ Break over!', 'Ready to focus again?')
          }

          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [running, mode, sessions, playDing, notify])

  // ── Public API ───────────────────────────────────────────────────────────────

  const start = useCallback(() => {
    setDone(false)
    setRunning(true)
    // Unlock AudioContext on first user gesture
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume()
    }
  }, [])

  const pause = useCallback(() => setRunning(false), [])

  const reset = useCallback(() => {
    setRunning(false)
    setDone(false)
    setTimeLeft(MODES[mode].duration)
  }, [mode])

  const switchMode = useCallback((newMode) => {
    setRunning(false)
    setDone(false)
    setMode(newMode)
    setTimeLeft(MODES[newMode].duration)
  }, [])

  const resetSessions = useCallback(() => {
    setSessions(0)
    setItem('nexus-pomo-sessions', 0)
  }, [])

  const total    = MODES[mode].duration
  const progress = (total - timeLeft) / total   // 0 → 1

  return {
    mode, timeLeft, running, done, sessions,
    progress, total,
    start, pause, reset, switchMode, resetSessions,
  }
}
