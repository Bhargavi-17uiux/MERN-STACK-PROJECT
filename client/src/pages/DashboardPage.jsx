import React from 'react';
import StatsCard from '../components/StatsCard';
import TaskColumn from '../components/TaskColumn';

export default function DashboardPage({
  tasks,
  projects,
  selectedProjectId,
  priorityFilter,
  onPriorityFilterChange,
  onMoveTask,
  onEditTask,
  onDeleteTask,
  onOpenNewTaskModal,
}) {
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  const currentProject = projects.find((p) => (p.id || p._id) === selectedProjectId);

  return (
    <div className="content-area">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {currentProject ? currentProject.title : 'All Projects Dashboard'}
          </h1>
          <p className="page-subtitle">
            {currentProject ? currentProject.description || 'Project workspace' : 'Comprehensive team overview & real-time progress'}
          </p>
        </div>

        <div className="header-actions">
          <button className="btn btn-primary" onClick={onOpenNewTaskModal}>
            <span>➕</span>
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <span className="filter-label">Filter by Priority:</span>
        <div className="filter-pills">
          {['all', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              className={`pill ${priorityFilter === p ? 'active' : ''}`}
              onClick={() => onPriorityFilterChange(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="stats-grid">
        <StatsCard
          title="Total Tasks"
          count={tasks.length}
          icon="📋"
          color="#4F46E5"
          bgColor="#EEF2FF"
        />
        <StatsCard
          title="In Progress"
          count={inProgressTasks.length}
          icon="⚡"
          color="#2563EB"
          bgColor="#EFF6FF"
        />
        <StatsCard
          title="Completed"
          count={completedTasks.length}
          icon="✅"
          color="#16A34A"
          bgColor="#F0FDF4"
        />
        <StatsCard
          title="High Priority"
          count={tasks.filter((t) => t.priority === 'high').length}
          icon="🔥"
          color="#DC2626"
          bgColor="#FEF2F2"
        />
      </div>

      {/* Kanban Board Columns */}
      <div className="board-container">
        <TaskColumn
          title="To Do"
          statusKey="todo"
          count={todoTasks.length}
          tasks={todoTasks}
          onMoveTask={onMoveTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
        <TaskColumn
          title="In Progress"
          statusKey="in_progress"
          count={inProgressTasks.length}
          tasks={inProgressTasks}
          onMoveTask={onMoveTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
        <TaskColumn
          title="Completed"
          statusKey="completed"
          count={completedTasks.length}
          tasks={completedTasks}
          onMoveTask={onMoveTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </div>
  );
}
