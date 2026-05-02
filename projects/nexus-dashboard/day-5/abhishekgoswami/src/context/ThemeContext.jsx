import React, { createContext, useContext, useState, useEffect } from 'react'
import { getItem, setItem } from '../utils/localStorage'

export const THEMES = [
  { id: 'midnight', label: 'Midnight', icon: '🌙' },
  { id: 'forest',   label: 'Forest',   icon: '🌿' },
  { id: 'sunset',   label: 'Sunset',   icon: '🌅' },
]

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getItem('nexus-theme', 'midnight'))

  useEffect(() => {
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
