import React from 'react'

/**
 * StatsWidget — shows Pomodoro technique info tiles.
 */
const INFO = [
  { icon: '🍅', title: '25 min Focus', desc: 'Deep work block — no distractions.' },
  { icon: '☕', title: '5 min Break',  desc: 'Short rest to recharge your brain.' },
  { icon: '🛋️', title: '15 min Break', desc: 'Long break after every 4 sessions.' },
]

export default function StatsWidget() {
  return (
    <>
      {INFO.map(({ icon, title, desc }) => (
        <div key={title} className="tile tile-third flex flex-col gap-2">
          <span className="text-2xl" aria-hidden="true">{icon}</span>
          <p className="font-semibold text-sm text-[var(--color-text)]">{title}</p>
          <p className="text-xs text-[var(--color-muted)]">{desc}</p>
        </div>
      ))}
    </>
  )
}
