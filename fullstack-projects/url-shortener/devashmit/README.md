# 🚀 URL Shortener with Click Analytics — Day 2 Fullstack Challenge

**Issue:** [#221](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/221) | Week 1 | Advanced

## 📋 Description

A Bitly-style URL shortener with click analytics. FastAPI backend generates a 6-character short code, stores URLs in SQLite, and tracks click counts. React frontend provides a form to shorten URLs, displays the short link, copy-to-clipboard, and an analytics view.

## ✨ Features

**Backend (FastAPI)**
- `POST /shorten` — generates a 6-char code using `secrets.token_urlsafe(6)`
- `GET /{code}` — redirects to original URL and increments click counter
- `GET /analytics/{code}` — returns click count and original URL
- SQLite storage via `sqlite3`

**Frontend (React)**
- URL input form with validation
- Short link display with copy-to-clipboard button
- Analytics view showing click count per link
- Clean, responsive UI

## 🧠 Concepts Practiced

- URL shortening algorithm
- SQLite with FastAPI
- Click tracking via redirect interception
- Clipboard API
- React state + fetch

## 🚀 How to Run

**Backend:**
```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🗂 Project Structure

```
devashmit/
├── backend/
│   ├── main.py
│   ├── database.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```
