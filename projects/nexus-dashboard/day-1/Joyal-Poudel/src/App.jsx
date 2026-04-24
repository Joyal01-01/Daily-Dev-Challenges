import React, { useState, useEffect } from 'react';

import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import WeatherWidget from './components/WeatherWidget';
import PomodoroTimer from './components/PomodoroTimer';
import MetricCard from './components/MetricCard';
import AnalyticsCard from './components/AnalyticsCard';

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


        <section style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Top Row: Key Metrics */}
          <MetricCard label="Revenue" value="$42.5k" trend="+12.5%" />
          <MetricCard label="Active Users" value="1,284" trend="+3.2%" />
          <MetricCard label="System Load" value="24%" trend="-5.1%" />

          {/* Middle Row: Analytics and Weather */}
          <AnalyticsCard />
          <WeatherWidget />
          
          {/* Bottom Row: Productivity and Extra Stats */}
          <PomodoroTimer />
          <MetricCard label="Completed Tasks" value="86" trend="+18%" />
        </section>
      </main>
    </div>
  );
}

export default App;

