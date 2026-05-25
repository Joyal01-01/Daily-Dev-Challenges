# Nexus Dashboard — Day 1: Phase 1 - Foundation & Theme Engine

## Submission by: Abhishek Goswami
## Closes: #195 (also #184, #174, #163, #150)

### What was done
- **Vite + Tailwind CSS v4** project initialized
- **CSS variable-based theme engine** with 3 themes:
  - 🌙 **Midnight** — deep dark blue (default)
  - 🌿 **Forest** — dark green tones
  - 🌅 **Sunset** — warm orange/amber glow
- **CSS Grid dashboard layout** — 12-column grid with responsive tile spans
- **ThemeContext** — React context with `switchTheme()`, persists to `localStorage`
- **ThemeSwitcher** — accessible button group (`aria-pressed`) in the header
- **Widgets**: Clock (live), Stats, Theme Preview (colour swatches), Tasks (with progress bar)
- **localStorage persistence** — theme choice and task state survive page refresh

### Architecture
```
src/
 ├── api/              # (ready for Axios/Fetch instances)
 ├── context/
 │    └── ThemeContext.jsx   # Theme engine — 3 themes, localStorage
 ├── components/
 │    ├── common/
 │    │    └── ThemeSwitcher.jsx
 │    └── widgets/
 │         ├── WelcomeWidget.jsx
 │         ├── ClockWidget.jsx
 │         ├── StatsWidget.jsx
 │         ├── ThemePreviewWidget.jsx
 │         └── TasksWidget.jsx
 ├── utils/
 │    ├── formatters.js      # formatTime, formatDate, clamp
 │    └── localStorage.js    # safe get/set/remove helpers
 ├── styles/
 │    └── index.css          # theme tokens + grid + tile utilities
 └── App.jsx
```

### Run locally
```bash
npm install
npm run dev
```
