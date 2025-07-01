import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import FilterChips from '../components/FilterChips';
import FloatingAddButton from '../components/FloatingAddButton';
import AddEditTaskModal from '../components/AddEditTaskModal';
import type { Task } from '../type/task';

export default function Home() {
    const [dark, setDark] = useState(true);
    const [filter, setFilter] = useState<'All' | 'Today' | 'Upcoming' | 'Completed'>('All');
    const [search, setSearch] = useState('');
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'First Task', description: '…', dueDate: '2025-06-30', priority: 'High', isCompleted: false, category: 'Work' },
        { id: 2, title: 'Second Task', description: '…', dueDate: '2025-07-01', priority: 'Medium', isCompleted: true, category: 'Personal' },
        { id: 3, title: 'Third Task', description: '…', dueDate: '2025-07-02', priority: 'Low', isCompleted: false, category: 'Errand' }
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editTask, setEditTask] = useState<Task | undefined>();

    useEffect(() => {
        const btn = document.getElementById('add-btn');
        btn?.classList.add('animate-pulse');
        setTimeout(() => btn?.classList.remove('animate-pulse'), 1200);
    }, []);

    useEffect(() => {
        // Apply/remove dark class to <html> dynamically
        const root = document.documentElement;
        if (dark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [dark]);

    const handleSave = (data: Omit<Task, 'id'>) => {
        if (editTask) {
            setTasks(ts => ts.map(t => t.id === editTask.id ? { ...t, ...data } : t));
        } else {
            setTasks(ts => [{ id: Date.now(), ...data }, ...ts]);
        }
        setModalOpen(false);
        setEditTask(undefined);
    };

    const handleEdit = (id: number) => {
        const t = tasks.find(t => t.id === id);
        if (t) { setEditTask(t); setModalOpen(true); }
    };

    const handleDelete = (id: number) => setTasks(ts => ts.filter(t => t.id !== id));

    const handleToggle = (id: number) => setTasks(ts => ts.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));

    const visible = tasks
        .filter(t => {
            if (filter === 'Completed') return t.isCompleted;
            if (filter === 'Today') return t.dueDate === new Date().toISOString().slice(0, 10);
            if (filter === 'Upcoming') return t.dueDate > new Date().toISOString().slice(0, 10);
            return !t.isCompleted;
        })
        .filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
            <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-6 space-y-4 sm:space-y-0 shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-b-xl">
                <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Taskify</h1>
                <div className="flex flex-wrap sm:flex-nowrap items-center space-x-4">
                    <input
                        type="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search tasks…"
                        className="px-4 py-2 border rounded w-full sm:w-64 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-600 transition"
                    />
                    <FilterChips active={filter} onSelect={setFilter} />
                    <button
                        onClick={() => setDark(d => !d)}
                        className="px-3 py-1 rounded shadow hover:shadow-lg transition bg-gradient-to-r from-blue-400 to-purple-500 text-white dark:from-purple-700 dark:to-indigo-800"
                    >
                        {dark ? 'Light' : 'Dark'}
                    </button>
                </div>
            </header>

            <main className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visible.map(t => (
                    <TaskCard
                        key={t.id}
                        task={t}
                        onClick={() => { }}
                        onEdit={handleEdit}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                ))}
                {!visible.length && (
                    <p className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400 animate-fade-in">
                        No tasks to show.
                    </p>
                )}
            </main>

            <FloatingAddButton onClick={() => setModalOpen(true)} />

            <AddEditTaskModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditTask(undefined); }}
                onSave={handleSave}
                initial={editTask}
            />
        </div>
    );
}
