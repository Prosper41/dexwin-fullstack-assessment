import { useEffect, useState } from 'react';
import { getTasks, updateTaskStatus } from '../api/client';
import TaskItem from './TaskItem';

export default function TaskBoard({ projectId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks(projectId).then((data) => {
      setTasks(data);
    });
  }, [projectId]);

  // const handleToggle = (task) => {
  //   const next = task.status === 'DONE' ? 'TODO' : 'DONE';
  //   task.status = next;
  //   setTasks(tasks);
  //   updateTaskStatus(task.id, next);
  // };

    const handleToggle = (task) => {
      const next = task.status === 'Done' ? 'TODO' : 'DONE';

      setTasks(tasks.map(t =>
        t.id === task.id ? {...t, status: next} : t
      ));
      updateTaskStatus(task.id, next)
    }

  return (
    <div>
      <div className="board-header">
        <h2>Tasks</h2>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} onToggle={handleToggle} />
        ))}
      </div>
    </div>
  );
}
