import React from 'react';
import { motion } from 'framer-motion';

function App() {
  const stats = [
    { label: 'Tasks Completed', value: 42, total: 100 },
    { label: 'High Priority', value: 15, total: 50 },
    { label: 'Productivity', value: 84, total: 100 },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-12">
          <div className="glass-card p-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">Nexus Dashboard</h1>
            <p className="text-gray-400">Phase 5: Interactive Analytics Card</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div key={idx} className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.2 }}>
              <p className="text-gray-400 text-sm mb-4">{stat.label}</p>
              <motion.div className="h-2 bg-gray-800 rounded overflow-hidden mb-4">
                <motion.div className="h-full bg-blue-500 rounded" initial={{ width: 0 }} animate={{ width: `${(stat.value / stat.total) * 100}%` }} transition={{ duration: 1.5, delay: 0.5 }} />
              </motion.div>
              <motion.p className="text-3xl font-bold">
                {stat.value}/{stat.total}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
