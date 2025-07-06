import { useState } from "react";
import type { Task } from "../type/task";
import edittask from "../assets/edit.svg";
import deletetask from "../assets/delete-icon.svg";
import completetask from "../assets/done.webp";

interface TaskCardProps {
    task: Task;
    onToggle: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onClick?: () => void;
}

const priorityColors: Record<Task["priority"], string> = {
    Low: 'bg-green-400',
    Medium: 'bg-yellow-400',
    High: 'bg-red-400',
};

export default function TaskCard({
    task,
    onToggle,
    onEdit,
    onDelete,
    onClick
}: TaskCardProps) {
    const [dark] = useState(true);
    return (
        <div
            onClick={onClick}
            className={`group relative flex flex-col justify-between p-4 w-52 h-52
                 rounded-2xl border ${dark ? "bg-white" : "bg-gray-800"} transition
                 hover:shadow-lg cursor-pointer`}>
            {/* Title / Due / Priority */}
            <div>
                <h3 className={`text-lg font-semibold ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                </h3>
                <p className={`text-sm ${dark ? "text-gray-600" : "text-gray-400"} mt-1`}>
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
                <button onClick={e => { e.stopPropagation(); onEdit(); }}>
                    <img src={edittask} alt="Edit" className="h-5 w-5" />
                </button>
                <button onClick={e => { e.stopPropagation(); onToggle(); }}>
                    <img src={completetask} alt="Toggle" className="h-5 w-5" />
                </button>
                <button onClick={e => { e.stopPropagation(); onDelete(); }}>
                    <img src={deletetask} alt="Delete" className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
