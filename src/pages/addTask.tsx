import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseService";


import { addTask } from "../firebaseService";
import type { Task, Priority } from "../type/task";

const priorities: Priority[] = ["Low", "Medium", "High"];
const categories = ["Work", "Personal", "Errand", "Other"];

export default function AddTask() {
    const navigate = useNavigate();
    const [form, setForm] = useState<Omit<Task, 'id'>>({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        category: "Work",
        isCompleted: false,
    });
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const btn = document.getElementById("back-btn");
        btn?.classList.add("animate-bounce");
        setTimeout(() => btn?.classList.remove("animate-bounce"), 2000);

        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setIsDark(true);
        }
    }, []);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm(f => ({
            ...f,
            [name]: name === 'priority' ? (value as Priority) : value,
        } as Omit<Task, 'id'>));
    };
    const onSave = async () => {
        if (!form.title.trim()) {
            alert("Title is required!");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to save a task.");
            return;
        }

        try {
            await addTask(form, user.uid);
            alert("Task added successfully!");
            navigate("/");
        } catch (err) {
            console.error("Error adding task:", err);
            alert("Something went wrong. Please try again.");
        }
    };


    return (
        <div className={`${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen p-6 md:px-12 lg:px-24`}>
            <main>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className={`space-y-4 rounded-xl p-6 shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className="text-2xl font-semibold">Add New Task</h2>

                        <div>
                            <label className="block mb-1 font-medium">Title</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={onChange}
                                type="text"
                                placeholder="Your task title"
                                className={`w-full rounded-lg border ${isDark ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} focus:border-blue-500 focus:ring-blue-500`}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={onChange}
                                rows={4}
                                placeholder="Describe your task in detail"
                                className={`w-full rounded-lg border ${isDark ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} focus:border-blue-500 focus:ring-blue-500`}
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Due Date</label>
                                <input
                                    name="dueDate"
                                    value={form.dueDate}
                                    onChange={onChange}
                                    type="date"
                                    className={`w-full rounded-lg border ${isDark ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} focus:border-blue-500 focus:ring-blue-500`}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Priority</label>
                                <select
                                    name="priority"
                                    value={form.priority}
                                    onChange={onChange}
                                    className={`w-full rounded-lg border ${isDark ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} focus:border-blue-500 focus:ring-blue-500`}
                                >
                                    {priorities.map((p) => (
                                        <option key={p} value={p}>
                                            {p}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Category</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={onChange}
                                className={`w-full rounded-lg border ${isDark ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} focus:border-blue-500 focus:ring-blue-500`}
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={onSave}
                            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 transition"
                        >
                            Save Task
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
