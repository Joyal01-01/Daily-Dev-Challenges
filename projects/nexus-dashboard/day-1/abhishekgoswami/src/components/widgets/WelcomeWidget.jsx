import React from 'react'
import { useTheme, THEMES } from '../../context/ThemeContext'

/**
 * WelcomeWidget — hero banner spanning full width.
 */
export default function WelcomeWidget() {
  const { theme } = useTheme()
  const current = THEMES.find((t) => t.id === theme)

  return (
    <div className="tile tile-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-1">
          Nexus Dashboard{' '}
          <span aria-hidden="true">{current?.icon}</span>
        </h1>
        <p className="text-sm text-[var(--color-muted)]">
          Phase 1 — Foundation &amp; Theme Engine &nbsp;·&nbsp;
          Active theme:{' '}
          <span className="font-semibold text-[var(--color-primary)]">
            {current?.label}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-1 text-xs text-[var(--color-muted)]">
        <span>✅ Vite + Tailwind CSS v4</span>
        <span>✅ CSS variable theme engine</span>
        <span>✅ CSS Grid dashboard layout</span>
        <span>✅ localStorage persistence</span>
      </div>
    </div>
  )
}
