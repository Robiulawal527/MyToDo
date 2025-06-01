/**
 * personalityUtils.js
 * 
 * A small utility that takes an array of completed task objects and returns
 * a personality type string and some suggestions on making friends. 
 *
 * Completed tasks should have these properties:
 *   - createdAt: timestamp when it was created
 *   - completedAt: timestamp when it was marked complete
 *   - dueDate: timestamp when it was due
 */

export function analyzePersonality(completedTasks) {
  if (!completedTasks || completedTasks.length === 0) {
    return {
      type: 'No Data Yet',
      description: 'You haven’t completed any tasks yet—finish a few tasks to get a personality report!',
      suggestions: [
        'Try completing tasks on time to see how organized you are.',
        'Keep track of deadlines and see how you align with them.',
      ],
    };
  }

  let onTimeCount = 0;
  let lateCount = 0;

  completedTasks.forEach(task => {
    if (!task.dueDate) {
      return;
    }
    const due = new Date(task.dueDate).getTime();
    const completed = new Date(task.completedAt).getTime();
    if (completed <= due) {
      onTimeCount++;
    } else {
      lateCount++;
    }
  });

  const total = onTimeCount + lateCount;
  const onTimeRatio = onTimeCount / total;

  let type, description, suggestions;

  if (onTimeRatio >= 0.8) {
    type = 'The Achiever';
    description =
      'You complete most of your tasks on time. You’re disciplined, reliable, and goal‐oriented.';
    suggestions = [
      'You might thrive in study or work groups—look for punctual friends who share your drive.',
      'Offer to mentor someone who struggles with deadlines; teaching reinforces your own habits.',
      'Join clubs or teams that appreciate structure—study groups, coding meetups, etc.',
    ];
  } else if (onTimeRatio >= 0.5) {
    type = 'The Balancer';
    description =
      'You finish some tasks on time and some late. You have flexibility, but can tighten up routines.';
    suggestions = [
      'Be open with friends about your schedule; many appreciate honesty about timelines.',
      'Try co‐working sessions or “pair programming” so someone can keep you on track.',
      'Look for groups that value both creativity and deadlines—hackathons, brainstorming sessions.',
    ];
  } else {
    type = 'The Spontaneous';
    description =
      'You often complete tasks past their due date. You’re creative and flexible, but may need structure.';
    suggestions = [
      'Find friends who appreciate spontaneity—learn from each other’s strengths.',
      'Use buddy‐systems or “accountability partners” to keep each other on task.',
      'Consider joining flexible communities—open‐ended project groups, creative circles.',
    ];
  }

  return { type, description, suggestions };
}
