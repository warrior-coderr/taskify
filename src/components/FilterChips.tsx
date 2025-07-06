import type { Filter } from '../type/task';
import backIcon from '../assets/backwhite.png';
import darkIcon from '../assets/whitedark.png';
import lightIcon from '../assets/lightmodeicon.png';
import { useNavigate } from 'react-router-dom';

interface FilterChipsProps {
    active: Filter;
    onSelect: (f: Filter) => void;
    isDark: boolean;
    toggleTheme: () => void;
}

const FILTERS: Filter[] = ['Home', 'Today', 'Upcoming', 'Completed'];

export default function FilterChips({ active, onSelect, isDark, toggleTheme }: FilterChipsProps) {
    const navigate = useNavigate();

    return (
        <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-4 rounded-xl bg-gray-800/50 p-3 shadow-lg backdrop-blur-md md:top-4 md:bottom-auto">
            <button
                id="back-btn"
                onClick={() => navigate(-1)}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
            >
                <img src={backIcon} alt="Back" className="h-5 w-5" />
            </button>

            {FILTERS.map((f) => (
                <button
                    key={f}
                    onClick={() => onSelect(f)}
                    className={`rounded-lg px-3 py-1 text-sm transition ${active === f ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white'
                        }`}
                >
                    {f}
                </button>
            ))}

            <button
                onClick={toggleTheme}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
            >
                <img src={isDark ? darkIcon : lightIcon} alt="Toggle theme" className="h-5 w-5" />
            </button>
        </nav>
    );
}
