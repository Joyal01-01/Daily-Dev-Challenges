import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import ThemeSwitcher from './components/common/ThemeSwitcher'
import WeatherWidget from './components/widgets/WeatherWidget'

function Dashboard() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ background: 'var(--color-primary)' }}
            aria-hidden="true"
          >
            N
          </div>
          <div>
            <span className="font-bold text-[var(--color-text)]">Nexus Dashboard</span>
            <span className="ml-2 text-xs text-[var(--color-muted)]">Day 2 — Weather Widget</span>
          </div>
        </div>
        <ThemeSwitcher />
      </header>

      {/* Main grid */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="dashboard-grid">
          {/* Weather widget — full width */}
          <WeatherWidget />

          {/* Info tile */}
          <div className="tile tile-full">
            <h2 className="text-sm font-semibold text-[var(--color-text)] mb-3">
              🛠 Phase 2 — What was built
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-[var(--color-muted)]">
              {[
                {
                  title: 'OpenWeatherMap API',
                  body: 'Fetches current weather + 24-hour forecast by GPS coordinates. Handles HTTP errors and missing API key gracefully.',
                },
                {
                  title: 'Loading Skeletons',
                  body: 'Animated shimmer placeholders shown during geolocation and API fetch. Separate states for "locating" vs "loading".',
                },
                {
                  title: 'Error States',
                  body: 'Distinct UI for permission denied, network errors, and missing API key — with setup instructions and a retry button.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="bg-[var(--color-surface2)] rounded-lg p-4">
                  <p className="font-semibold text-[var(--color-text)] mb-1">{title}</p>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
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
