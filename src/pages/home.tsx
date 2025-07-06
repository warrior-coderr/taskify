import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import FilterChips from '../components/FilterChips';
import FloatingAddButton from '../components/FloatingAddButton';
import AddEditTaskModal from '../components/AddEditTaskModal';
import type { Task } from '../type/task';
import { getTasks, addTask, updateTask, deleteTask } from '../firebaseService';

export default function Home() {
    const [filter, setFilter] = useState<'Home' | 'Today' | 'Upcoming' | 'Completed'>('Home');
    const [search, setSearch] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editTask, setEditTask] = useState<Task | undefined>();
    const [loading, setLoading] = useState(true);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (err) {
                console.error('Error loading tasks:', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

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
            console.error('Error saving task:', err);
        } finally {
            setModalOpen(false);
            setEditTask(undefined);
        }
    };

    const handleEdit = (id: string) => {
        const t = tasks.find(t => t.id === id);
        if (t) setEditTask(t), setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            setTasks(ts => ts.filter(t => t.id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const handleToggle = async (id: string) => {
        const t = tasks.find(t => t.id === id);
        if (!t) return;
        try {
            await updateTask(id, { isCompleted: !t.isCompleted });
            setTasks(ts => ts.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
        } catch (err) {
            console.error('Error toggling task:', err);
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
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            <header className={`flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 px-6 sm:p-6 shadow-lg rounded-b-xl ${isDark ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur`}>
                <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-t from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Taskify
                </h1>
                <div className="flex flex-wrap sm:flex-nowrap items-center space-x-4">
                    <input
                        type="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search tasks…"
                        className={`px-4 py-2 border rounded w-full sm:w-64 focus:ring-2 transition ${isDark ? 'bg-gray-800 border-gray-700 focus:ring-purple-600' : 'bg-white border-gray-300 focus:ring-blue-400'}`}
                    />
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
                            isDark={isDark}
                            onEdit={() => handleEdit(t.id)}
                            onToggle={() => handleToggle(t.id)}
                            onDelete={() => handleDelete(t.id)}
                        />
                    ))
                ) : (
                    <p className={`col-span-full text-center py-8 animate-fade-in ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        No tasks to show.
                    </p>
                )}
            </main>

            <FloatingAddButton onClick={() => setModalOpen(true)} />


            <FilterChips
                active={filter}
                onSelect={setFilter}
                isDark={isDark}
                toggleTheme={toggleTheme}
            />

            <AddEditTaskModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditTask(undefined); }}
                onSave={handleSave}
                initial={editTask}
                isDark={isDark}
            />
        </div>
    );
}
