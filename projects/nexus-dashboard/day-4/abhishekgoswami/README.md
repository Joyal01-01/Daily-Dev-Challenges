# Nexus Dashboard — Day 4: Phase 4 - Smart Task Manager (CRUD)

## Closes: #199 (also #188, #157)

### What was built
- **Full CRUD** — Create, Read, Update (inline edit), Delete tasks
- **`useReducer`** for all state transitions (ADD / TOGGLE / EDIT / DELETE / CLEAR_COMPLETED)
- **Priority levels** — High 🔴 / Medium 🟡 / Low 🟢 with colour-coded badges
- **Filter tabs** — All / Active / Done / High / Medium / Low
- **Search** — real-time text filter across task names
- **Progress bar** — shows % of tasks completed
- **Stats row** — high-priority active, in-progress, completed counts
- **localStorage persistence** — tasks saved on every dispatch, rehydrated on mount
- **Inline editing** — click ✏️ to edit text + priority in-place (Enter to save, Esc to cancel)
- **Clear completed** — bulk delete all done tasks
- **Accessibility** — `aria-label`, `aria-live`, `role="tablist"`, `role="progressbar"` throughout

### Architecture
```
src/
 ├── context/
 │    ├── ThemeContext.jsx     # Midnight / Forest / Sunset themes
 │    └── TaskContext.jsx      # useReducer + localStorage persistence
 ├── components/
 │    ├── common/
 │    │    └── ThemeSwitcher.jsx
 │    └── widgets/
 │         ├── TaskManager.jsx  # Main task list UI
 │         ├── TaskForm.jsx     # Add task form
 │         └── TaskItem.jsx     # Individual task row with inline edit
 ├── utils/
 │    ├── formatters.js         # formatDateTime, uid
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
