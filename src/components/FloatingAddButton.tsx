import addtaskwhite from "../assets/addnotewhite.png"



interface FloatingAddButtonProps {
    onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
    return (
        <button
            id="add-btn"
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full text-white shadow-lg
                 hover:scale-105 transform transition"
        >
            {/* TODO: /assets/plus.svg */}
            <img src={addtaskwhite} alt="Add" className="h-6 w-6" />
            {/* {`${dark ? addtaskblack : addtaskwhite}`} */}
        </button>
    );
}