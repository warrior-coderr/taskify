export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;   
  priority: Priority;
  isCompleted: boolean;
  category?: string;
}
export type Filter = 'Home' | 'Today' | 'Upcoming' | 'Completed';
