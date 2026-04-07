const themeToggle = document.getElementById('theme-toggle');
const rootEl = document.documentElement;

const storedTheme = localStorage.getItem('preferred-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    rootEl.classList.toggle('dark', isDark);
    themeToggle.setAttribute('aria-pressed', isDark);
    themeToggle.querySelector('.icon').textContent = isDark ? '☀️' : '🌙';
    themeToggle.childNodes[2].textContent = isDark ? 'Light Mode' : 'Dark Mode';
};

const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);

themeToggle.addEventListener('click', () => {
    const nextTheme = rootEl.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('preferred-theme', nextTheme);
});
