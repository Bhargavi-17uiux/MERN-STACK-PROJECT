import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ searchTerm, onSearchChange, onOpenAuthModal }) {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-search">
        <span className="navbar-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search tasks by title or details..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="user-profile">
            <div className="user-avatar">
              {(user.name || 'User').charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name || 'Team Member'}</span>
              <span className="user-role">{user.email}</span>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={logout}
              title="Sign Out"
              style={{ marginLeft: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={onOpenAuthModal}>
            Log In / Sign Up
          </button>
        )}
      </div>
    </header>
  );
}
