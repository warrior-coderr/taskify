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
import { query, where } from 'firebase/firestore';

export async function getTasks(userId: string): Promise<Task[]> {
  const q = query(tasksCollection, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => {
    const data = d.data() as Omit<Task, 'id'>;
    return {
      id: d.id,
      ...data
    };
  });
}


/**
 * Add a new task and return the created Task (with Firestore ID)
 */
export async function addTask(task: Omit<Task, 'id'>, userId: string): Promise<Task> {
  const docRef = await addDoc(tasksCollection, { ...task, userId });
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

import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
export const auth = getAuth();

export async function login(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signup(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return await signOut(auth);
}

export function onUserChange(callback: (user: any) => void) {
  return onAuthStateChanged(auth, callback);
}
