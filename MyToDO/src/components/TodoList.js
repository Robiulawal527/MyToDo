import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    // load from localStorage
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (!title) return;
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    setDueDate('');
  }

  function toggleComplete(id) {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const nowISO = new Date().toISOString();
          return {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? nowISO : null,
          };
        }
        return task;
      })
    );
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div>
      <form className="todo-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task title…"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul className="todo-list">
        {tasks.length === 0 && <p>No tasks yet.</p>}
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
          />
        ))}
      </ul>

      <p>
        <strong>Total tasks:</strong> {tasks.length} |{' '}
        <strong>Completed:</strong> {completedTasks.length}
      </p>
    </div>
  );
}

export default TodoList;
