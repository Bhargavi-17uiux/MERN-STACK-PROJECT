import React from 'react';

export default function TaskCard({ task, onMoveTask }) {
  const priorityClass = {
    low: 'badge-low',
    medium: 'badge-medium',
    high: 'badge-high',
  }[task.priority] || 'badge-low';

  return (
    <div className="task-card">
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <span className={`badge ${priorityClass}`}>{task.priority}</span>
      </div>

      <p className="task-desc">{task.description}</p>

      <div className="task-footer">
        <div className="task-due">
          <span>📅</span>
          <span>{task.dueDate || 'No due date'}</span>
        </div>

        <div className="task-actions">
          {task.status !== 'todo' && (
            <button
              className="btn-icon-sm"
              title="Move to Previous Status"
              onClick={() => onMoveTask(task.id, task.status === 'completed' ? 'in_progress' : 'todo')}
            >
              ◀
            </button>
          )}
          {task.status !== 'completed' && (
            <button
              className="btn-icon-sm"
              title="Move to Next Status"
              onClick={() => onMoveTask(task.id, task.status === 'todo' ? 'in_progress' : 'completed')}
            >
              ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
