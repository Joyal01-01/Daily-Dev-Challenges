import React, { useState, useEffect, useRef, useCallback } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────
const ITEMS = [
  // Tasks
  { id: 't1', category: 'Tasks', icon: '📋', label: 'View all tasks', action: 'navigate', href: '#tasks' },
  { id: 't2', category: 'Tasks', icon: '➕', label: 'Add new task', action: 'navigate', href: '#add-task' },
  { id: 't3', category: 'Tasks', icon: '✅', label: 'Completed tasks', action: 'navigate', href: '#completed' },
  // Quick Links
  { id: 'l1', category: 'Quick Links', icon: '🐙', label: 'GitHub', action: 'link', href: 'https://github.com' },
  { id: 'l2', category: 'Quick Links', icon: '📖', label: 'MDN Web Docs', action: 'link', href: 'https://developer.mozilla.org' },
  { id: 'l3', category: 'Quick Links', icon: '⚡', label: 'Vite Docs', action: 'link', href: 'https://vitejs.dev' },
  { id: 'l4', category: 'Quick Links', icon: '🎨', label: 'Tailwind CSS', action: 'link', href: 'https://tailwindcss.com' },
  // Dashboard
  { id: 'd1', category: 'Dashboard', icon: '🏠', label: 'Home', action: 'navigate', href: '#home' },
  { id: 'd2', category: 'Dashboard', icon: '📊', label: 'Analytics', action: 'navigate', href: '#analytics' },
  { id: 'd3', category: 'Dashboard', icon: '⚙️', label: 'Settings', action: 'navigate', href: '#settings' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function groupByCategory(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function SearchPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  // Filter items based on query
  const filtered = query.trim()
    ? ITEMS.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : ITEMS

  const grouped = groupByCategory(filtered)
  // Flat list for keyboard navigation
  const flatList = Object.values(grouped).flat()

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIndex(0)
      // Small delay to ensure DOM is ready
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [isOpen])

  // Close on Escape, navigate with arrows, select with Enter
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setActiveIndex((i) => Math.min(i + 1, flatList.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveIndex((i) => Math.max(i - 1, 0))
          break
        case 'Enter': {
          e.preventDefault()
          const item = flatList[activeIndex]
          if (item) handleSelect(item)
          break
        }
        default:
          break
      }
    },
    [isOpen, flatList, activeIndex, onClose]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.querySelector('[data-active="true"]')
    activeEl?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  function handleSelect(item) {
    if (item.action === 'link') {
      window.open(item.href, '_blank', 'noopener,noreferrer')
    } else {
      // In a real app: use router navigation
      window.location.hash = item.href.replace('#', '')
    }
    onClose()
  }

  if (!isOpen) return null

  let flatIndex = 0

  return (
    <div
      className="palette-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="palette-box">
        {/* Search input */}
        <input
          ref={inputRef}
          type="search"
          className="palette-input"
          placeholder="Search tasks, links, pages…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
          aria-autocomplete="list"
          aria-controls="palette-results"
          aria-activedescendant={flatList[activeIndex] ? `palette-item-${flatList[activeIndex].id}` : undefined}
          role="combobox"
          aria-expanded={filtered.length > 0}
        />

        {/* Results */}
        <div
          id="palette-results"
          ref={listRef}
          className="palette-results"
          role="listbox"
          aria-label="Search results"
        >
          {filtered.length === 0 ? (
            <p className="palette-empty" role="status">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} role="group" aria-label={category}>
                <p className="palette-category" aria-hidden="true">
                  {category}
                </p>
                {items.map((item) => {
                  const currentIndex = flatIndex++
                  const isActive = currentIndex === activeIndex

                  return (
                    <a
                      key={item.id}
                      id={`palette-item-${item.id}`}
                      href={item.action === 'link' ? item.href : undefined}
                      target={item.action === 'link' ? '_blank' : undefined}
                      rel={item.action === 'link' ? 'noopener noreferrer' : undefined}
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      className={`palette-item ${isActive ? 'active' : ''}`}
                      onClick={(e) => {
                        if (item.action !== 'link') e.preventDefault()
                        handleSelect(item)
                      }}
                      onMouseEnter={() => setActiveIndex(currentIndex)}
                    >
                      <span className="palette-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className="palette-label">{item.label}</span>
                      {item.action === 'link' && (
                        <span className="ml-auto text-xs text-[var(--color-muted)]" aria-hidden="true">
                          ↗
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="palette-footer" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
