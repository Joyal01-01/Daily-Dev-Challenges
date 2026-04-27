/**
 * Nexus Dashboard — Service Worker
 * Handles offline caching with a Cache-First strategy for static assets
 * and a Network-First strategy for dynamic content.
 */

const CACHE_NAME = 'nexus-v1'
const OFFLINE_URL = '/offline.html'

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
]

// ── Install: precache static assets ──────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  )
  // Activate immediately without waiting for old SW to finish
  self.skipWaiting()
})

// ── Activate: clean up old caches ────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// ── Fetch: Cache-First for static, Network-First for navigation ───────────────
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return

  // Navigation requests — Network-First with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          return response
        })
        .catch(() => caches.match('/index.html'))
    )
    return
  }

  // Static assets — Cache-First
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          return response
        })
    )
  )
})
