import React, { createContext, useContext, useState, useEffect } from 'react'
import { getItem, setItem } from '../utils/localStorage'

// ── Theme definitions ─────────────────────────────────────────────────────────
export const THEMES = [
  { id: 'midnight', label: 'Midnight', icon: '🌙', desc: 'Deep dark blue' },
  { id: 'forest',   label: 'Forest',   icon: '🌿', desc: 'Dark green tones' },
  { id: 'sunset',   label: 'Sunset',   icon: '🌅', desc: 'Warm orange glow' },
]

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // Persist theme choice in localStorage
  const [theme, setTheme] = useState(() => getItem('nexus-theme', 'midnight'))

  useEffect(() => {
    // Apply data-theme to <html> so CSS variables cascade globally
    document.documentElement.setAttribute('data-theme', theme)
    setItem('nexus-theme', theme)
  }, [theme])

  const switchTheme = (id) => {
    if (THEMES.find((t) => t.id === id)) setTheme(id)
  }

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
