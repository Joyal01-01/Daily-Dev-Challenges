import React from 'react'

/**
 * Shows a fixed banner when the user is offline.
 */
export default function OfflineBanner({ isOnline }) {
  if (isOnline) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="You are offline"
      className="offline-banner"
    >
      📡 You&apos;re offline — cached content is available
    </div>
  )
}
