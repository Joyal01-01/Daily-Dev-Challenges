/**
 * Safe localStorage helpers
 */

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage quota exceeded or unavailable — fail silently
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    // fail silently
  }
}
