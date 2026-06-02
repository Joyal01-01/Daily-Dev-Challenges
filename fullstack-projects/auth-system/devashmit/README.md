# 🚀 JWT Auth System (React + FastAPI) — Day 3 Fullstack Challenge

**Issue:** [#233](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/233) | Week 1 | Advanced

## 📋 Description

A complete authentication system: Register, Login, protected Dashboard, and Logout. FastAPI backend with JWT + bcrypt. React frontend with protected routes. Token stored in httpOnly cookie (not localStorage) for XSS safety.

## ✨ Features

**Backend (FastAPI)**
- `POST /auth/register` — register new user, password hashed with bcrypt
- `POST /auth/login` — returns JWT in httpOnly cookie
- `POST /auth/logout` — clears the cookie
- `GET /auth/me` — protected, returns current user
- httpOnly cookie — immune to XSS attacks

**Frontend (React)**
- Register and Login forms
- Protected Dashboard route
- Logout button
- `axios` with `withCredentials: true`
- Redirects unauthenticated users to login

## 🧠 Concepts Practiced

`JWT` · `httpOnly cookies` · `Protected routes` · `bcrypt` · `axios withCredentials`

## 🚀 How to Run

**Backend:**
```bash
cd backend
pip install fastapi uvicorn python-jose passlib[bcrypt] python-multipart
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
│   ├── auth.py
│   ├── models.py
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
