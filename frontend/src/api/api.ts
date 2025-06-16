import axios from 'axios';
import type {operations} from './api-types';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Типы для API методов
type Task = operations['api_todo_todos_list']['responses'][200]['content']['application/json'][0];
type CreateTaskRequest = operations['api_todo_todos_create']['requestBody']['content']['application/json'];
type TokenObtainPairResponse = operations['api_auth_token_create']['responses'][200]['content']['application/json'];

// Методы для работы с API
export const fetchTasks = () => api.get<Task[]>('/todo/todos/');
export const createTask = (data: CreateTaskRequest) => api.post<Task>('/todo/todos/', data);
export const login = (username: string, password: string) =>
  api.post<TokenObtainPairResponse>('/auth/token/', { username, password });
export const updateTask = (id: number, data: Partial<Task>) =>
  api.patch<Task>(`/todo/todos/${id}/`, data);