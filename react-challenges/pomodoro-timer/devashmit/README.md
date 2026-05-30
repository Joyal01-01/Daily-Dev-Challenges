# ⚛️ Pomodoro Timer with useEffect — Day 2 React Challenge

**Issue:** [#215](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/215) | Week 1 | Intermediate

## 📋 Description

A fully functional Pomodoro timer built with React. Uses `useEffect` + `setInterval` for the countdown with proper cleanup on unmount. Supports work sessions (25 min), short breaks (5 min), and tracks completed sessions.

## ✨ Features

- 25-minute work / 5-minute break cycle
- Start, Pause, and Reset controls
- Session counter tracking completed Pomodoros
- Visual mode indicator (Work / Break)
- Interval cleanup on unmount to prevent memory leaks
- Clean, minimal UI

## 🧠 Concepts Practiced

- `useEffect` with `setInterval`
- Interval cleanup (return function in useEffect)
- `useReducer` for timer state management
- Component lifecycle awareness

## 🚀 How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🗂 Project Structure

```
devashmit/
├── src/
│   ├── App.jsx
│   ├── PomodoroTimer.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```
