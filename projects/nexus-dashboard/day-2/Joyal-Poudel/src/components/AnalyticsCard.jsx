import React, { useState } from 'react';
import { TrendingUp, RefreshCcw } from 'lucide-react';

const AnalyticsCard = () => {
  const [data, setData] = useState([40, 35, 55, 45, 70, 65, 85]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const generateData = () => {
    const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 60) + 20);
    setData(newData);
  };

  const maxVal = Math.max(...data);
  const chartHeight = 120;
  const chartWidth = 300;
  const stepX = chartWidth / (data.length - 1);

  const points = data.map((val, i) => {
    const x = i * stepX;
    const y = chartHeight - (val / maxVal) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="glass-panel" style={{ padding: '2rem', gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            System Performance
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>98.2%</span>
            <TrendingUp size={16} color="#22c55e" />
          </div>
        </div>
        
        <button 
          onClick={generateData}
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            color: 'var(--text-primary)'
          }}
        >
          <RefreshCcw size={16} />
        </button>
      </div>

      <div style={{ position: 'relative', marginTop: 'auto' }}>
        <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Fill Area */}
          <path 
            d={`M0,${chartHeight} ${points} L${chartWidth},${chartHeight} Z`}
            fill="url(#chartGradient)"
            style={{ transition: 'd 0.5s ease' }}
          />
          
          {/* Line */}
          <polyline
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            style={{ transition: 'points 0.5s ease' }}
          />

          {/* Interaction Points */}
          {data.map((val, i) => {
            const x = i * stepX;
            const y = chartHeight - (val / maxVal) * chartHeight;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={hoveredIndex === i ? 6 : 4}
                fill={hoveredIndex === i ? 'var(--accent-primary)' : 'var(--bg-secondary)'}
                stroke="var(--accent-primary)"
                strokeWidth="2"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ transition: 'r 0.2s, fill 0.2s', cursor: 'pointer' }}
              />
            );
          })}
        </svg>

        {/* Tooltip Placeholder */}
        {hoveredIndex !== null && (
          <div style={{
            position: 'absolute',
            top: -40,
            left: hoveredIndex * (100 / (data.length - 1)) + '%',
            transform: 'translateX(-50%)',
            background: 'var(--bg-tertiary)',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.75rem',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 10
          }}>
            {data[hoveredIndex]}%
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <span key={day} style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{day}</span>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsCard;
