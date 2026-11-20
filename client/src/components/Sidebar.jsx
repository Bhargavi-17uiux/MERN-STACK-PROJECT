import React from 'react';

export default function Sidebar({
  activeTab,
  onSelectTab,
  projects,
  selectedProjectId,
  onSelectProject,
  onOpenProjectModal,
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">TF</div>
        <div className="brand-name">TaskFlow</div>
      </div>

      <div className="sidebar-section-title">MAIN NAVIGATION</div>
      <ul className="nav-links">
        <li>
          <div
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onSelectTab('dashboard')}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </div>
        </li>
        <li>
          <div
            className={`nav-link ${activeTab === 'all-tasks' ? 'active' : ''}`}
            onClick={() => onSelectTab('all-tasks')}
          >
            <span>✅</span>
            <span>All Tasks</span>
          </div>
        </li>
      </ul>

      <div className="sidebar-section-header">
        <span className="sidebar-section-title">PROJECTS</span>
        <button
          className="btn-icon-add"
          title="Create Project"
          onClick={onOpenProjectModal}
        >
          ➕
        </button>
      </div>

      <ul className="nav-links project-links">
        <li>
          <div
            className={`nav-link ${selectedProjectId === '' ? 'active' : ''}`}
            onClick={() => onSelectProject('')}
          >
            <span>🌐</span>
            <span>All Projects</span>
          </div>
        </li>
        {projects.map((proj) => {
          const id = proj.id || proj._id;
          return (
            <li key={id}>
              <div
                className={`nav-link ${selectedProjectId === id ? 'active' : ''}`}
                onClick={() => onSelectProject(id)}
              >
                <span>📁</span>
                <span className="truncate">{proj.title}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
