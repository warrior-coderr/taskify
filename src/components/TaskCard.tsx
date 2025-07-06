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
    isDark: boolean;
}

const priorityColors: Record<Task["priority"], string> = {
    Low: "bg-green-400",
    Medium: "bg-yellow-400",
    High: "bg-red-400",
};

export default function TaskCard({
    task,
    onToggle,
    onEdit,
    onDelete,
    onClick,
    isDark,
}: TaskCardProps) {
    return (
        <div
            onClick={onClick}
            className={`group relative flex flex-col justify-between p-4 w-52 h-52 rounded-2xl border transition hover:shadow-lg cursor-pointer 
                ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
            <div>
                <h3
                    className={`text-lg font-semibold ${task.isCompleted
                            ? `${isDark ? 'text-gray-400' : 'text-gray-500'} line-through`
                            : `${isDark ? 'text-gray-100' : 'text-gray-900'}`
                        }`}
                >
                    {task.title}
                </h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Due: {task.dueDate}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                    <span className={`h-2 w-2 rounded-full ${priorityColors[task.priority]}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {task.priority}
                    </span>
                </div>
            </div>

            <div className="absolute bottom-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                >
                    <img src={edittask} alt="Edit" className="h-5 w-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle();
                    }}
                >
                    <img src={completetask} alt="Toggle" className="h-5 w-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <img src={deletetask} alt="Delete" className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
