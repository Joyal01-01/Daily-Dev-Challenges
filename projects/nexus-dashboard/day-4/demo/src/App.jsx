import React, { useReducer, useEffect, useState } from 'react';

function App() {
  const taskReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return [...state, { id: Date.now(), ...action.payload, createdAt: new Date().toLocaleDateString() }];
      case 'DELETE_TASK':
        return state.filter(task => task.id !== action.payload);
      case 'UPDATE_TASK':
        return state.map(task => task.id === action.payload.id ? { ...task, ...action.payload } : task);
      case 'TOGGLE_COMPLETE':
        return state.map(task => task.id === action.payload ? { ...task, completed: !task.completed } : task);
      case 'SET_TASKS':
        return action.payload;
      default:
        return state;
    }
  };

  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState('Medium');
  const [dueDate, setDueDate] = React.useState('');
  const [filterPriority, setFilterPriority] = React.useState('All');
  const [filterStatus, setFilterStatus] = React.useState('All');
  const [editingId, setEditingId] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState('');
  const [editDescription, setEditDescription] = React.useState('');
  const [editPriority, setEditPriority] = React.useState('Medium');
  const [editDueDate, setEditDueDate] = React.useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('nexusTasks');
    if (savedTasks) {
      dispatch({ type: 'SET_TASKS', payload: JSON.parse(savedTasks) });
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('nexusTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch({ 
        type: 'ADD_TASK', 
        payload: { 
          title, 
          description, 
          priority, 
          dueDate,
          completed: false 
        } 
      });
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate('');
    }
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || '');
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: {
          id: editingId,
          title: editTitle,
          description: editDescription,
          priority: editPriority,
          dueDate: editDueDate
        }
      });
      setEditingId(null);
      setEditTitle('');
      setEditDescription('');
      setEditPriority('Medium');
      setEditDueDate('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    setEditPriority('Medium');
    setEditDueDate('');
  };

  const filteredTasks = tasks.filter(task => {
    const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
    const statusMatch = filterStatus === 'All' || (filterStatus === 'Completed' ? task.completed : !task.completed);
    return priorityMatch && statusMatch;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'High').length
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-400 bg-red-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <header className="mb-12">
          <div className="glass-card p-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">Nexus Dashboard</h1>
            <p className="text-gray-400">Phase 4: Smart Task Manager (CRUD Operations)</p>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold text-blue-400">{stats.total}</p>
            <p className="text-gray-400">Total Tasks</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
            <p className="text-gray-400">Completed</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
            <p className="text-gray-400">Pending</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold text-red-400">{stats.high}</p>
            <p className="text-gray-400">High Priority</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Task Form */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Add New Task</h2>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Task Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title..."
                    className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task description..."
                    className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)} 
                    className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 rounded p-3 font-semibold transition"
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>

          {/* Tasks List */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="glass-card p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Filters</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select 
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full bg-gray-800 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-gray-800 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All</option>
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="glass-card p-8 text-center text-gray-400">
                  <p>No tasks found. Create one to get started!</p>
                </div>
              ) : (
                filteredTasks.map(task => (
                  <div key={task.id} className={`glass-card p-6 transition ${task.completed ? 'opacity-60' : ''}`}>
                    {editingId === task.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <select 
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value)}
                            className="bg-gray-800 text-white p-2 rounded"
                          >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                          </select>
                          <input
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="bg-gray-800 text-white p-2 rounded"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={handleSaveEdit}
                            className="flex-1 bg-green-600 hover:bg-green-700 rounded p-2 font-semibold transition"
                          >
                            Save
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-2 font-semibold transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => dispatch({ type: 'TOGGLE_COMPLETE', payload: task.id })}
                                className="w-5 h-5 cursor-pointer"
                              />
                              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {task.description && (
                          <p className="text-gray-400 mb-3">{task.description}</p>
                        )}
                        
                        <div className="text-sm text-gray-500 mb-4 flex justify-between">
                          <span>Created: {task.createdAt}</span>
                          {task.dueDate && <span>Due: {task.dueDate}</span>}
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleStartEdit(task)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded p-2 font-semibold transition"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                            className="flex-1 bg-red-600 hover:bg-red-700 rounded p-2 font-semibold transition"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
