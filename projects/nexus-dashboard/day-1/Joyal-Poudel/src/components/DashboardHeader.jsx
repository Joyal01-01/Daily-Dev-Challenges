import React from 'react';

const DashboardHeader = () => {
  return (
    <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome back, Creator</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Here's what is happening with your projects today.</p>
      </div>
      
      <div className="glass-panel status-badge">
        <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>System Status:</span> <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Online</span>
      </div>
    </header>
  );
};


export default DashboardHeader;
