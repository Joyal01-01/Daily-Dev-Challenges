import React, { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production: send to a backend or form service
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 px-6 max-w-2xl mx-auto"
    >
      <h2 id="contact-heading" className="section-title">Contact</h2>
      <p className="section-subtitle">Let&apos;s work together</p>

      {submitted ? (
        <div
          role="alert"
          className="glass-card p-8 text-center text-[var(--color-accent)] font-medium"
        >
          ✅ Thanks for reaching out! I&apos;ll get back to you soon.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 flex flex-col gap-5"
          noValidate
          aria-label="Contact form"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-[var(--color-muted)] font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[var(--color-text)] text-sm placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-[var(--color-muted)] font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[var(--color-text)] text-sm placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm text-[var(--color-muted)] font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="What's on your mind?"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[var(--color-text)] text-sm placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] self-start"
          >
            Send Message
          </button>
        </form>
      )}
    </section>
  )
}
