import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans antialiased flex flex-col justify-center items-center">
      <h1 className="section-title">Portfolio Initialization</h1>
      <p className="section-subtitle">React + Vite + Tailwind Setup Complete</p>
      
      <div className="glass-card p-8 mt-4 text-center max-w-md w-full">
        <p className="text-lg font-medium text-[var(--color-accent)] mb-4">Phase 1 Task Completed</p>
        <ul className="text-left text-[var(--color-muted)] space-y-2">
          <li>✅ React/Vite initialized</li>
          <li>✅ Tailwind CSS configured</li>
          <li>✅ Clean configuration files</li>
          <li>✅ Target folder structure implemented</li>
        </ul>
      </div>
    </div>
  )
}

export default App
