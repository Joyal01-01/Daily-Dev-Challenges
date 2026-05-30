import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

const STORAGE_KEY = "devashmit-theme";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "dark"
  );

  // Apply theme to <html> element via data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(t => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="demo-content">
        <h1>Responsive Navbar</h1>
        <p>
          This navbar uses <code>useState</code> for the hamburger menu and
          dark/light mode toggle. The theme is persisted in{" "}
          <code>localStorage</code> so it survives a page refresh.
          Resize the window to see the hamburger menu.
        </p>
      </main>
    </>
  );
}
