import React, { useEffect, useState } from 'react';

const tips = [
  {
    minCompleted: 0,
    message:
      'Welcome! A good engineer starts by setting clear goals. Try breaking your first project into small tasks.',
  },
  {
    minCompleted: 1,
    message:
      'Great job completing your first task! Engineers always prototype early. Try building a quick prototype for your next idea.',
  },
  {
    minCompleted: 3,
    message:
      'You’ve completed several tasks! Now it’s time to learn from peers: join an online coding community (e.g., GitHub, Stack Overflow).',
  },
  {
    minCompleted: 5,
    message:
      'Solid progress! Focus on writing clean, maintainable code. Read about design patterns and best practices in your preferred language.',
  },
  {
    minCompleted: 8,
    message:
      'Impressive! As a next step, try contributing to open‐source. It’s the fastest way to learn collaboration and real‐world codebases.',
  },
  {
    minCompleted: 12,
    message:
      'You’re on fire! Time to specialize: pick a niche (frontend, backend, data‐science, embedded, etc.) and build a small portfolio project around it.',
  },
  {
    minCompleted: 20,
    message:
      'Amazing consistency! Now focus on algorithmic thinking—practice on coding challenge platforms (e.g., LeetCode, HackerRank). A world‐class engineer masters both theory and practice.',
  },
  {
    minCompleted: 30,
    message:
      'Phenomenal! Consider mentoring someone else or writing a technical blog. Teaching is the best way to deepen your own understanding.',
  },
];

function Mentor() {
  const [completedCount, setCompletedCount] = useState(0);
  const [currentTip, setCurrentTip] = useState(tips[0].message);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const count = storedTasks.filter(t => t.completed).length;
    setCompletedCount(count);

    // pick the tip with the highest minCompleted ≤ count
    let selectedTip = tips[0].message;
    for (let i = 0; i < tips.length; i++) {
      if (count >= tips[i].minCompleted) {
        selectedTip = tips[i].message;
      }
    }
    setCurrentTip(selectedTip);
  }, []);

  return (
    <div className="mentor-tip">
      <h3>Your Mentor Tip</h3>
      <p><em>(for {completedCount} completed {completedCount === 1 ? 'task' : 'tasks'})</em></p>
      <p>{currentTip}</p>
    </div>
  );
}

export default Mentor;
