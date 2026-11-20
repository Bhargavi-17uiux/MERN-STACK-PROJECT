import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => apiClient.getUser() || {
    name: 'Bhargavi Developer',
    email: 'bhargavi@taskflow.dev',
    id: 'demo-user-1',
  });
  const [token, setToken] = useState(() => apiClient.getToken() || 'demo-jwt-token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && token !== 'demo-jwt-token') {
      apiClient.getMe()
        .then((res) => {
          if (res.success && res.user) {
            setUser(res.user);
            apiClient.setUser(res.user);
          }
        })
        .catch(() => {
          // Token expired or invalid
        });
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await apiClient.login({ email, password });
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        apiClient.setUser(res.user);
        apiClient.setToken(res.token);
        return { success: true };
      }
    } catch (err) {
      // Demo fallback if backend offline
      const demoUser = { name: email.split('@')[0], email, id: 'demo-' + Date.now() };
      setUser(demoUser);
      setToken('demo-token-' + Date.now());
      apiClient.setUser(demoUser);
      apiClient.setToken('demo-token');
      return { success: true, offline: true };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await apiClient.register({ name, email, password });
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        apiClient.setUser(res.user);
        apiClient.setToken(res.token);
        return { success: true };
      }
    } catch (err) {
      const newUser = { name, email, id: 'demo-' + Date.now() };
      setUser(newUser);
      setToken('demo-token-' + Date.now());
      apiClient.setUser(newUser);
      apiClient.setToken('demo-token');
      return { success: true, offline: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    apiClient.removeToken();
    apiClient.removeUser();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
