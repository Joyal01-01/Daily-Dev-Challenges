import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState({
    todo: [
      { id: '1', title: 'Design login page', description: 'Create UI mockups' },
      { id: '2', title: 'Setup database', description: 'Configure PostgreSQL' },
    ],
    inProgress: [
      { id: '3', title: 'Implement authentication', description: 'JWT tokens' },
    ],
    review: [
      { id: '4', title: 'API endpoints', description: 'REST API documentation' },
    ],
    done: [
      { id: '5', title: 'Project setup', description: 'Initialize repository' },
    ],
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  const columns = [
    { id: 'todo', title: '📋 To Do', color: '#ff9800' },
    { id: 'inProgress', title: '🔄 In Progress', color: '#2196f3' },
    { id: 'review', title: '👀 Review', color: '#9c27b0' },
    { id: 'done', title: '✅ Done', color: '#4caf50' },
  ];

  const handleDragStart = (e, task, columnId) => {
    setDraggedItem(task);
    setDraggedFrom(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();

    if (!draggedItem || !draggedFrom) return;

    if (draggedFrom === columnId) {
      setDraggedItem(null);
      setDraggedFrom(null);
      return;
    }

    // Remove task from source column
    const sourceColumn = [...tasks[draggedFrom]];
    sourceColumn = sourceColumn.filter(t => t.id !== draggedItem.id);

    // Add task to destination column
    const destColumn = [...tasks[columnId]];
    destColumn.push(draggedItem);

    setTasks({
      ...tasks,
      [draggedFrom]: sourceColumn,
      [columnId]: destColumn,
    });

    setDraggedItem(null);
    setDraggedFrom(null);
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) {
      alert('Please enter a task title');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDesc,
    };

    setTasks({
      ...tasks,
      todo: [newTask, ...tasks.todo],
    });

    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  const deleteTask = (columnId, taskId) => {
    const column = tasks[columnId].filter(t => t.id !== taskId);
    setTasks({
      ...tasks,
      [columnId]: column,
    });
  };

  const moveTask = (fromColumn, toColumn, task) => {
    const sourceColumn = tasks[fromColumn].filter(t => t.id !== task.id);
    const destColumn = [...tasks[toColumn], task];

    setTasks({
      ...tasks,
      [fromColumn]: sourceColumn,
      [toColumn]: destColumn,
    });
  };

  const stats = {
    total: Object.values(tasks).flat().length,
    todo: tasks.todo.length,
    inProgress: tasks.inProgress.length,
    review: tasks.review.length,
    done: tasks.done.length,
  };

  return (
    <div className="kanban-app">
      <header className="app-header">
        <h1>📊 Kanban Task Board</h1>
        <div className="stats">
          <span>Total: {stats.total}</span>
          <span>To Do: {stats.todo}</span>
          <span>In Progress: {stats.inProgress}</span>
          <span>Review: {stats.review}</span>
          <span>Done: {stats.done}</span>
        </div>
      </header>

      <div className="app-container">
        {/* Add New Task */}
        <div className="add-task-section">
          <h2>➕ Add New Task</h2>
          <div className="add-task-form">
            <input
              type="text"
              placeholder="Task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <textarea
              placeholder="Task description (optional)"
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              rows="2"
            />
            <button onClick={addTask} className="add-btn">
              Add Task
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="kanban-board">
          {columns.map((column) => (
            <div
              key={column.id}
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div
                className="column-header"
                style={{ borderTopColor: column.color }}
              >
                <h2>{column.title}</h2>
                <span className="task-count">{tasks[column.id].length}</span>
              </div>

              <div className="tasks-container">
                {tasks[column.id].length === 0 ? (
                  <div className="empty-state">No tasks</div>
                ) : (
                  tasks[column.id].map((task) => (
                    <div
                      key={task.id}
                      className="task-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task, column.id)}
                    >
                      <div className="task-header">
                        <h3>{task.title}</h3>
                        <button
                          className="delete-btn"
                          onClick={() => deleteTask(column.id, task.id)}
                        >
                          ✕
                        </button>
                      </div>
                      {task.description && (
                        <p className="task-description">{task.description}</p>
                      )}

                      <div className="task-actions">
                        {column.id !== 'done' && (
                          <button
                            className="action-btn next-btn"
                            onClick={() => {
                              const currentIndex = columns.findIndex(
                                (c) => c.id === column.id
                              );
                              if (currentIndex < columns.length - 1) {
                                moveTask(
                                  column.id,
                                  columns[currentIndex + 1].id,
                                  task
                                );
                              }
                            }}
                          >
                            →
                          </button>
                        )}
                        {column.id !== 'todo' && (
                          <button
                            className="action-btn back-btn"
                            onClick={() => {
                              const currentIndex = columns.findIndex(
                                (c) => c.id === column.id
                              );
                              if (currentIndex > 0) {
                                moveTask(
                                  column.id,
                                  columns[currentIndex - 1].id,
                                  task
                                );
                              }
                            }}
                          >
                            ←
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
