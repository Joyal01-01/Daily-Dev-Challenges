import React, { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { usePWA } from './hooks/usePWA'
import OfflineBanner from './components/common/OfflineBanner'
import InstallPrompt from './components/common/InstallPrompt'

// ── Lighthouse score data ─────────────────────────────────────────────────────
const SCORES = [
  { label: 'Performance',   value: 98, color: 'green' },
  { label: 'Accessibility', value: 95, color: 'green' },
  { label: 'Best Practices',value: 100, color: 'green' },
  { label: 'SEO',           value: 92, color: 'green' },
  { label: 'PWA',           value: 100, color: 'green' },
]

// ── Optimisation checklist ────────────────────────────────────────────────────
const CHECKLIST = [
  { done: true,  text: 'Code splitting via Vite rollupOptions' },
  { done: true,  text: 'esbuild minification for JS & CSS' },
  { done: true,  text: 'SVG favicon (vector, tiny file size)' },
  { done: true,  text: 'Web App Manifest (manifest.webmanifest)' },
  { done: true,  text: 'Service Worker — Cache-First static assets' },
  { done: true,  text: 'Service Worker — Network-First navigation' },
  { done: true,  text: 'Offline fallback to cached index.html' },
  { done: true,  text: 'beforeinstallprompt — Add to Home Screen' },
  { done: true,  text: 'Online / Offline status banner' },
  { done: true,  text: 'theme-color meta tag (#6c63ff)' },
  { done: true,  text: 'apple-touch-icon link tag' },
  { done: true,  text: 'Semantic HTML + ARIA roles throughout' },
  { done: true,  text: 'Preconnect hints for external origins' },
  { done: true,  text: 'Responsive layout — mobile to desktop' },
]

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const { isOnline, installPrompt, isInstalled, promptInstall } = usePWA()
  const [showInstall, setShowInstall] = useState(true)

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
          Nexus Dashboard
        </h1>
        <div className="flex items-center gap-3">
          {/* Online / offline indicator */}
          <span
            aria-label={isOnline ? 'Online' : 'Offline'}
            title={isOnline ? 'Online' : 'Offline'}
            className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-400' : 'bg-yellow-400'}`}
          />
          <span className="text-xs text-[var(--color-muted)]">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            Phase 7 — Performance Audit &amp; PWA
          </h2>
          <p className="text-[var(--color-muted)] max-w-lg mx-auto text-sm">
            Lighthouse 90+ scores, Web App Manifest, Service Worker offline caching,
            and Add-to-Home-Screen support.
          </p>
        </div>

        {/* Lighthouse scores */}
        <section aria-labelledby="scores-heading" className="mb-12">
          <h2
            id="scores-heading"
            className="text-base font-semibold text-[var(--color-text)] mb-6 text-center"
          >
            🔦 Target Lighthouse Scores
          </h2>
          <ul
            className="flex flex-wrap justify-center gap-6 list-none"
            role="list"
            aria-label="Lighthouse scores"
          >
            {SCORES.map(({ label, value, color }) => (
              <li key={label} className="flex flex-col items-center gap-2">
                <div
                  className={`score-badge ${color}`}
                  role="img"
                  aria-label={`${label}: ${value}`}
                >
                  {value}
                </div>
                <span className="text-xs text-[var(--color-muted)] text-center max-w-[5rem]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* PWA feature cards */}
        <section aria-labelledby="pwa-heading" className="mb-12">
          <h2
            id="pwa-heading"
            className="text-base font-semibold text-[var(--color-text)] mb-4"
          >
            📱 PWA Features
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '📦',
                title: 'Offline Mode',
                desc: 'Service Worker caches all static assets. Works without internet.',
              },
              {
                icon: '📲',
                title: 'Installable',
                desc: 'Add to Home Screen via the browser prompt or the install button.',
              },
              {
                icon: '⚡',
                title: 'Fast Load',
                desc: 'Code splitting, esbuild minification, and Cache-First strategy.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:-translate-y-1 transition-transform"
              >
                <div className="text-2xl mb-3" aria-hidden="true">{icon}</div>
                <h3 className="font-semibold text-[var(--color-text)] mb-1 text-sm">{title}</h3>
                <p className="text-xs text-[var(--color-muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Optimisation checklist */}
        <section aria-labelledby="checklist-heading">
          <h2
            id="checklist-heading"
            className="text-base font-semibold text-[var(--color-text)] mb-4"
          >
            ✅ Optimisation Checklist
          </h2>
          <ul
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl divide-y divide-white/[0.05] list-none"
            role="list"
          >
            {CHECKLIST.map(({ done, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 px-5 py-3 text-sm"
              >
                <span
                  aria-hidden="true"
                  className={done ? 'text-green-400' : 'text-[var(--color-muted)]'}
                >
                  {done ? '✓' : '○'}
                </span>
                <span className={done ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}>
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Offline banner */}
      <OfflineBanner isOnline={isOnline} />

      {/* PWA install prompt */}
      {installPrompt && !isInstalled && showInstall && (
        <InstallPrompt
          onInstall={promptInstall}
          onDismiss={() => setShowInstall(false)}
        />
      )}
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
