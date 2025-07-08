import addtaskwhite from "../assets/addnotewhite.png";

interface FloatingAddButtonProps {
    onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
    return (
        <button
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition flex items-center justify-center"
            onClick={onClick}
        >
            <img src={addtaskwhite} alt="Add" className="h-7 w-7 object-contain" />
        </button>
    );
}
