

// 1️⃣ Define the same union you use in Home
export type Filter = 'All' | 'Today' | 'Upcoming' | 'Completed';

interface FilterChipsProps {
    active: Filter;
    onSelect: (f: Filter) => void;
}

const FILTERS: Filter[] = ['All', 'Today', 'Upcoming', 'Completed'];

export default function FilterChips({ active, onSelect }: FilterChipsProps) {
    return (
        <div className="flex space-x-2">
            {FILTERS.map(f => (
                <button
                    key={f}
                    onClick={() => onSelect(f)}
                    className={`px-3 py-1 rounded-full text-sm transition
                        ${active === f
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    {f}
                </button>
            ))}
        </div>
    );
}
