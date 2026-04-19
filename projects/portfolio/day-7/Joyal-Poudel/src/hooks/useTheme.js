import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * A custom hook to manage the application theme (light/dark).
 * 
 * @returns {[string, Function]} - The current theme ('light' or 'dark') and a function to toggle it.
 */
function useTheme() {
  // Use localStorage to persist theme preference, defaulting to 'dark'
  const [theme, setTheme] = useLocalStorage('portfolio-theme', 'dark');

  useEffect(() => {
    // Apply the theme to the root element (html)
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
    
    // Also add/remove classes if needed for tailwind or other purposes
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return [theme, toggleTheme];
}

export default useTheme;
