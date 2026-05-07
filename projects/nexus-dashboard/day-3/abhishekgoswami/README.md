# Nexus Dashboard - Day 3: Phase 3 - The Flow Pomodoro Timer

## Submission by: Abhishek Goswami
## Closes: #167 (also #155)

### What was built
- **Circular SVG progress ring** — `strokeDashoffset` animates as time drains
- **Start / Pause / Reset / Skip** controls with full keyboard accessibility
- **Three modes**: Focus (25 min) · Short Break (5 min) · Long Break (15 min)
- **useEffect + setInterval** — interval created on start, cleaned up on pause/unmount
- **Web Audio API "ding"** — synthesised tone on session completion (no external file)
- **Browser Notification** — fires when timer ends (requests permission on first use)
- **Session tracker** — dot indicators, auto long break after 4 focus sessions
- **localStorage persistence** — session count survives page refresh
- **Theme engine** — Midnight / Forest / Sunset via CSS variables

### Architecture
```
src/
 ├── context/
 │    └── ThemeContext.jsx
 ├── components/
 │    ├── common/
 │    │    └── ThemeSwitcher.jsx
 │    └── widgets/
 │         ├── PomodoroWidget.jsx   # Main timer UI
 │         ├── CircularRing.jsx     # SVG ring component
 │         └── StatsWidget.jsx      # Info tiles
 ├── hooks/
 │    └── usePomodoro.js            # Timer state machine
 ├── utils/
 │    ├── formatters.js             # formatCountdown, formatDate
 │    └── localStorage.js
 ├── styles/
 │    └── index.css
 └── App.jsx
```

### Run locally
```bash
npm install
npm run dev
```
