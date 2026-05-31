/**
 * Banking Dashboard — Theme Toggle
 * Day 2 — UI/UX Challenge
 * Author: devashmit
 */

const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

// Load saved theme preference
const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);
updateToggleIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateToggleIcon(next);
});

function updateToggleIcon(theme) {
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
}
