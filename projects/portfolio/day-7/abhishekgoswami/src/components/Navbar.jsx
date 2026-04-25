import React, { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[var(--color-surface)]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        <a
          href="#hero"
          className="text-xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent"
          aria-label="Abhishek Goswami — home"
        >
          AG
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 text-sm font-medium"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[var(--color-text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block w-5 h-0.5 bg-current mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-current mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-current transition-all" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-surface)] px-6 pb-4">
          <ul className="flex flex-col gap-4 list-none" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
