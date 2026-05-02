import React from 'react'

/**
 * Skeleton — animated shimmer placeholder.
 * @param {{ className?: string }} props
 */
export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      aria-hidden="true"
      role="presentation"
    />
  )
}
