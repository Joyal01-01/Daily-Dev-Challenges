import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8000";

export default function NoteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    fetch(`${API}/notes/${id}`)
      .then(r => r.json())
      .then(n => { setTitle(n.title); setContent(n.content); })
      .catch(() => navigate("/notes"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `${API}/notes/${id}` : `${API}/notes`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const note = await res.json();
    navigate(`/notes/${note.id}`);
  };

  return (
    <div className="layout">
      <div className="back-link" onClick={() => navigate(isEdit ? `/notes/${id}` : "/notes")} role="button" tabIndex={0}>← Back</div>
      <h2 style={{ marginBottom: "1.5rem" }}>{isEdit ? "Edit Note" : "New Note"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title" required />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea id="content" value={content} onChange={e => setContent(e.target.value)} placeholder="Write your note here…" />
        </div>
        <div className="form-actions">
          <button className="btn btn--primary" type="submit" disabled={saving}>{saving ? "Saving…" : isEdit ? "Save Changes" : "Create Note"}</button>
          <button className="btn btn--ghost" type="button" onClick={() => navigate(isEdit ? `/notes/${id}` : "/notes")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
