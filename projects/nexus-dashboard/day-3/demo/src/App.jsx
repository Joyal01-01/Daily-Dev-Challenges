import React, { useState } from 'react';
import PomodoroTimer from './components/PomodoroTimer';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-12">
          <div className="glass-card p-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">Nexus Dashboard</h1>
            <p className="text-gray-400">Phase 3: The 'Flow' Pomodoro Timer</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PomodoroTimer />
          
          {/* Placeholder for next phases */}
          <div className="glass-card p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold mb-2">More Widgets Coming</p>
              <p className="text-gray-400">Phases 2, 4-7 will add Weather, Tasks, Analytics, and more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
