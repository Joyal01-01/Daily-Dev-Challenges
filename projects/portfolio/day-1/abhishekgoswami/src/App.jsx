import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans antialiased flex flex-col justify-center items-center px-4">
      <h1 className="section-title">Abhishek Goswami</h1>
      <p className="section-subtitle">Portfolio — Phase 1: Project Setup & Clean Architecture</p>

      <div className="glass-card p-8 mt-4 text-center max-w-md w-full">
        <p className="text-lg font-medium text-[var(--color-accent)] mb-4">Phase 1 Complete ✅</p>
        <ul className="text-left text-[var(--color-muted)] space-y-2 text-sm">
          <li>✅ React + Vite initialized</li>
          <li>✅ Tailwind CSS configured</li>
          <li>✅ .prettierrc set up</li>
          <li>✅ Clean folder structure implemented</li>
          <li>✅ assets / components / hooks / sections / styles</li>
        </ul>
      </div>
    </div>
  )
}

export default App
