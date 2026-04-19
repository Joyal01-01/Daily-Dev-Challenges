import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle math
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      id="scroll-to-top-btn"
      className={`scroll-top-btn ${visible ? 'scroll-top-btn--visible' : ''}`}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" className="scroll-top-svg" aria-hidden="true">
        {/* Track */}
        <circle
          cx="24" cy="24" r={radius}
          fill="none"
          stroke="rgba(108,99,255,0.15)"
          strokeWidth="3"
        />
        {/* Progress */}
        <circle
          cx="24" cy="24" r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 24 24)"
          style={{ transition: 'stroke-dashoffset 0.15s ease' }}
        />
        {/* Arrow */}
        <path
          d="M24 31 L24 17 M18 23 L24 17 L30 23"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
