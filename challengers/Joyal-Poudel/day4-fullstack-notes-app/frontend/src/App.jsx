import React, { useState, useEffect } from 'react';
import './App.css';
import NoteCard from './components/NoteCard';
import AddNoteForm from './components/AddNoteForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const API_URL = 'http://localhost:8000';

  // Fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/notes`);
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data);
      setFilteredNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      alert('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  // Create a new note
  const handleAddNote = async (note) => {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      if (!response.ok) throw new Error('Failed to create note');
      await fetchNotes();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note');
    }
  };

  // Delete a note
  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      const response = await fetch(`${API_URL}/notes/${noteId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete note');
      await fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
    }
  };

  // Update a note
  const handleUpdateNote = async (noteId, updatedNote) => {
    try {
      const response = await fetch(`${API_URL}/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNote),
      });
      if (!response.ok) throw new Error('Failed to update note');
      await fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note');
    }
  };

  // Search notes
  useEffect(() => {
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchTerm, notes]);

  // Load notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>📝 Notes App</h1>
        <p>Keep your thoughts organized</p>
      </header>

      <div className="app-container">
        {/* Search Bar */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <button
            className="add-note-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancel' : '+ New Note'}
          </button>
        </div>

        {/* Add Note Form */}
        {showForm && (
          <AddNoteForm
            onAdd={handleAddNote}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Notes Grid */}
        <div className="notes-container">
          {loading && <p className="loading">Loading notes...</p>}
          {!loading && filteredNotes.length === 0 && (
            <p className="empty-state">
              {searchTerm
                ? 'No notes found matching your search'
                : 'No notes yet. Create one to get started!'}
            </p>
          )}
          {!loading && filteredNotes.length > 0 && (
            <div className="notes-grid">
              {filteredNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                  onUpdate={handleUpdateNote}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {!loading && notes.length > 0 && (
          <div className="stats-bar">
            <p>{notes.length} total notes • {filteredNotes.length} showing</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
