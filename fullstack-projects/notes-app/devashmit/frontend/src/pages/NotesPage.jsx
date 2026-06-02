import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/notes`)
      .then(r => r.json())
      .then(setNotes)
      .catch(console.error);
  }, []);

  return (
    <div className="layout">
      <header>
        <h1>📝 My Notes</h1>
        <button className="btn btn--primary" onClick={() => navigate("/notes/new")}>
          + New Note
        </button>
      </header>

      {notes.length === 0 ? (
        <p className="empty">No notes yet. Create your first one!</p>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <div key={note.id} className="note-card" onClick={() => navigate(`/notes/${note.id}`)} role="button" tabIndex={0}>
              <h3>{note.title}</h3>
              <p>{note.content || "No content"}</p>
              <p className="note-card__date">{new Date(note.updated_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
