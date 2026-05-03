import React, { createContext, useContext, useState, useEffect } from 'react'

export const THEMES = [
  { id: 'midnight', label: 'Midnight', icon: '🌙' },
  { id: 'forest',   label: 'Forest',   icon: '🌿' },
  { id: 'sunset',   label: 'Sunset',   icon: '🌅' },
]

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('nexus-theme') ?? 'midnight' } catch { return 'midnight' }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('nexus-theme', theme) } catch { /* silent */ }
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
