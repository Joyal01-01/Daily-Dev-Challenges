# Nexus Dashboard — Day 2: Phase 2 - Real-time Weather Widget

## Submission by: Abhishek Goswami

### What was done
- **OpenWeatherMap API integration** — fetches current weather + 24-hour forecast by GPS coordinates
- **Geolocation** — `navigator.geolocation.getCurrentPosition()` with timeout + error handling
- **Loading skeletons** — animated shimmer placeholders during "locating" and "loading" states
- **Error states** — graceful UI for:
  - Missing API key (with setup instructions)
  - Permission denied
  - Network errors
  - Geolocation unavailable
- **10-minute cache** — weather data cached in `localStorage` with TTL to reduce API calls
- **Unit toggle** — switch between Celsius (metric) and Fahrenheit (imperial)
- **Forecast strip** — next 8 × 3-hour intervals with icons and temps
- **Retry button** — manual refresh to re-fetch data

### Architecture
```
src/
 ├── api/
 │    └── weather.js              # OpenWeatherMap fetch helpers
 ├── context/
 │    └── ThemeContext.jsx        # Theme engine (Midnight/Forest/Sunset)
 ├── components/
 │    ├── common/
 │    │    ├── ThemeSwitcher.jsx
 │    │    └── Skeleton.jsx       # Shimmer placeholder
 │    └── widgets/
 │         ├── WeatherWidget.jsx  # Main weather display
 │         ├── WeatherSkeleton.jsx
 │         └── WeatherError.jsx
 ├── hooks/
 │    └── useWeather.js           # Manages geolocation + API + cache
 ├── utils/
 │    ├── formatters.js           # roundTemp, unixToTime, titleCase
 │    └── localStorage.js
 ├── styles/
 │    └── index.css
 └── App.jsx
```

### Setup
1. Get a free API key at [openweathermap.org/api](https://openweathermap.org/api)
2. Create `.env.local` in the project root:
   ```
   VITE_WEATHER_API_KEY=your_key_here
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```
4. Allow location access when prompted by the browser

### Features
- **Geolocation** — auto-detects user location on mount
- **Cache** — 10-min TTL in localStorage (avoids redundant API calls)
- **Loading states** — separate UI for "locating" vs "loading"
- **Error handling** — permission denied, network errors, missing API key
- **Unit toggle** — °C / °F switch
- **24-hour forecast** — 8 × 3-hour intervals with icons
- **Refresh button** — manual re-fetch
