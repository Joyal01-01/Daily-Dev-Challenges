# ⚡ JWT Authentication System — Day 2 FastAPI Challenge

**Issue:** [#218](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/218) | Week 1 | Intermediate

## 📋 Description

A FastAPI application with full JWT authentication. Implements user registration, login (returns access token), and a protected `/me` endpoint. Passwords are hashed with bcrypt.

## ✨ Features

- `POST /register` — create a new user (password hashed with bcrypt)
- `POST /login` — returns a signed JWT access token
- `GET /me` — protected route, returns current user info
- `OAuth2PasswordBearer` scheme for token extraction
- Token expiry handling
- In-memory user store (easily swappable for a real DB)

## 🧠 Concepts Practiced

- JWT with `python-jose`
- Password hashing with `passlib[bcrypt]`
- `OAuth2PasswordBearer` dependency
- FastAPI dependency injection for protected routes

## 🚀 How to Run

```bash
pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt]
uvicorn main:app --reload
```

Visit [http://localhost:8000/docs](http://localhost:8000/docs) for the interactive Swagger UI.

## 🗂 Project Structure

```
devashmit/
├── main.py
├── auth.py
├── models.py
├── requirements.txt
└── README.md
```
