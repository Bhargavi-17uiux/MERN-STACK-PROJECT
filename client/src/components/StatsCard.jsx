import React from 'react';

export default function StatsCard({ title, count, icon, color = '#4F46E5', bgColor = '#EEF2FF' }) {
  return (
    <div className="stat-card">
      <div className="stat-icon-wrapper" style={{ backgroundColor: bgColor, color }}>
        {icon}
      </div>
      <div>
        <div className="stat-value">{count}</div>
        <div className="stat-label">{title}</div>
      </div>
    </div>
  );
}
