import React from 'react'
import { useTheme, THEMES } from '../../context/ThemeContext'

/**
 * ThemePreviewWidget — shows the active theme's colour palette as swatches.
 */
export default function ThemePreviewWidget() {
  const { theme } = useTheme()
  const current = THEMES.find((t) => t.id === theme)

  const SWATCHES = [
    { label: 'Background',  var: '--color-bg'       },
    { label: 'Surface',     var: '--color-surface'   },
    { label: 'Primary',     var: '--color-primary'   },
    { label: 'Accent',      var: '--color-accent'    },
    { label: 'Text',        var: '--color-text'      },
    { label: 'Muted',       var: '--color-muted'     },
  ]

  return (
    <div className="tile tile-half flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-xl">{current?.icon}</span>
        <h2 className="text-sm font-semibold text-[var(--color-text)]">
          {current?.label} Theme — Colour Palette
        </h2>
      </div>

      <ul className="grid grid-cols-3 gap-3 list-none" role="list" aria-label="Theme colour swatches">
        {SWATCHES.map(({ label, var: cssVar }) => (
          <li key={label} className="flex flex-col items-center gap-1">
            <div
              className="w-full h-10 rounded-lg border border-white/10"
              style={{ background: `var(${cssVar})` }}
              aria-hidden="true"
            />
            <span className="text-[10px] text-[var(--color-muted)] text-center leading-tight">
              {label}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-[var(--color-muted)]">
        All colours are CSS custom properties — swap themes instantly with{' '}
        <code className="font-mono text-[var(--color-accent)]">data-theme</code> on{' '}
        <code className="font-mono text-[var(--color-accent)]">&lt;html&gt;</code>.
      </p>
    </div>
  )
}
