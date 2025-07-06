import { useState, useEffect } from 'react';
import type { Task } from '../type/task';

interface AddEditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Task, 'id'>) => Promise<void>;
    initial?: Task;
    isDark: boolean;
}

export default function AddEditTaskModal({
    isOpen,
    onClose,
    onSave,
    initial,
    isDark
}: AddEditTaskModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<Task['priority']>('Low');
    const [category, setCategory] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (initial) {
            setTitle(initial.title);
            setDescription(initial.description || '');
            setDueDate(initial.dueDate);
            setPriority(initial.priority);
            setCategory(initial.category || '');
        } else {
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('Low');
            setCategory('');
        }
    }, [isOpen, initial]);

    const handleSave = async () => {
        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        const taskData: Omit<Task, 'id'> = {
            title,
            description,
            dueDate,
            priority,
            category,
            isCompleted: initial?.isCompleted ?? false
        };

        setSaving(true);
        try {
            await onSave(taskData);
            onClose();
        } catch (err) {
            console.error("Error saving task:", err);
            alert("Failed to save task. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    const containerBg = isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900';
    const inputBg = isDark ? 'bg-gray-900 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300';
    const cancelBg = isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-900';

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className={`px-6 py-8 rounded-xl w-full max-w-md mx-4 ${containerBg}`}>
                <h2 className="text-xl font-semibold mb-4">
                    {initial ? 'Edit Task' : 'Add New Task'}
                </h2>

                <label className="block mb-2">
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className={`w-full mt-1 p-2 rounded border ${inputBg}`}
                        disabled={saving}
                    />
                </label>
                <label className="block mb-2">
                    Description
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className={`w-full mt-1 p-2 rounded border ${inputBg}`}
                        rows={3}
                        disabled={saving}
                    />
                </label>
                <label className="block mb-2">
                    Due Date
                    <input
                        type="date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        className={`w-full mt-1 p-2 rounded border ${inputBg}`}
                        disabled={saving}
                    />
                </label>
                <label className="block mb-2">
                    Priority
                    <select
                        value={priority}
                        onChange={e => setPriority(e.target.value as Task['priority'])}
                        className={`w-full mt-1 p-2 rounded border ${inputBg}`}
                        disabled={saving}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </label>
                <label className="block mb-4">
                    Category
                    <input
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className={`w-full mt-1 p-2 rounded border ${inputBg}`}
                        placeholder="e.g. Work"
                        disabled={saving}
                    />
                </label>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className={`px-4 py-2 rounded ${cancelBg}`}
                        disabled={saving}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}
