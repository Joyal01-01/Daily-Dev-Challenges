import React from 'react'

const SKILLS = [
  'React', 'JavaScript', 'TypeScript', 'Node.js',
  'Tailwind CSS', 'Git', 'REST APIs', 'Vite',
]

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 px-6 max-w-4xl mx-auto"
    >
      <h2 id="about-heading" className="section-title">About Me</h2>
      <p className="section-subtitle">A bit about who I am</p>

      <div className="glass-card p-8 grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-[var(--color-muted)] leading-relaxed mb-4">
            I&apos;m a passionate developer who loves building things for the web. I focus on
            writing clean, maintainable code and creating intuitive user experiences.
          </p>
          <p className="text-[var(--color-muted)] leading-relaxed">
            When I&apos;m not coding, I&apos;m exploring new technologies, contributing to open
            source, and sharpening my problem-solving skills through daily challenges.
          </p>
        </div>

        <div>
          <h3 className="text-[var(--color-text)] font-semibold mb-4">Tech Stack</h3>
          <ul className="flex flex-wrap gap-2 list-none" role="list" aria-label="Skills">
            {SKILLS.map((skill) => (
              <li
                key={skill}
                className="px-3 py-1 text-xs font-mono rounded-full bg-[var(--color-primary)]/15 text-[var(--color-accent)] border border-[var(--color-primary)]/20"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
