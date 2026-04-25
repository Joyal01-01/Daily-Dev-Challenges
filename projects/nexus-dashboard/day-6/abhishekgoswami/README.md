# Nexus Dashboard — Day 6: Phase 6 - Custom Search & Quick Links

## Submission by: Abhishek Goswami

### What was done
Built a **command-palette style search bar** (Ctrl+K) that lets users:
- Filter tasks and navigate to dashboard pages
- Jump to external quick links (GitHub, MDN, Vite, Tailwind)
- Use full keyboard navigation (↑↓ arrows, Enter to select, Esc to close)

### Accessibility
- `role="dialog"` + `aria-modal` on the overlay
- `role="combobox"` on the input with `aria-activedescendant`
- `role="listbox"` + `role="option"` on results
- `role="group"` per category
- Focus trapped to input on open
- Esc closes the palette
- `aria-keyshortcuts` on the trigger button

### Architecture
```
src/
 ├── context/
 │    └── ThemeContext.jsx     # Theme & context provider
 ├── components/
 │    └── common/
 │         └── SearchPalette.jsx  # Command palette component
 ├── utils/
 │    └── localStorage.js     # Safe localStorage helpers
 ├── styles/
 │    └── index.css
 └── App.jsx
```

### Run locally
```bash
npm install
npm run dev
```
