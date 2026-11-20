import React from 'react';

export default function TaskCard({ task, onMoveTask, onEditTask, onDeleteTask }) {
  const priorityClass = {
    low: 'badge-low',
    medium: 'badge-medium',
    high: 'badge-high',
  }[task.priority] || 'badge-low';

  const taskId = task.id || task._id;

  return (
    <div className="task-card">
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <span className={`badge ${priorityClass}`}>{task.priority}</span>
      </div>

      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-footer">
        <div className="task-due">
          <span>📅</span>
          <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
        </div>

        <div className="task-actions">
          {task.status !== 'todo' && (
            <button
              className="btn-icon-sm"
              title="Move left"
              onClick={() => onMoveTask(taskId, task.status === 'completed' ? 'in_progress' : 'todo')}
            >
              ◀
            </button>
          )}

          <button
            className="btn-icon-sm"
            title="Edit task"
            onClick={() => onEditTask(task)}
          >
            ✏️
          </button>

          <button
            className="btn-icon-sm delete-btn"
            title="Delete task"
            onClick={() => onDeleteTask(taskId)}
          >
            🗑️
          </button>

          {task.status !== 'completed' && (
            <button
              className="btn-icon-sm"
              title="Move right"
              onClick={() => onMoveTask(taskId, task.status === 'todo' ? 'in_progress' : 'completed')}
            >
              ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
