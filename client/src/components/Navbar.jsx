import React from 'react';

export default function Navbar({ searchTerm, onSearchChange, userName = 'Alex Dev' }) {
  return (
    <header className="navbar">
      <div className="navbar-search">
        <span className="navbar-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="user-profile">
        <div className="user-avatar">
          {userName.charAt(0)}
        </div>
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="user-role">Full Stack Engineer</span>
        </div>
      </div>
    </header>
  );
}
