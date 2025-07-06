export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;    // e.g. "2025-06-30"
  priority: Priority;
  isCompleted: boolean;
  category?: string;
}