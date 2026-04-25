import React from 'react'

const PROJECTS = [
  {
    title: 'Daily Dev Challenges',
    description:
      'A collection of daily frontend challenges covering pagination, search bars, modals, and more.',
    tags: ['React', 'Tailwind', 'JavaScript'],
    link: 'https://github.com/devashmit/Daily-Dev-Challenges',
  },
  {
    title: 'Nexus Dashboard',
    description:
      'A feature-rich dashboard with widgets, theme context, command-palette search, and task management.',
    tags: ['React', 'Context API', 'Vite'],
    link: '#',
  },
  {
    title: 'Portfolio Website',
    description:
      'This portfolio — built with React, Vite, and Tailwind CSS. Deployed on Vercel with optimized assets.',
    tags: ['React', 'Vite', 'Tailwind CSS'],
    link: '#',
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 px-6 max-w-5xl mx-auto"
    >
      <h2 id="projects-heading" className="section-title">Projects</h2>
      <p className="section-subtitle">Things I&apos;ve built</p>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none" role="list">
        {PROJECTS.map(({ title, description, tags, link }) => (
          <li key={title}>
            <article className="glass-card p-6 h-full flex flex-col">
              <h3 className="text-[var(--color-text)] font-semibold text-lg mb-2">{title}</h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed flex-1 mb-4">
                {description}
              </p>
              <ul className="flex flex-wrap gap-2 list-none mb-4" aria-label="Technologies used">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-[var(--color-primary)]/10 text-[var(--color-accent)] font-mono"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors focus:outline-none focus:underline"
                aria-label={`View ${title} project`}
              >
                View Project →
              </a>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
