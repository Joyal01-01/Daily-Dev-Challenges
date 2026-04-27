import React from 'react';

const MetricCard = ({ label, value, trend }) => {
  return (
    <div className="glass-panel metric-card">
      <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </h3>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
        <p className="metric-value">{value}</p>
        {trend && (
          <span style={{ color: trend.startsWith('+') ? 'var(--status-success)' : 'var(--status-danger)', fontSize: '0.875rem', fontWeight: 600 }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};


export default MetricCard;
