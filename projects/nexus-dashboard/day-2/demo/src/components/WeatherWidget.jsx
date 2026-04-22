import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Use OpenWeatherMap API (free tier)
            const apiKey = 'c7e2f5d8b1a9e4c6f2d1b8e5a9c6f3e2'; // Demo key
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
            );
            
            setWeather(response.data);
            setLoading(false);
          });
        } else {
          // Fallback: Use default coordinates (New York)
          const apiKey = 'c7e2f5d8b1a9e4c6f2d1b8e5a9c6f3e2';
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.0060&units=metric&appid=${apiKey}`
          );
          setWeather(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="glass-card p-8 h-96">
        <div className="skeleton h-12 mb-4 rounded"></div>
        <div className="skeleton h-20 mb-4 rounded"></div>
        <div className="skeleton h-12 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-8 h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-2">⚠️ Error loading weather</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 h-96 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-2">{weather?.name || 'Unknown'}</h3>
        <p className="text-sm text-gray-400 mb-4">{weather?.sys?.country}</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="text-6xl font-bold">{Math.round(weather?.main?.temp)}°</div>
        <div className="text-right">
          <p className="text-lg capitalize">{weather?.weather?.[0]?.main}</p>
          <p className="text-sm text-gray-400">{weather?.weather?.[0]?.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-gray-600 pt-4">
        <div>
          <p className="text-xs text-gray-400">Feels Like</p>
          <p className="text-lg font-semibold">{Math.round(weather?.main?.feels_like)}°</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Humidity</p>
          <p className="text-lg font-semibold">{weather?.main?.humidity}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Wind</p>
          <p className="text-lg font-semibold">{weather?.wind?.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
