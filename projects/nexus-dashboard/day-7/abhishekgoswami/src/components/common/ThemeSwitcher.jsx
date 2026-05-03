import React from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeSwitcher() {
  const { theme, switchTheme, themes } = useTheme()
  return (
    <div role="group" aria-label="Choose dashboard theme" className="flex flex-wrap gap-2">
      {themes.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => switchTheme(id)}
          aria-pressed={theme === id}
          aria-label={`${label} theme`}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs font-semibold cursor-pointer transition-all
            ${theme === id
              ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
              : 'border-transparent bg-white/5 text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-text)]'
            } focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2`}
        >
          <span aria-hidden="true">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  )
}
