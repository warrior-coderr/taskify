import axios from 'axios';
import type { Task } from '../type/task';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000'
});

export function getTasks(): Promise<Task[]> {
  return api.get('/tasks').then(res => res.data);
}

export function createTask(task: Partial<Task>): Promise<Task> {
  return api.post('/tasks', task).then(res => res.data);
}

export function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  return api.put(`/tasks/${id}`, data).then(res => res.data);
}

export function deleteTask(id: string): Promise<void> {
  return api.delete(`/tasks/${id}`).then(() => {});
}