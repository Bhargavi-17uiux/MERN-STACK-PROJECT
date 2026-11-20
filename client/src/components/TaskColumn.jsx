import React from 'react';
import TaskCard from './TaskCard';

export default function TaskColumn({
  title,
  statusKey,
  count,
  tasks,
  onMoveTask,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title-wrap">
          <div className={`column-indicator ${statusKey}`} />
          <h3 className="column-title">{title}</h3>
        </div>
        <span className="column-count">{count}</span>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-column-msg">
            No tasks in {title}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id || task._id}
              task={task}
              onMoveTask={onMoveTask}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
