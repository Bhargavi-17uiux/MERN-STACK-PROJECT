import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { apiClient } from './api/client';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TaskModal from './components/TaskModal';
import ProjectModal from './components/ProjectModal';
import AuthModal from './components/AuthModal';

const initialProjects = [
  { id: 'proj-1', title: 'TaskFlow MVP', description: 'Core MERN app development' },
  { id: 'proj-2', title: 'Marketing Website', description: 'Landing page and conversion funnel' },
];

const initialTasks = [
  {
    id: '1',
    title: 'Initialize Express Backend & Health Route',
    description: 'Setup Node.js server with CORS and healthcheck endpoint.',
    project: 'proj-1',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-11-21',
  },
  {
    id: '2',
    title: 'Design MongoDB Schemas with Mongoose',
    description: 'Implement User, Project, and Task schemas with timestamps and validation.',
    project: 'proj-1',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-11-22',
  },
  {
    id: '3',
    title: 'Implement JWT Authentication Flow',
    description: 'Create login and register endpoints with bcrypt password hashing.',
    project: 'proj-1',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-11-25',
  },
  {
    id: '4',
    title: 'Build Project & Task CRUD Endpoints',
    description: 'Allow users to create, view, edit, and delete projects and tasks.',
    project: 'proj-2',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-11-28',
  },
  {
    id: '5',
    title: 'Integrate Live REST API with React UI',
    description: 'Connect frontend to Express endpoints with state persistence.',
    project: 'proj-2',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-12-01',
  },
];

function TaskFlowMain() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  // Data states with local storage backup
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('taskflow_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskflow_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('taskflow_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Attempt live API fetch on load
  useEffect(() => {
    apiClient.getProjects()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      })
      .catch(() => { });

    apiClient.getTasks()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTasks(res.data);
        }
      })
      .catch(() => { });
  }, []);

  // Task Actions
  const handleMoveTask = async (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => ((t.id || t._id) === taskId ? { ...t, status: newStatus } : t))
    );
    try {
      await apiClient.updateTask(taskId, { status: newStatus });
    } catch {
      // Handled via local update
    }
  };

  const handleSaveTask = async (taskData) => {
    if (taskData.id) {
      // Edit task
      setTasks((prev) =>
        prev.map((t) => ((t.id || t._id) === taskData.id ? { ...t, ...taskData } : t))
      );
      try {
        await apiClient.updateTask(taskData.id, taskData);
      } catch { }
    } else {
      // Create new task
      const newTask = {
        ...taskData,
        id: 'task-' + Date.now(),
        project: taskData.project || selectedProjectId || projects[0]?.id || 'proj-1',
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
      try {
        await apiClient.createTask(taskData);
      } catch { }
    }
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setTasks((prev) => prev.filter((t) => (t.id || t._id) !== taskId));
    try {
      await apiClient.deleteTask(taskId);
    } catch { }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  // Project Actions
  const handleSaveProject = async (projectData) => {
    const newProj = {
      ...projectData,
      id: 'proj-' + Date.now(),
    };
    setProjects((prev) => [...prev, newProj]);
    setSelectedProjectId(newProj.id);
    try {
      await apiClient.createProject(projectData);
    } catch { }
  };

  // Filter tasks based on Project, Priority, and Search
  const filteredTasks = tasks.filter((task) => {
    const matchesProject = !selectedProjectId || (task.project?._id || task.project) === selectedProjectId;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesProject && matchesPriority && matchesSearch;
  });

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
      />

      <div className="main-wrapper">
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        <DashboardPage
          tasks={filteredTasks}
          projects={projects}
          selectedProjectId={selectedProjectId}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          onMoveTask={handleMoveTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onOpenNewTaskModal={() => {
            setEditingTask(null);
            setIsTaskModalOpen(true);
          }}
        />
      </div>

      {/* Interactive Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
        projects={projects}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TaskFlowMain />
    </AuthProvider>
  );
}
