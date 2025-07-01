import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/backwhite.png";
import lightIcon from "../assets/lightmodeicon.png";
import darkIcon from "../assets/whitedark.png";


const priorities = ["Low", "Medium", "High"];
const categories = ["Work", "Personal", "Errand", "Other"];

export default function AddTask() {
    const navigate = useNavigate();
    const [dark, setDark] = useState(true);
    const [form, setForm] = useState({
        title: "",
        desc: "",
        due: "",
        priority: "Medium",
        category: "Work",
    });

    // Pulse back button on mount
    useEffect(() => {
        const btn = document.getElementById("back-btn");
        btn?.classList.add("animate-pulse");
        setTimeout(() => btn?.classList.remove("animate-pulse"), 2000);
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const onSave = () => {
        console.log("Saved", form);
        // call your save API here...
    };

    return (
        <div
            className={`${dark ? "dark" : ""}`}
            data-theme={dark ? "dark" : "light"}
        >
            {/* Nav */}
            <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-4 rounded-xl bg-gray-800/50 p-3 shadow-lg backdrop-blur-md md:top-4 md:bottom-auto">
                <button
                    id="back-btn"
                    onClick={() => navigate(-1)}
                    className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
                >
                    <img src={backIcon} alt="Back" className="h-5 w-5" />
                </button>
                {["Home", "My Tasks", "Completed", "Logout"].map((l, i) => (
                    <button
                        key={i}
                        onClick={() =>
                            navigate(l === "Home" ? "/" : `/${l.toLowerCase().replace(" ", "")}`)
                        }
                        className="rounded-lg px-3 py-1 text-sm hover:bg-white/10 transition"
                    >
                        {l}
                    </button>
                ))}
                <button
                    onClick={() => setDark(d => !d)}
                    className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
                >
                    <img
                        src={dark ? lightIcon : darkIcon}
                        alt="Toggle theme"
                        className="h-5 w-5"
                    />
                </button>
            </nav>

            {/* Body */}
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:px-12 lg:px-24">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* ==== FORM CARD ==== */}
                    <div className="space-y-4 rounded-xl bg-white dark:bg-gray-800 p-6 shadow-xl">
                        <h2 className="text-2xl font-semibold">Add New Task</h2>

                        {/* Title */}
                        <div>
                            <label className="block mb-1 font-medium">Title</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={onChange}
                                type="text"
                                placeholder="Your task title"
                                className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-1 font-medium">Description</label>
                            <textarea
                                name="desc"
                                value={form.desc}
                                onChange={onChange}
                                rows={4}
                                placeholder="Describe your task in detail"
                                className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        {/* Due Date + Priority */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Due Date</label>
                                <input
                                    name="due"
                                    value={form.due}
                                    onChange={onChange}
                                    type="date"
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Priority</label>
                                <select
                                    name="priority"
                                    value={form.priority}
                                    onChange={onChange}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    {priorities.map(p => (
                                        <option key={p} value={p}>
                                            {p}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-1 font-medium">Category</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={onChange}
                                className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            >
                                {categories.map(c => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Save Button */}
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