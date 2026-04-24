import React from 'react';
import { LayoutDashboard, Briefcase, Settings, Sun, Moon } from 'lucide-react';

const Sidebar = ({ theme, toggleTheme }) => {
  return (
    <aside className="glass-panel sidebar">
      <h2 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Nexus Engine</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <a href="#" className="nav-link active" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LayoutDashboard size={20} /> Dashboard
        </a>
        <a href="#" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Briefcase size={20} /> Projects
        </a>
        <a href="#" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Settings size={20} /> Settings
        </a>
      </nav>
      
      <button 
        onClick={toggleTheme}
        className="nav-link"
        style={{
          marginTop: 'auto',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-tertiary)',
          cursor: 'pointer',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem'
        }}
      >
        {theme === 'dark' ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
      </button>
    </aside>
  );
};



export default Sidebar;
