import React from 'react';
import type { Task } from '../type/task';

interface TaskCardProps {
    task: Task;
    onToggle: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onClick?: (id: number) => void;
}

const priorityColors: Record<Task['priority'], string> = {
    Low: 'bg-green-400',
    Medium: 'bg-yellow-400',
    High: 'bg-red-400',
};

export default function TaskCard({
    task, onToggle, onEdit, onDelete, onClick
}: TaskCardProps) {
    return (
        <div
            onClick={() => onClick?.(task.id)}
            className="group relative flex flex-col justify-between p-4 w-52 h-52
                 rounded-2xl border bg-white dark:bg-gray-800 transition
                 hover:shadow-lg cursor-pointer"
        >
            {/* Title / Due / Priority */}
            <div>
                <h3 className={`text-lg font-semibold ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Due: {task.dueDate}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                    <span className={`h-2 w-2 rounded-full ${priorityColors[task.priority]}`} />
                    <span className="text-sm">{task.priority}</span>
                </div>
            </div>

            {/* Action icons on hover */}
            <div className="absolute bottom-2 left-2 right-2 flex justify-between
                      opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={e => { e.stopPropagation(); onEdit(task.id); }}>
                    {/* TODO: /assets/edit.svg */}
                    <img src="/assets/edit.svg" alt="Edit" className="h-5 w-5" />
                </button>
                <button onClick={e => { e.stopPropagation(); onToggle(task.id); }}>
                    {/* TODO: /assets/check.svg */}
                    <img src="/assets/check.svg" alt="Toggle" className="h-5 w-5" />
                </button>
                <button onClick={e => { e.stopPropagation(); onDelete(task.id); }}>
                    {/* TODO: /assets/delete.svg */}
                    <img src="/assets/delete.svg" alt="Delete" className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}