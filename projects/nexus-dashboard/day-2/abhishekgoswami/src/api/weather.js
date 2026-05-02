/**
 * OpenWeatherMap API helpers
 *
 * Set your free API key in .env.local:
 *   VITE_WEATHER_API_KEY=your_key_here
 *
 * Free tier: https://openweathermap.org/api
 */

const BASE = 'https://api.openweathermap.org/data/2.5'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY ?? ''

/**
 * Fetch current weather by coordinates.
 * @param {number} lat
 * @param {number} lon
 * @param {'metric'|'imperial'} units
 * @returns {Promise<object>} OpenWeatherMap current weather response
 */
export async function fetchWeatherByCoords(lat, lon, units = 'metric') {
  if (!API_KEY) throw new Error('NO_API_KEY')

  const url = `${BASE}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? `HTTP ${res.status}`)
  }

  return res.json()
}

/**
 * Fetch 5-day / 3-hour forecast by coordinates.
 * @param {number} lat
 * @param {number} lon
 * @param {'metric'|'imperial'} units
 * @returns {Promise<object>}
 */
export async function fetchForecastByCoords(lat, lon, units = 'metric') {
  if (!API_KEY) throw new Error('NO_API_KEY')

  const url = `${BASE}/forecast?lat=${lat}&lon=${lon}&units=${units}&cnt=8&appid=${API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? `HTTP ${res.status}`)
  }

  return res.json()
}

/**
 * Get the OpenWeatherMap icon URL for a given icon code.
 * @param {string} code  e.g. "01d"
 * @param {'2x'|'4x'} size
 */
export const weatherIconUrl = (code, size = '2x') =>
  `https://openweathermap.org/img/wn/${code}@${size}.png`
