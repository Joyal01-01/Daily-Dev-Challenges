# Nexus Dashboard — Day 7: Phase 7 - Performance Audit & PWA

## Submission by: Abhishek Goswami

### What was done
- **Lighthouse 90+ scores** — Performance, Accessibility, Best Practices, SEO, PWA
- **Web App Manifest** (`manifest.webmanifest`) — name, icons, theme color, display: standalone
- **Service Worker** (`sw.js`) — Cache-First for static assets, Network-First for navigation
- **Offline Mode** — falls back to cached `index.html` when network is unavailable
- **Add to Home Screen** — `beforeinstallprompt` captured, custom install UI shown
- **Online/Offline banner** — live status indicator using `navigator.onLine` + events
- **Code splitting** — vendor chunk separated via Vite `rollupOptions`
- **esbuild minification** — smallest possible JS/CSS output
- **SVG favicon** — vector, scales perfectly, tiny file size
- **Semantic HTML + ARIA** — full accessibility throughout

### Architecture
```
src/
 ├── context/
 │    └── ThemeContext.jsx
 ├── components/
 │    └── common/
 │         ├── InstallPrompt.jsx   # PWA Add-to-Home-Screen UI
 │         └── OfflineBanner.jsx   # Offline status banner
 ├── hooks/
 │    └── usePWA.js               # Online/offline + install prompt hook
 ├── utils/
 │    └── localStorage.js
 ├── styles/
 │    └── index.css
 └── App.jsx

public/
 ├── manifest.webmanifest         # PWA manifest
 ├── sw.js                        # Service Worker
 └── favicon.svg
```

### Run locally
```bash
npm install
npm run dev

# Production build
npm run build
npm run preview
```

### Deploy
Deploy the `dist/` folder to **Vercel** or **Netlify**.
Both platforms serve the service worker correctly over HTTPS, enabling full PWA functionality.
