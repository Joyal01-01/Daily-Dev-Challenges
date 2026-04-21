import React, { useState, useEffect } from 'react';

import WeatherWidget from './components/WeatherWidget';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Placeholder */}
      <aside className="glass-panel" style={{ width: '280px', margin: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h2 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Nexus Engine</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <a href="#" style={{ padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: 'var(--bg-tertiary)' }}>Dashboard</a>
          <a href="#" style={{ padding: '0.5rem', borderRadius: '0.5rem' }}>Projects</a>
          <a href="#" style={{ padding: '0.5rem', borderRadius: '0.5rem' }}>Settings</a>
        </nav>
        
        <button 
          onClick={toggleTheme}
          style={{
            marginTop: 'auto',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'var(--transition-fast)'
          }}
        >
          Toggle Theme
        </button>
      </aside>

      {/* Main Content Placeholder */}
      <main style={{ flex: 1, padding: '1.5rem 2rem' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome back, Creator</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Here's what is happening with your projects today.</p>
          </div>
          
          <div className="glass-panel" style={{ padding: '0.75rem 1.5rem', borderRadius: '2rem' }}>
            <span style={{ fontWeight: 500 }}>System Status:</span> <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Online</span>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Weather Widget */}
          <WeatherWidget />
          
          {/* Metric Cards placeholders */}
          {[1, 2].map(i => (
             <div key={i} className="glass-panel" style={{ padding: '2rem' }}>
               <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Metric {i}</h3>
               <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>{(Math.random() * 100).toFixed(1)}k</p>
             </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
