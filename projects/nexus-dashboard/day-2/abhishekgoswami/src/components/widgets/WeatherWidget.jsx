import React, { useState } from 'react'
import { useWeather } from '../../hooks/useWeather'
import WeatherSkeleton from './WeatherSkeleton'
import WeatherError from './WeatherError'
import { weatherIconUrl } from '../../api/weather'
import { roundTemp, unixToTime, titleCase, formatDate } from '../../utils/formatters'

// ── Unit toggle ───────────────────────────────────────────────────────────────
const UNIT_LABELS = { metric: '°C', imperial: '°F' }

// ── Wind direction from degrees ───────────────────────────────────────────────
function windDir(deg) {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg / 45) % 8]
}

// ── Forecast card ─────────────────────────────────────────────────────────────
function ForecastCard({ item, unitLabel }) {
  const time = unixToTime(item.dt, 0)
  const icon = item.weather[0].icon
  const temp = roundTemp(item.main.temp)

  return (
    <li className="flex flex-col items-center gap-1 flex-1 min-w-0">
      <span className="text-[10px] text-[var(--color-muted)] font-mono">{time}</span>
      <img
        src={weatherIconUrl(icon)}
        alt={item.weather[0].description}
        width={40}
        height={40}
        loading="lazy"
        className="drop-shadow"
      />
      <span className="text-xs font-semibold text-[var(--color-text)]">
        {temp}{unitLabel}
      </span>
    </li>
  )
}

// ── Main widget ───────────────────────────────────────────────────────────────
export default function WeatherWidget() {
  const [units, setUnits] = useState('metric')
  const { status, weather, forecast, error, retry } = useWeather(units)

  const unitLabel = UNIT_LABELS[units]

  // Loading / locating states
  if (status === 'idle' || status === 'locating' || status === 'loading') {
    return <WeatherSkeleton status={status} />
  }

  // Error state
  if (status === 'error') {
    return <WeatherError message={error} onRetry={retry} />
  }

  const { name, sys, main, weather: wx, wind, visibility, clouds } = weather
  const icon = wx[0].icon
  const desc = titleCase(wx[0].description)

  return (
    <div className="tile tile-full flex flex-col gap-5">
      {/* ── Header row ─────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest mb-1">
            ⛅ Weather — {formatDate()}
          </p>
          <h2 className="text-xl font-bold text-[var(--color-text)]">
            {name}, {sys.country}
          </h2>
        </div>

        {/* Unit toggle */}
        <div
          role="group"
          aria-label="Temperature unit"
          className="flex rounded-lg overflow-hidden border border-[var(--color-border)]"
        >
          {['metric', 'imperial'].map((u) => (
            <button
              key={u}
              onClick={() => setUnits(u)}
              aria-pressed={units === u}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] ${
                units === u
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-transparent text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {UNIT_LABELS[u]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main weather row ───────────────────────── */}
      <div className="flex flex-wrap items-center gap-6">
        {/* Icon */}
        <img
          src={weatherIconUrl(icon, '4x')}
          alt={desc}
          width={96}
          height={96}
          className="drop-shadow-lg flex-shrink-0"
        />

        {/* Temp + description */}
        <div className="flex-1 min-w-0">
          <p
            className="text-5xl font-bold leading-none text-[var(--color-primary)] mb-1"
            aria-label={`Temperature: ${roundTemp(main.temp)} ${unitLabel}`}
          >
            {roundTemp(main.temp)}
            <span className="text-2xl ml-1">{unitLabel}</span>
          </p>
          <p className="text-[var(--color-text-soft)] font-medium">{desc}</p>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            Feels like {roundTemp(main.feels_like)}{unitLabel}
          </p>
        </div>

        {/* Detail grid */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            { label: 'Humidity',    value: `${main.humidity}%` },
            { label: 'Wind',        value: `${roundTemp(wind.speed)} ${units === 'metric' ? 'm/s' : 'mph'} ${windDir(wind.deg)}` },
            { label: 'Visibility',  value: `${(visibility / 1000).toFixed(1)} km` },
            { label: 'Cloud cover', value: `${clouds.all}%` },
            { label: 'High',        value: `${roundTemp(main.temp_max)}${unitLabel}` },
            { label: 'Low',         value: `${roundTemp(main.temp_min)}${unitLabel}` },
          ].map(({ label, value }) => (
            <div key={label}>
              <dt className="text-[var(--color-muted)] text-xs">{label}</dt>
              <dd className="font-semibold text-[var(--color-text)]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Forecast strip ─────────────────────────── */}
      {forecast && forecast.length > 0 && (
        <div>
          <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest mb-3">
            Next 24 hours
          </p>
          <ul
            className="flex gap-2 overflow-x-auto pb-1 list-none"
            aria-label="24-hour forecast"
          >
            {forecast.slice(0, 8).map((item) => (
              <ForecastCard key={item.dt} item={item} unitLabel={unitLabel} />
            ))}
          </ul>
        </div>
      )}

      {/* ── Refresh button ─────────────────────────── */}
      <div className="flex justify-end">
        <button
          onClick={retry}
          className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors focus:outline-none focus:underline"
          aria-label="Refresh weather data"
        >
          🔄 Refresh
        </button>
      </div>
    </div>
  )
}
