import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8000";

export default function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    fetch(`${API}/notes/${id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setNote)
      .catch(() => navigate("/notes"));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this note?")) return;
    await fetch(`${API}/notes/${id}`, { method: "DELETE" });
    navigate("/notes");
  };

  if (!note) return <div className="layout"><p>Loading…</p></div>;

  return (
    <div className="layout">
      <div className="back-link" onClick={() => navigate("/notes")} role="button" tabIndex={0}>← Back to notes</div>
      <div className="note-detail">
        <h2>{note.title}</h2>
        <p className="note-detail__meta">Updated {new Date(note.updated_at).toLocaleString()}</p>
        <p className="note-detail__content">{note.content || "No content."}</p>
        <div className="note-detail__actions">
          <button className="btn btn--primary" onClick={() => navigate(`/notes/${id}/edit`)}>Edit</button>
          <button className="btn btn--danger" onClick={handleDelete}>Delete</button>
          <button className="btn btn--ghost" onClick={() => navigate("/notes")}>Back</button>
        </div>
      </div>
    </div>
  );
}
