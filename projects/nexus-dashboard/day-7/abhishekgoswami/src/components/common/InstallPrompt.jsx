import React from 'react'

/**
 * Shows a PWA install prompt card when the browser fires beforeinstallprompt.
 */
export default function InstallPrompt({ onInstall, onDismiss }) {
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Install Nexus Dashboard"
      className="install-prompt"
    >
      <p className="text-sm font-semibold text-[var(--color-text)] mb-1">
        📲 Install Nexus Dashboard
      </p>
      <p className="text-xs text-[var(--color-muted)] mb-3">
        Add to your home screen for offline access and a faster experience.
      </p>
      <div className="flex gap-2">
        <button
          onClick={onInstall}
          className="flex-1 px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-xs font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          Install
        </button>
        <button
          onClick={onDismiss}
          className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[var(--color-muted)] text-xs hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          Not now
        </button>
      </div>
    </div>
  )
}
