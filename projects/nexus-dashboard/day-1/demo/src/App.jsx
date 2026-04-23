import React, { createContext, useState } from 'react';
import Dashboard from './components/Dashboard';

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('dark');

  const themes = {
    dark: {
      bg: '#0f0f1a',
      secondary: '#1a1a2e',
      text: '#e4e4e7',
      muted: '#a1a1aa',
      accent: '#3b82f6',
    },
    midnight: {
      bg: '#000000',
      secondary: '#111111',
      text: '#ffffff',
      muted: '#888888',
      accent: '#00d4ff',
    },
    forest: {
      bg: '#0a3d1a',
      secondary: '#1a5c2e',
      text: '#e0f7e0',
      muted: '#7aa87a',
      accent: '#2ecc71',
    },
  };

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextTheme = themeKeys[(currentIndex + 1) % themeKeys.length];
    setTheme(nextTheme);
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, themes: themes, currentTheme, toggleTheme }}>
      <div
        style={{
          backgroundColor: currentTheme.bg,
          color: currentTheme.text,
          '--color-bg': currentTheme.bg,
          '--color-secondary': currentTheme.secondary,
          '--color-text': currentTheme.text,
          '--color-muted': currentTheme.muted,
          '--color-accent': currentTheme.accent,
        }}
        className="min-h-screen transition-all duration-300"
      >
        <Dashboard />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
