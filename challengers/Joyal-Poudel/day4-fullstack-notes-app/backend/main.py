from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json
import os

app = FastAPI(title="Notes API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class NoteCreate(BaseModel):
    title: str
    content: str
    color: Optional[str] = "yellow"

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    color: Optional[str] = None

class Note(BaseModel):
    id: str
    title: str
    content: str
    color: str
    created_at: str
    updated_at: str

# Database (using JSON file for simplicity)
NOTES_FILE = "notes.json"

def load_notes():
    if os.path.exists(NOTES_FILE):
        with open(NOTES_FILE, "r") as f:
            return json.load(f)
    return {}

def save_notes(notes):
    with open(NOTES_FILE, "w") as f:
        json.dump(notes, f, indent=2)

# Routes
@app.get("/")
async def root():
    return {
        "message": "Notes API",
        "version": "1.0.0",
        "endpoints": {
            "GET /notes": "Get all notes",
            "GET /notes/{note_id}": "Get a specific note",
            "POST /notes": "Create a new note",
            "PUT /notes/{note_id}": "Update a note",
            "DELETE /notes/{note_id}": "Delete a note",
            "POST /notes/search": "Search notes"
        }
    }

@app.get("/notes", response_model=List[Note])
async def get_notes():
    """Get all notes"""
    notes = load_notes()
    return [Note(**note) for note in notes.values()]

@app.get("/notes/{note_id}", response_model=Note)
async def get_note(note_id: str):
    """Get a specific note"""
    notes = load_notes()
    if note_id not in notes:
        raise HTTPException(status_code=404, detail="Note not found")
    return Note(**notes[note_id])

@app.post("/notes", response_model=Note)
async def create_note(note: NoteCreate):
    """Create a new note"""
    notes = load_notes()
    
    note_id = str(int(datetime.now().timestamp() * 1000))
    now = datetime.now().isoformat()
    
    new_note = {
        "id": note_id,
        "title": note.title,
        "content": note.content,
        "color": note.color,
        "created_at": now,
        "updated_at": now
    }
    
    notes[note_id] = new_note
    save_notes(notes)
    
    return Note(**new_note)

@app.put("/notes/{note_id}", response_model=Note)
async def update_note(note_id: str, note: NoteUpdate):
    """Update a note"""
    notes = load_notes()
    
    if note_id not in notes:
        raise HTTPException(status_code=404, detail="Note not found")
    
    existing_note = notes[note_id]
    
    if note.title is not None:
        existing_note["title"] = note.title
    if note.content is not None:
        existing_note["content"] = note.content
    if note.color is not None:
        existing_note["color"] = note.color
    
    existing_note["updated_at"] = datetime.now().isoformat()
    
    notes[note_id] = existing_note
    save_notes(notes)
    
    return Note(**existing_note)

@app.delete("/notes/{note_id}")
async def delete_note(note_id: str):
    """Delete a note"""
    notes = load_notes()
    
    if note_id not in notes:
        raise HTTPException(status_code=404, detail="Note not found")
    
    del notes[note_id]
    save_notes(notes)
    
    return {"message": "Note deleted successfully"}

@app.post("/notes/search")
async def search_notes(query: dict):
    """Search notes by title or content"""
    search_term = query.get("query", "").lower()
    notes = load_notes()
    
    results = [
        Note(**note) for note in notes.values()
        if search_term in note["title"].lower() or search_term in note["content"].lower()
    ]
    
    return results

@app.delete("/notes")
async def delete_all_notes():
    """Delete all notes"""
    save_notes({})
    return {"message": "All notes deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
