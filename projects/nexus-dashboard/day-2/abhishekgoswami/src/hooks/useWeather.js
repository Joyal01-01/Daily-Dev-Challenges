import { useState, useEffect, useCallback } from 'react'
import { fetchWeatherByCoords, fetchForecastByCoords } from '../api/weather'
import { getItem, setItem } from '../utils/localStorage'

const CACHE_KEY   = 'nexus-weather-cache'
const CACHE_TTL   = 10 * 60 * 1000   // 10 minutes in ms
const GEO_TIMEOUT = 8000              // 8 s geolocation timeout

/**
 * useWeather — manages the full weather data lifecycle:
 *   1. Request geolocation
 *   2. Fetch current weather + forecast from OpenWeatherMap
 *   3. Cache results in localStorage (10-min TTL)
 *   4. Expose loading / error / data states
 */
export function useWeather(units = 'metric') {
  const [state, setState] = useState({
    status: 'idle',   // idle | locating | loading | success | error
    weather: null,
    forecast: null,
    error: null,
    coords: null,
  })

  const load = useCallback(
    (lat, lon) => {
      setState((s) => ({ ...s, status: 'loading', error: null }))

      Promise.all([
        fetchWeatherByCoords(lat, lon, units),
        fetchForecastByCoords(lat, lon, units),
      ])
        .then(([weather, forecastData]) => {
          const result = { weather, forecast: forecastData.list, coords: { lat, lon } }
          // Cache with timestamp
          setItem(CACHE_KEY, { ...result, cachedAt: Date.now() })
          setState({ status: 'success', ...result, error: null })
        })
        .catch((err) => {
          setState((s) => ({
            ...s,
            status: 'error',
            error: err.message === 'NO_API_KEY'
              ? 'No API key — add VITE_WEATHER_API_KEY to .env.local'
              : err.message || 'Failed to fetch weather data',
          }))
        })
    },
    [units]
  )

  const fetchLocation = useCallback(() => {
    // Try cache first
    const cached = getItem(CACHE_KEY)
    if (cached && Date.now() - cached.cachedAt < CACHE_TTL) {
      setState({
        status: 'success',
        weather: cached.weather,
        forecast: cached.forecast,
        coords: cached.coords,
        error: null,
      })
      return
    }

    if (!navigator.geolocation) {
      setState((s) => ({
        ...s,
        status: 'error',
        error: 'Geolocation is not supported by your browser.',
      }))
      return
    }

    setState((s) => ({ ...s, status: 'locating' }))

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => load(coords.latitude, coords.longitude),
      (err) => {
        const messages = {
          1: 'Location permission denied. Please allow access and retry.',
          2: 'Location unavailable. Check your connection.',
          3: 'Location request timed out.',
        }
        setState((s) => ({
          ...s,
          status: 'error',
          error: messages[err.code] ?? 'Could not determine your location.',
        }))
      },
      { timeout: GEO_TIMEOUT, enableHighAccuracy: false }
    )
  }, [load])

  // Auto-fetch on mount
  useEffect(() => {
    fetchLocation()
  }, [fetchLocation])

  return { ...state, retry: fetchLocation }
}
