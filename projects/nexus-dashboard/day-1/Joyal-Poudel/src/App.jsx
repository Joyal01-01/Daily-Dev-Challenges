import React, { useState, useEffect, lazy, Suspense } from 'react';

import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import MetricCard from './components/MetricCard';

// Lazy load components for performance optimization
const WeatherWidget = lazy(() => import('./components/WeatherWidget'));
const PomodoroTimer = lazy(() => import('./components/PomodoroTimer'));
const AnalyticsCard = lazy(() => import('./components/AnalyticsCard'));

// Loading fallback component
const CardSkeleton = () => (
  <div className="skeleton-card" style={{ 
    height: '200px', 
    background: 'rgba(255,255,255,0.05)', 
    borderRadius: '16px',
    animation: 'pulse 1.5s infinite'
  }} />
);

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
      <Sidebar theme={theme} toggleTheme={toggleTheme} />

      <main className="main-content">
        <DashboardHeader />

        <Suspense fallback={<div className="loading-grid">Loading dashboard...</div>}>
          <section style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {/* Top Row: Key Metrics - Keeping these non-lazy as they are critical and lightweight */}
            <MetricCard label="Revenue" value="$42.5k" trend="+12.5%" />
            <MetricCard label="Active Users" value="1,284" trend="+3.2%" />
            <MetricCard label="System Load" value="24%" trend="-5.1%" />

            {/* Middle Row: Analytics and Weather (Lazy Loaded) */}
            <Suspense fallback={<CardSkeleton />}>
              <AnalyticsCard />
            </Suspense>
            <Suspense fallback={<CardSkeleton />}>
              <WeatherWidget />
            </Suspense>
            
            {/* Bottom Row: Productivity and Extra Stats (Lazy Loaded) */}
            <Suspense fallback={<CardSkeleton />}>
              <PomodoroTimer />
            </Suspense>
            <MetricCard label="Completed Tasks" value="86" trend="+18%" />
          </section>
        </Suspense>
      </main>
    </div>
  );
}

export default App;


