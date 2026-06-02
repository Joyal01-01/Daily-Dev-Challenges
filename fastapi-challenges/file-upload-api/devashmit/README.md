# ⚡ File Upload & Image Processing API — Day 3 FastAPI Challenge

**Issue:** [#230](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/230) | Week 1 | Intermediate

## 📋 Description

A FastAPI image upload API that accepts image files, validates type and size, then uses Pillow to resize to three sizes (thumbnail/medium/large) using BackgroundTasks. Returns URLs for all three processed versions.

## ✨ Features

- `POST /upload` — upload an image, get back 3 resized URLs
- `GET /images/{filename}` — serve processed images
- Resizes to: thumbnail (150×150), medium (600×600), large (1200×1200)
- File type validation (JPEG, PNG, WebP only)
- 5MB size limit
- Files organized by date: `uploads/YYYY-MM-DD/`
- Processing done via `BackgroundTasks`

## 🧠 Concepts Practiced

`UploadFile` · `Pillow` · `BackgroundTasks` · `File validation`

## 🚀 How to Run

```bash
pip install fastapi uvicorn pillow python-multipart
uvicorn main:app --reload
```

Visit [http://localhost:8000/docs](http://localhost:8000/docs) to test via Swagger UI.

## 🗂 Project Structure

```
devashmit/
├── main.py
├── requirements.txt
└── README.md
```
