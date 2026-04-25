import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="bg-[var(--color-surface)] border-t border-white/5 py-8 px-6 text-center"
    >
      <p className="text-[var(--color-muted)] text-sm mb-1">
        &copy; {year} Abhishek Goswami. All rights reserved.
      </p>
      <p className="text-xs text-[var(--color-muted)]/60">
        🛠 Built by Me — Abhishek Goswami
      </p>
    </footer>
  )
}
