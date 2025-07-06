import { db } from './firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore';
import type { Task } from '../src/type/task';

const tasksCollection = collection(db, 'tasks');

/**
 * Fetch all tasks from Firestore and map to Task[]
 */
export async function getTasks(): Promise<Task[]> {
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map(d => {
    const data = d.data() as Omit<Task, 'id'>;
    return {
      id: d.id,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      isCompleted: data.isCompleted,
      category: data.category
    };
  });
}

/**
 * Add a new task and return the created Task (with Firestore ID)
 */
export async function addTask(task: Omit<Task, 'id'>): Promise<Task> {
  const docRef = await addDoc(tasksCollection, task);
  return { id: docRef.id, ...task };
}

/**
 * Update an existing task by ID
 */
export async function updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Promise<void> {
  const taskDoc = doc(db, 'tasks', id);
  await updateDoc(taskDoc, updates as any);
}

/**
 * Delete a task by ID
 */
export async function deleteTask(id: string): Promise<void> {
  const taskDoc = doc(db, 'tasks', id);
  await deleteDoc(taskDoc);
}
