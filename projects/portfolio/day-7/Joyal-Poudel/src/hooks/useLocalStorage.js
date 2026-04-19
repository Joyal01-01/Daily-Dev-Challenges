import { useState, useEffect } from 'react';

/**
 * A custom hook to synchronize state with localStorage.
 * 
 * @param {string} key - The key to store in localStorage.
 * @param {any} initialValue - The initial value to use if no value is found in localStorage.
 * @returns {[any, Function]} - The current value and a function to update it.
 */
function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
