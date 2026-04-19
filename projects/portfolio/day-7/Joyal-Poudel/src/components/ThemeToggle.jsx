import React, { useRef, useEffect } from 'react';
import useTheme from '../hooks/useTheme';
import { gsap } from 'gsap';

const ThemeToggle = () => {
  const [theme, toggleTheme] = useTheme();
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (theme === 'dark') {
      gsap.to(sunRef.current, { y: 20, opacity: 0, duration: 0.3, ease: 'back.in' });
      gsap.to(moonRef.current, { y: 0, opacity: 1, duration: 0.3, delay: 0.1, ease: 'back.out' });
      gsap.to(containerRef.current, { backgroundColor: 'rgba(255, 255, 255, 0.08)', duration: 0.3 });
    } else {
      gsap.to(moonRef.current, { y: 20, opacity: 0, duration: 0.3, ease: 'back.in' });
      gsap.to(sunRef.current, { y: 0, opacity: 1, duration: 0.3, delay: 0.1, ease: 'back.out' });
      gsap.to(containerRef.current, { backgroundColor: 'rgba(0, 0, 0, 0.05)', duration: 0.3 });
    }
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      ref={containerRef}
      className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden cursor-pointer border border-[var(--glass-border)] hover:scale-110 transition-transform"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div ref={sunRef} className="absolute inset-0 flex items-center justify-center opacity-0 transform translate-y-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-500"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </div>
      <div ref={moonRef} className="absolute inset-0 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-400"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  );
};

export default ThemeToggle;
