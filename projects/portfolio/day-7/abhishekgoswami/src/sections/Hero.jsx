import React from 'react'

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20"
    >
      <p className="text-[var(--color-accent)] text-sm font-mono tracking-widest uppercase mb-4">
        Hello, I&apos;m
      </p>
      <h1 className="section-title mb-4">Abhishek Goswami</h1>
      <p className="text-[var(--color-muted)] text-lg max-w-xl mb-8">
        Full Stack Developer crafting clean, performant web experiences with React, Node.js, and
        modern tooling.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="#projects"
          className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-3 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] font-medium text-sm hover:bg-[var(--color-primary)]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
        >
          Contact Me
        </a>
      </div>
    </section>
  )
}
