import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import darkmode from '../assets/whitedark.png';
import lightmode from '../assets/lightmodeicon.png';
import FilterChips from '../components/FilterChips';
import FloatingAddButton from '../components/FloatingAddButton';
import AddEditTaskModal from '../components/AddEditTaskModal';
import type { Task } from '../type/task';
import { getTasks, addTask, updateTask, deleteTask } from '../firebaseService';

export default function Home() {
    const [dark, setDark] = useState(true);
    const [filter, setFilter] = useState<'All' | 'Today' | 'Upcoming' | 'Completed'>('All');
    const [search, setSearch] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editTask, setEditTask] = useState<Task | undefined>();
    const [loading, setLoading] = useState(true);

    // Animate add button
    useEffect(() => {
        const btn = document.getElementById('add-btn');
        btn?.classList.add('animate-bounce');
        setTimeout(() => btn?.classList.remove('animate-bounce'), 12000);
    }, []);

    // Toggle dark mode on <html>
    useEffect(() => {
        const root = document.documentElement;
        dark ? root.classList.add('dark') : root.classList.remove('dark');
    }, [dark]);

    // Load tasks from Firestore
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (err) {
                console.error("Error loading tasks:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Save handler: add or update
    const handleSave = async (taskData: Omit<Task, 'id'>) => {
        try {
            if (editTask) {
                await updateTask(editTask.id, taskData);
                setTasks(ts => ts.map(t => t.id === editTask.id ? { ...t, ...taskData } : t));
            } else {
                const added = await addTask(taskData);
                setTasks(ts => [added, ...ts]);
            }
        } catch (err) {
            console.error("Error saving task:", err);
        } finally {
            setModalOpen(false);
            setEditTask(undefined);
        }
    };

    const handleEdit = (id: string) => {
        const t = tasks.find(t => t.id === id);
        if (t) {
            setEditTask(t);
            setModalOpen(true);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            setTasks(ts => ts.filter(t => t.id !== id));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const handleToggle = async (id: string) => {
        const t = tasks.find(t => t.id === id);
        if (!t) return;
        try {
            await updateTask(id, { isCompleted: !t.isCompleted });
            setTasks(ts => ts.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
        } catch (err) {
            console.error("Error toggling task:", err);
        }
    };

    const visible = tasks
        .filter(t => {
            if (filter === 'Completed') return t.isCompleted;
            if (filter === 'Today') return t.dueDate === new Date().toISOString().slice(0, 10);
            if (filter === 'Upcoming') return t.dueDate > new Date().toISOString().slice(0, 10);
            return !t.isCompleted;
        })
        .filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className={`min-h-screen bg-gradient-to-br ${dark ? 'from-blue-50 to-white text-gray-900' : 'from-gray-900 to-black text-gray-100'} transition-colors duration-1000`}>
            <header className={`flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 px-6 sm:p-6 shadow-lg ${dark ? 'bg-white/60' : 'bg-gray-800/60'} backdrop-blur rounded-b-xl`}>
                <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-t from-blue-500 to-purple-600 bg-clip-text text-transparent">Taskify</h1>
                <div className="flex flex-wrap sm:flex-nowrap items-center space-x-4">
                    <input
                        type="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search tasks…"
                        className={`px-4 py-2 border rounded w-full sm:w-64 focus:ring-2 ${dark ? 'focus:ring-blue-400' : 'focus:ring-purple-600'} transition`}
                    />
                    <FilterChips active={filter} onSelect={setFilter} />
                    <button
                        onClick={() => setDark(d => !d)}
                        className={`px-3 py-1 rounded-xl shadow hover:shadow-lg transition bg-gradient-to-t ${dark ? 'from-blue-400 to-purple-500' : 'from-purple-700 to-indigo-800'} text-white`}
                    >
                        <img src={dark ? darkmode : lightmode} alt="Toggle theme" className="h-5 w-5" />
                    </button>
                </div>
            </header>

            <main className="px-6 py-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {loading ? (
                    <p className="col-span-full text-center py-8">Loading tasks...</p>
                ) : visible.length > 0 ? (
                    visible.map(t => (
                        <TaskCard
                            key={t.id}
                            task={t}
                            onEdit={() => handleEdit(t.id)}
                            onToggle={() => handleToggle(t.id)}
                            onDelete={() => handleDelete(t.id)}
                        />
                    ))
                ) : (
                    <p className={`col-span-full text-center py-8 ${dark ? 'text-gray-500' : 'text-gray-400'} animate-fade-in`}>
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
