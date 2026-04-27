import React from 'react'
import { useTheme } from '../../context/ThemeContext'

/**
 * ThemeSwitcher — renders a button group for Midnight / Forest / Sunset themes.
 * Fully keyboard accessible with focus-visible styles.
 */
export default function ThemeSwitcher() {
  const { theme, switchTheme, themes } = useTheme()

  return (
    <div
      role="group"
      aria-label="Choose dashboard theme"
      className="flex flex-wrap gap-2"
    >
      {themes.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => switchTheme(id)}
          aria-pressed={theme === id}
          aria-label={`${label} theme`}
          className={`theme-btn ${theme === id ? 'active' : ''}`}
        >
          <span aria-hidden="true">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  )
}
