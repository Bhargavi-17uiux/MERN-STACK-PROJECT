/**
 * Centralized API client with automatic JWT token attachment
 * Includes resilient offline mode fallback for local testing
 */

const API_BASE = '/api';

export const apiClient = {
  getToken: () => localStorage.getItem('taskflow_token'),
  setToken: (token) => localStorage.setItem('taskflow_token', token),
  removeToken: () => localStorage.removeItem('taskflow_token'),

  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem('taskflow_user'));
    } catch {
      return null;
    }
  },
  setUser: (user) => localStorage.setItem('taskflow_user', JSON.stringify(user)),
  removeUser: () => localStorage.removeItem('taskflow_user'),

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.warn(`[API Notice] ${endpoint}: ${error.message}.`);
      throw error;
    }
  },

  // Auth methods
  register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getMe() {
    return this.request('/auth/me');
  },

  // Project methods
  getProjects() {
    return this.request('/projects');
  },

  createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  updateProject(id, projectData) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  },

  // Task methods
  getTasks(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/tasks${query ? `?${query}` : ''}`);
  },

  createTask(taskData) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  updateTask(id, taskData) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  deleteTask(id) {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  // Dashboard stats
  getDashboardStats() {
    return this.request('/dashboard/stats');
  },
};
