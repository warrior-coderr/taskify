import React, { useState, useEffect } from 'react';
import type { Task } from '../type/task';

interface AddEditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Task, 'id'>) => void;
    initial?: Task;
}

export default function AddEditTaskModal({
    isOpen, onClose, onSave, initial
}: AddEditTaskModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<Task['priority']>('Low');
    const [category, setCategory] = useState('');

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

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md mx-4">
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
                    {initial ? 'Edit Task' : 'Add New Task'}
                </h2>

                <label className="block mb-2">
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </label>
                <label className="block mb-2">
                    Description
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        rows={3}
                    />
                </label>
                <label className="block mb-2">
                    Due Date
                    <input
                        type="date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </label>
                <label className="block mb-2">
                    Priority
                    <select
                        value={priority}
                        onChange={e => setPriority(e.target.value as Task['priority'])}
                        className="w-full mt-1 p-2 border rounded"
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
                    />
                </label>

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSave({ title, description, dueDate, priority, category, isCompleted: initial?.isCompleted ?? false });
                        }}
                        className="px-4 py-2 rounded bg-blue-600 text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}