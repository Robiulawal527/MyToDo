import React, { useEffect, useState } from 'react';
import { analyzePersonality } from '../utils/personalityUtils';

function Personality() {
  const [report, setReport] = useState({
    type: 'No Data Yet',
    description:
      'You haven’t completed any tasks yet—finish a few tasks to get a personality report!',
    suggestions: [],
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const completed = storedTasks.filter(t => t.completed);
    const analysis = analyzePersonality(completed);
    setReport(analysis);
  }, []);

  return (
    <div className="personality-report">
      <h3>Personality Type: {report.type}</h3>
      <p>{report.description}</p>

      {report.suggestions.length > 0 && (
        <>
          <h4>Friendship Suggestions:</h4>
          <ul>
            {report.suggestions.map((sug, idx) => (
              <li key={idx}>{sug}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Personality;
