import React, { useContext } from 'react';
import { ThemeContext } from '../App';

function Dashboard() {
  const { toggleTheme, theme, currentTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen p-6">
      <header className="max-w-6xl mx-auto mb-12">
        <div className="glass-card p-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Nexus Dashboard</h1>
            <p className="text-gray-400">Phase 1: Foundation & Theme Engine</p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Theme: {theme}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Widgets */}
        {['Weather Widget', 'Pomodoro Timer', 'Task Manager', 'Analytics', 'Search Bar', 'Quick Links'].map(
          (widget, idx) => (
            <div key={idx} className="glass-card p-6 h-48 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold mb-2">{widget}</p>
                <p className="text-gray-400">Coming in Phase {idx + 2}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;
