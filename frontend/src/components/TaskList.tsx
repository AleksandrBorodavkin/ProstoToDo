import type { operations } from '../api/api-types';

type Task = operations['api_todo_todos_list']['responses'][200]['content']['application/json'][0];

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (task: Task) => void;
}

const TaskList = ({ tasks, onToggleComplete }: TaskListProps) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <input
            type="checkbox"
            checked={task.completed || false}
            onChange={() => onToggleComplete(task)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;