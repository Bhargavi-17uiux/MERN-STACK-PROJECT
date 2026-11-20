import React from 'react';

export default function Sidebar({ activeTab, onSelectTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'tasks', label: 'All Tasks', icon: '✅' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">TF</div>
        <div className="brand-name">TaskFlow</div>
      </div>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.id}>
            <div
              className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
