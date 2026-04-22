import React, { useReducer } from 'react';

function App() {
  const taskReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return [...state, { id: Date.now(), ...action.payload }];
      case 'DELETE_TASK':
        return state.filter(task => task.id !== action.payload);
      case 'UPDATE_TASK':
        return state.map(task => task.id === action.payload.id ? { ...task, ...action.payload } : task);
      default:
        return state;
    }
  };

  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [title, setTitle] = React.useState('');
  const [priority, setPriority] = React.useState('Medium');

  const handleAddTask = () => {
    if (title.trim()) {
      dispatch({ type: 'ADD_TASK', payload: { title, priority, completed: false } });
      setTitle('');
      setPriority('Medium');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-12">
          <div className="glass-card p-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">Nexus Dashboard</h1>
            <p className="text-gray-400">Phase 4: Smart Task Manager (CRUD)</p>
          </div>
        </header>

        <div className="glass-card p-8 max-w-2xl mx-auto">
          <div className="mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              className="w-full bg-gray-800 text-white p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-4">
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="bg-gray-800 text-white p-2 rounded">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <button onClick={handleAddTask} className="flex-1 bg-blue-600 hover:bg-blue-700 rounded p-2 font-semibold">
                Add Task
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {tasks.map(task => (
              <div key={task.id} className="bg-gray-900 p-4 rounded flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-semibold">{task.title}</p>
                  <p className={`text-sm ${task.priority === 'High' ? 'text-red-400' : task.priority === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {task.priority}
                  </p>
                </div>
                <button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
