import { useState, useEffect } from 'react';
import type { Task } from '../type/task';

interface AddEditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Task, 'id'>) => Promise<void>;
    initial?: Task; // if present → edit mode, else → add mode
}

export default function AddEditTaskModal({
    isOpen,
    onClose,
    onSave,
    initial
}: AddEditTaskModalProps) {
    const [dark] = useState(false);
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

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 bg-opacity-30 flex items-center justify-center z-50">
            <div className={`${dark ? "bg-white text-gray-900" : "bg-gray-800 text-gray-100"} p-6 rounded-xl w-full max-w-md mx-4`}>
                <h2 className="text-xl font-semibold mb-4">
                    {initial ? 'Edit Task' : 'Add New Task'}
                </h2>

                <label className="block mb-2">
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        disabled={saving}
                    />
                </label>
                <label className="block mb-2">
                    Description
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
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
                        className="w-full mt-1 p-2 border rounded"
                        disabled={saving}
                    />
                </label>
                <label className="block mb-2">
                    Priority
                    <select
                        value={priority}
                        onChange={e => setPriority(e.target.value as Task['priority'])}
                        className="w-full mt-1 p-2 border rounded"
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
                        className="w-full mt-1 p-2 border rounded"
                        placeholder="e.g. Work"
                        disabled={saving}
                    />
                </label>

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 rounded text-gray-900 bg-gray-200" disabled={saving}>
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded bg-blue-600 text-white flex items-center"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}
