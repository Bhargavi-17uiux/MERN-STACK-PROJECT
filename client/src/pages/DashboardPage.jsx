import React from 'react';
import StatsCard from '../components/StatsCard';
import TaskColumn from '../components/TaskColumn';

export default function DashboardPage({ tasks, onMoveTask, onOpenNewTaskModal }) {
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  return (
    <div className="content-area">
      <div className="page-header">
        <div>
          <h1 className="page-title">Project Dashboard</h1>
          <p className="page-subtitle">Track, prioritize, and manage team tasks in real-time</p>
        </div>
        <button className="btn btn-primary" onClick={onOpenNewTaskModal}>
          <span>➕</span>
          <span>New Task</span>
        </button>
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

      {/* Board Columns: To Do, In Progress, Completed */}
      <div className="board-container">
        <TaskColumn
          title="To Do"
          statusKey="todo"
          count={todoTasks.length}
          tasks={todoTasks}
          onMoveTask={onMoveTask}
        />
        <TaskColumn
          title="In Progress"
          statusKey="in_progress"
          count={inProgressTasks.length}
          tasks={inProgressTasks}
          onMoveTask={onMoveTask}
        />
        <TaskColumn
          title="Completed"
          statusKey="completed"
          count={completedTasks.length}
          tasks={completedTasks}
          onMoveTask={onMoveTask}
        />
      </div>
    </div>
  );
}
