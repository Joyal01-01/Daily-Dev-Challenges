import React, { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import SearchPalette from './components/common/SearchPalette'

function Dashboard() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
          Nexus Dashboard
        </h1>

        {/* Search trigger button */}
        <button
          onClick={() => setPaletteOpen(true)}
          aria-label="Open command palette (Ctrl+K)"
          aria-keyshortcuts="Control+K"
          className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[var(--color-muted)] text-sm hover:bg-white/10 hover:text-[var(--color-text)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          <span>🔍</span>
          <span>Search…</span>
          <kbd className="ml-2 text-xs bg-white/10 rounded px-1.5 py-0.5 font-mono">Ctrl K</kbd>
        </button>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            Phase 6 — Custom Search &amp; Quick Links
          </h2>
          <p className="text-[var(--color-muted)] max-w-lg mx-auto">
            Press{' '}
            <kbd className="bg-white/10 rounded px-1.5 py-0.5 font-mono text-sm text-[var(--color-accent)]">
              Ctrl+K
            </kbd>{' '}
            to open the command palette. Search tasks, navigate pages, or jump to quick links.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: '⌨️', title: 'Keyboard First', desc: 'Navigate entirely with ↑↓ arrows and Enter. Esc to close.' },
            { icon: '🔍', title: 'Fuzzy Search', desc: 'Filter tasks, pages, and external links in real time.' },
            { icon: '♿', title: 'Accessible', desc: 'Full ARIA roles, focus management, and keyboard shortcuts.' },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:-translate-y-1 transition-transform"
            >
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-semibold text-[var(--color-text)] mb-1">{title}</h3>
              <p className="text-sm text-[var(--color-muted)]">{desc}</p>
            </div>
          ))}
        </div>

        {/* Quick links section */}
        <section aria-labelledby="quick-links-heading">
          <h2 id="quick-links-heading" className="text-lg font-semibold text-[var(--color-text)] mb-4">
            Quick Links
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 list-none" role="list">
            {[
              { icon: '🐙', label: 'GitHub', href: 'https://github.com' },
              { icon: '📖', label: 'MDN Web Docs', href: 'https://developer.mozilla.org' },
              { icon: '⚡', label: 'Vite Docs', href: 'https://vitejs.dev' },
              { icon: '🎨', label: 'Tailwind CSS', href: 'https://tailwindcss.com' },
            ].map(({ icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-white/[0.07] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  <span aria-hidden="true">{icon}</span>
                  <span className="text-sm font-medium">{label}</span>
                  <span className="ml-auto text-xs" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Command Palette */}
      <SearchPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}
