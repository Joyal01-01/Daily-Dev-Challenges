# Noted.

A simple and clean full-stack notes application.
Frontend UI was developed with assistance from AI tools, while I actively structured, customized, and integrated components into the project.

---

## 📂 Project Structure

* **`backend/`**: Python FastAPI server, SQLAlchemy ORM, and SQLite database.
* **`frontend/`**: React frontend built with Vite and styled with vanilla CSS.

---

##  How to Run

### 1. Start the Backend API
```bash
cd backend
source myenv/bin/activate
uvicorn main:app --reload
```

### 2. Start the Frontend UI
```bash
cd frontend
npm start
```

---

##  API Endpoints

* `GET /notes` — List all notes
* `GET /notes/{id}` — Retrieve a specific note
* `POST /notes` — Create a new note
* `PUT /notes/{id}` — Update an existing note
* `DELETE /notes/{id}` — Delete a note
