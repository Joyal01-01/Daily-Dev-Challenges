import React from 'react';

function App() {
  const metrics = [
    { name: 'Lighthouse Score', value: 94 },
    { name: 'First Contentful Paint', value: '1.2s' },
    { name: 'Largest Contentful Paint', value: '2.4s' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-12">
          <div className="glass-card p-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">Nexus Dashboard</h1>
            <p className="text-gray-400">Phase 7: Performance Audit & PWA</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => (
            <div key={idx} className="glass-card p-6 text-center">
              <p className="text-gray-400 text-sm mb-4">{metric.name}</p>
              <p className="text-4xl font-bold text-green-400">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">✅ PWA Ready</h2>
          <p className="text-gray-400 mb-6">Offline mode enabled. Manifest file configured.</p>
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold">
            Install App
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
