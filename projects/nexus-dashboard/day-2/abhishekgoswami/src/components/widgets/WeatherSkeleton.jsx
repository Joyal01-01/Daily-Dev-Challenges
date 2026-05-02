import React from 'react'
import Skeleton from '../common/Skeleton'

/**
 * WeatherSkeleton — shown while weather data is loading / locating.
 */
export default function WeatherSkeleton({ status }) {
  return (
    <div
      className="tile tile-full flex flex-col gap-5"
      aria-busy="true"
      aria-label={status === 'locating' ? 'Detecting your location…' : 'Loading weather data…'}
    >
      {/* Status message */}
      <p className="text-xs text-[var(--color-muted)] animate-pulse">
        {status === 'locating' ? '📍 Detecting your location…' : '⛅ Loading weather data…'}
      </p>

      {/* Main row */}
      <div className="flex items-center gap-6">
        <Skeleton className="w-20 h-20 rounded-2xl" />
        <div className="flex flex-col gap-3 flex-1">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-36" />
        </div>
        <div className="hidden sm:flex flex-col gap-2 items-end">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* Forecast row */}
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 items-center flex-1">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-3 w-8" />
          </div>
        ))}
      </div>
    </div>
  )
}
