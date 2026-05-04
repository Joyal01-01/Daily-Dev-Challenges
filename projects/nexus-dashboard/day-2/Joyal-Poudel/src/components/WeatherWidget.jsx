import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Loader } from 'lucide-react';

const WeatherWidget = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We'll use a hardcoded location for demo purposes (e.g., London)
    // Latitude and longitude for London
    const lat = 51.5085;
    const lon = -0.1257;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Using Open-Meteo free API
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=auto`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const result = await response.json();
        setData(result.current);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather data every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper to map WMO weather codes to Lucide icons
  const getWeatherIcon = (code) => {
    // WMO Weather interpretation codes
    if (code === 0) return <Sun className="weather-icon" size={32} color="#facc15" />; // Clear sky
    if (code >= 1 && code <= 3) return <Cloud className="weather-icon" size={32} color="#94a3b8" />; // Partly cloudy
    if (code >= 51 && code <= 67) return <CloudRain className="weather-icon" size={32} color="#60a5fa" />; // Rain
    if (code >= 71 && code <= 77) return <CloudSnow className="weather-icon" size={32} color="#e2e8f0" />; // Snow
    if (code >= 95 && code <= 99) return <CloudLightning className="weather-icon" size={32} color="#c084fc" />; // Thunderstorm
    
    return <Cloud className="weather-icon" size={32} color="#94a3b8" />; // Default fallback
  };

  const getWeatherDescription = (code) => {
    if (code === 0) return 'Clear sky';
    if (code >= 1 && code <= 3) return 'Partly cloudy';
    if (code >= 51 && code <= 67) return 'Rain';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Cloudy';
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Local Weather (London)
        </h3>
        
        {loading ? (
          <Loader className="loading-spinner" size={20} style={{ animation: 'spin 2s linear infinite' }} />
        ) : data ? (
          getWeatherIcon(data.weather_code)
        ) : null}
      </div>

      {error ? (
        <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: 'auto' }}>
          {error}
        </div>
      ) : data ? (
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 700 }}>{Math.round(data.temperature_2m)}°C</span>
          </div>
          
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: 500 }}>
            {getWeatherDescription(data.weather_code)}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Humidity</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{data.relative_humidity_2m}%</span>
            </div>
            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Wind</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{data.wind_speed_10m} km/h</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: 'auto' }}>
          No data available
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default WeatherWidget;
