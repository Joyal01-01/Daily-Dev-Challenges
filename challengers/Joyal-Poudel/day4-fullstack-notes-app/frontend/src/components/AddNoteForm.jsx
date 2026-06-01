import React, { useState } from 'react';
import '../styles/AddNoteForm.css';

function AddNoteForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('yellow');

  const colors = ['yellow', 'pink', 'blue', 'green', 'purple'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    onAdd({
      title: title.trim(),
      content: content.trim(),
      color,
    });

    setTitle('');
    setContent('');
    setColor('yellow');
  };

  return (
    <div className="add-note-form-container">
      <form onSubmit={handleSubmit} className="add-note-form">
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-title"
          autoFocus
        />

        <textarea
          placeholder="Note content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-content"
          rows="6"
        />

        <div className="form-footer">
          <div className="color-selector">
            {colors.map(col => (
              <button
                key={col}
                type="button"
                className={`color-btn color-${col} ${color === col ? 'active' : ''}`}
                onClick={() => setColor(col)}
                title={col}
              />
            ))}
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Note
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNoteForm;
