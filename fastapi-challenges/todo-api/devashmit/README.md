# ⚡ Todo CRUD API with Pydantic Validation — Day 1 FastAPI Challenge

**Issue:** [#209](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/209) | Week 1 | Beginner

## 📋 Description

A full CRUD REST API for todos built with FastAPI. All request/response bodies are validated with Pydantic models. Tested via Swagger UI at `/docs`.

## ✨ Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/todos` | List all todos |
| GET | `/todos/{id}` | Get a single todo |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/{id}` | Update a todo |
| DELETE | `/todos/{id}` | Delete a todo |

## 🧠 Concepts Practiced

`FastAPI routing` · `Pydantic models` · `HTTP methods` · `Status codes`

## 🚀 How to Run

```bash
pip install fastapi uvicorn
uvicorn main:app --reload
```

Visit [http://localhost:8000/docs](http://localhost:8000/docs) for Swagger UI.

## 🗂 Project Structure

```
devashmit/
├── main.py
├── models.py
├── requirements.txt
└── README.md
```
