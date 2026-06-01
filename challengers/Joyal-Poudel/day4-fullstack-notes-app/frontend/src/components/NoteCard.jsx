import React, { useState } from 'react';
import '../styles/NoteCard.css';

function NoteCard({ note, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [selectedColor, setSelectedColor] = useState(note.color);

  const colors = ['yellow', 'pink', 'blue', 'green', 'purple'];

  const handleSave = () => {
    onUpdate(note.id, {
      title: editedTitle,
      content: editedContent,
      color: selectedColor,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setSelectedColor(note.color);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isEditing) {
    return (
      <div className={`note-card editing color-${selectedColor}`}>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="edit-title"
          placeholder="Note title"
        />
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="edit-content"
          placeholder="Note content"
        />

        <div className="color-picker">
          {colors.map(color => (
            <button
              key={color}
              className={`color-option color-${color} ${
                selectedColor === color ? 'selected' : ''
              }`}
              onClick={() => setSelectedColor(color)}
              title={color}
            />
          ))}
        </div>

        <div className="edit-actions">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`note-card color-${note.color}`}>
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => setIsEditing(true)}
            title="Edit"
          >
            ✎
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(note.id)}
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="note-content">
        <p>{note.content}</p>
      </div>

      <div className="note-footer">
        <small className="note-date">{formatDate(note.created_at)}</small>
      </div>
    </div>
  );
}

export default NoteCard;
