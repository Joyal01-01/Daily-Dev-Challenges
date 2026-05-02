import React from 'react'

/**
 * WeatherError — graceful error state with retry button.
 */
export default function WeatherError({ message, onRetry }) {
  const isNoKey = message?.includes('API key')

  return (
    <div
      className="tile tile-full flex flex-col items-center justify-center gap-4 py-10 text-center"
      role="alert"
      aria-live="assertive"
    >
      <span className="text-4xl" aria-hidden="true">
        {isNoKey ? '🔑' : '⚠️'}
      </span>

      <div>
        <p className="font-semibold text-[var(--color-text)] mb-1">
          {isNoKey ? 'API Key Required' : 'Weather Unavailable'}
        </p>
        <p className="text-sm text-[var(--color-muted)] max-w-sm">{message}</p>
      </div>

      {isNoKey ? (
        <div className="bg-[var(--color-surface2)] rounded-lg px-5 py-3 text-left text-xs text-[var(--color-muted)] max-w-sm w-full">
          <p className="font-semibold text-[var(--color-text)] mb-2">Setup instructions:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Get a free key at{' '}
              <a
                href="https://openweathermap.org/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] underline"
              >
                openweathermap.org
              </a>
            </li>
            <li>
              Create <code className="font-mono text-[var(--color-primary)]">.env.local</code> in
              the project root
            </li>
            <li>
              Add:{' '}
              <code className="font-mono text-[var(--color-primary)]">
                VITE_WEATHER_API_KEY=your_key
              </code>
            </li>
            <li>Restart the dev server</li>
          </ol>
        </div>
      ) : (
        <button
          onClick={onRetry}
          className="px-5 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
