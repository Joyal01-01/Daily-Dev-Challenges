# 🚀 Full-stack Notes App (React + FastAPI) — Day 1 Fullstack Challenge

**Issue:** [#212](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/212) | Week 1 | Intermediate

## 📋 Description

A full-stack note-taking app. FastAPI + SQLite backend with full CRUD. React frontend with create/edit forms and list view. Connected via Fetch API with CORS handled properly.

## ✨ Features

**Backend (FastAPI)**
- `GET /notes` — list all notes
- `GET /notes/{id}` — get single note
- `POST /notes` — create note
- `PUT /notes/{id}` — update note
- `DELETE /notes/{id}` — delete note
- SQLite storage
- CORS via `CORSMiddleware`

**Frontend (React)**
- Notes list view
- Create new note form
- Edit existing note
- Delete note
- React Router for `/notes` and `/notes/:id`

## 🧠 Concepts Practiced

`FastAPI + React` · `CORS` · `SQLite` · `Full-stack flow` · `React Router`

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
│   │   ├── pages/
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```
