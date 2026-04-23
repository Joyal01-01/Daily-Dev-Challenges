import React, { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const links = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'React Docs', url: 'https://react.dev' },
    { name: 'Tailwind', url: 'https://tailwindcss.com' },
  ];

  const filtered = links.filter(link => link.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-12">
          <div className="glass-card p-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Nexus Dashboard</h1>
              <p className="text-gray-400">Phase 6: Custom Search & Quick Links</p>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="bg-gray-700 px-4 py-2 rounded text-sm">
              Ctrl+K
            </button>
          </div>
        </header>

        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-32 z-50">
            <div className="glass-card w-96 p-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                autoFocus
                className="w-full bg-transparent text-white text-lg focus:outline-none mb-4"
              />
              <div className="space-y-2">
                {filtered.map(link => (
                  <a key={link.name} href={link.url} target="_blank" className="block p-3 hover:bg-gray-800 rounded cursor-pointer">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
