import React, { useEffect, useState } from 'react';

function TodoItem({ task, onToggleComplete, onDelete }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    let intervalId;

    function updateTimer() {
      if (!task.dueDate) {
        setTimeLeft('No deadline');
        return;
      }
      const now = Date.now();
      const due = new Date(task.dueDate).getTime();
      const diff = due - now;

      if (diff <= 0) {
        setTimeLeft('⏰ Time’s up!');
        clearInterval(intervalId);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${mins}m ${secs}s`);
    }

    updateTimer();
    intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [task.dueDate]);

  return (
    <li className="todo-item">
      <div className={`title ${task.completed ? 'completed' : ''}`}>
        {task.title}
      </div>
      <div className="timer">{timeLeft}</div>
      <div className="actions">
        <button onClick={() => onToggleComplete(task.id)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;
