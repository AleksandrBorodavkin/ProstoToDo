import { useEffect, useState } from 'react';
import {fetchTasks, createTask, updateTask} from '../api/api';
import TaskList from '../components/TaskList';
import type {operations} from '../api/api-types';

type Task = operations['api_todo_todos_list']['responses'][200]['content']['application/json'][0];
type CreateTaskRequest = operations['api_todo_todos_create']['requestBody']['content']['application/json'];

const Todo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Omit<CreateTaskRequest, 'url' | 'id' | 'created_at'>>({
    title: '',
    description: '',
    completed: false
  });

  const loadTasks = () => {
    fetchTasks()
      .then(res => setTasks(res.data))
      .catch(() => window.location.href = '/login');
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTask(newTask as CreateTaskRequest)
      .then(() => {
        setNewTask({
          title: '',
          description: '',
          completed: false
        });
        loadTasks();
      })
      .catch(err => console.error('Ошибка при создании задачи:', err));
  };
    const handleToggleComplete = (task: Task) => {
    updateTask(task.id, { completed: !task.completed })
      .then(() => {
        loadTasks(); // Перезагружаем список задач после успешного обновления
      })
      .catch(err => console.error('Ошибка при обновлении задачи:', err));
  };

  return (
    <div>
      <h1>Мои задачи</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Название задачи"
            required
          />
        </div>
        <div>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Описание задачи"
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={newTask.completed}
              onChange={handleCheckboxChange}
            />
            Выполнено
          </label>
        </div>
        <button type="submit">Добавить задачу</button>
      </form>

      <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} />
    </div>
  );
};

export default Todo;