import { useState, useEffect, useCallback } from "react";

// Base URL for the backend API, can be overridden via environment variable
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Unified request wrapper to handle errors and standard response formats
const request = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

const api = {
  list:   ()         => request(`${API_BASE}/notes`),
  get:    (id)       => request(`${API_BASE}/notes/${id}`),
  create: (data)     => request(`${API_BASE}/notes`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
  update: (id, data) => request(`${API_BASE}/notes/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
  delete: (id)       => request(`${API_BASE}/notes/${id}`, { method: "DELETE" }),
};

// Date formatting utilities
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return formatDate(iso);
}

const EMPTY_FORM = { title: "", content: "" };

// Main application component
export default function App() {
  const [notes,     setNotes]     = useState([]);
  const [selected,  setSelected]  = useState(null);   // the note currently being viewed
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [mode,      setMode]      = useState("list"); // tracks which screen we're on: list, view, edit, or new
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [error,     setError]     = useState(null);
  const [search,    setSearch]    = useState("");
  const [deleteId,  setDeleteId]  = useState(null);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.list();
      setNotes(data);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadNotes(); }, [loadNotes]);

  const openNew = () => {
    setForm(EMPTY_FORM);
    setSelected(null);
    setMode("new");
  };

  const openEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setSelected(note);
    setMode("edit");
  };

  const openView = (note) => {
    setSelected(note);
    setMode("view");
  };

  const goList = () => {
    setMode("list");
    setSelected(null);
    setForm(EMPTY_FORM);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) return;
    setSaving(true);
    try {
      if (mode === "new") {
        const created = await api.create(form);
        setNotes(prev => [created, ...prev]);
        openView(created);
      } else {
        const updated = await api.update(selected.id, form);
        setNotes(prev => prev.map(n => n.id === updated.id ? updated : n));
        openView(updated);
      }
    } catch {
      setError("Failed to save note.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(id);
      setNotes(prev => prev.filter(n => n.id !== id));
      setDeleteId(null);
      if (selected?.id === id) goList();
    } catch {
      setError("Failed to delete note.");
    }
  };

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo">Noted.</span>
          <button className="new-btn" onClick={openNew}>+ New</button>
        </div>

        <div className="search-wrap">
          <input
            className="search"
            placeholder="Search notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="note-count">
          {loading ? "Loading..." : `${filtered.length} note${filtered.length !== 1 ? "s" : ""}`}
        </div>

        <ul className="note-list">
          {!loading && filtered.length === 0 && (
            <li className="empty-state">
              {search ? "No notes match your search." : "No notes yet. Create one."}
            </li>
          )}
          {filtered.map(note => (
            <li
              key={note.id}
              className={`note-item ${selected?.id === note.id ? "active" : ""}`}
              onClick={() => openView(note)}
            >
              <div className="note-item-title">{note.title}</div>
              <div className="note-item-preview">{note.content.slice(0, 80)}</div>
              <div className="note-item-date">{timeAgo(note.updated_at)}</div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main">
        {error && (
          <div className="error-banner">
            {error}
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        {mode === "list" && (
          <div className="welcome">
            <div className="welcome-inner">
              <h2>Select a note or create a new one.</h2>
              <p>Your notes are stored securely and synced across sessions.</p>
              <button className="btn-primary" onClick={openNew}>Create your first note</button>
            </div>
          </div>
        )}

        {mode === "view" && selected && (
          <div className="note-view">
            <div className="toolbar">
              <button className="btn-ghost" onClick={goList}>← Back</button>
              <div className="toolbar-right">
                <button className="btn-ghost" onClick={() => openEdit(selected)}>Edit</button>
                <button className="btn-danger" onClick={() => setDeleteId(selected.id)}>Delete</button>
              </div>
            </div>
            <div className="note-view-meta">
              <span>Created {formatDate(selected.created_at)}</span>
              <span>·</span>
              <span>Updated {timeAgo(selected.updated_at)}</span>
            </div>
            <h1 className="note-view-title">{selected.title}</h1>
            <div className="note-view-content">{selected.content}</div>
          </div>
        )}

        {(mode === "new" || mode === "edit") && (
          <div className="note-form">
            <div className="toolbar">
              <button className="btn-ghost" onClick={goList}>← Cancel</button>
              <div className="toolbar-right">
                <button
                  className="btn-primary"
                  onClick={handleSave}
                  disabled={saving || !form.title.trim() || !form.content.trim()}
                >
                  {saving ? "Saving..." : mode === "new" ? "Create note" : "Save changes"}
                </button>
              </div>
            </div>

            <input
              className="form-title"
              placeholder="Note title"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              autoFocus
            />
            <textarea
              className="form-content"
              placeholder="Write your note here..."
              value={form.content}
              onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
            />
          </div>
        )}
      </main>

      {deleteId && (
        <div className="modal-backdrop" onClick={() => setDeleteId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Delete this note?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-ghost" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}