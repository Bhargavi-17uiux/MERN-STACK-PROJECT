import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';

// Seed starter data demonstrating all features
const initialTasks = [
  {
    id: '1',
    title: 'Initialize Express Backend & Health Route',
    description: 'Setup Node.js server with CORS and healthcheck endpoint.',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-11-21',
  },
  {
    id: '2',
    title: 'Design MongoDB Schemas with Mongoose',
    description: 'Implement User, Project, and Task schemas with timestamps and validation.',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-11-22',
  },
  {
    id: '3',
    title: 'Implement JWT Authentication Flow',
    description: 'Create login and register endpoints with bcrypt password hashing.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-11-25',
  },
  {
    id: '4',
    title: 'Build Project & Task CRUD Endpoints',
    description: 'Allow users to create, view, edit, and delete projects and tasks.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-11-28',
  },
  {
    id: '5',
    title: 'Integrate Live REST API with React UI',
    description: 'Replace mock state with Axios/fetch calls to backend.',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-12-01',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState(initialTasks);

  // Status transitions
  const handleMoveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  // Add new task simulation
  const handleOpenNewTaskModal = () => {
    const title = prompt('Enter Task Title:');
    if (!title || !title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: 'Newly created task item.',
      status: 'todo',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  // Real-time task filtering based on search input
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />
      <div className="main-wrapper">
        <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} userName="Bhargavi" />
        <DashboardPage
          tasks={filteredTasks}
          onMoveTask={handleMoveTask}
          onOpenNewTaskModal={handleOpenNewTaskModal}
        />
      </div>
    </div>
  );
}
