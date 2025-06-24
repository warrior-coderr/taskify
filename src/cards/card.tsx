import deleteicon from "../assets/delete-icon.svg";
import doneicon from "../assets/done.webp";
import editicon from "../assets/edit.svg";
import { useNavigate } from "react-router-dom";
import { cardDetailViewRoute } from "../routes/routes";

const TaskCard = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(cardDetailViewRoute())
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();

    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();

    };

    const handleDone = (e: React.MouseEvent) => {
        e.stopPropagation();

    };
    return (
        <>
            <section onClick={handleCardClick} className="flex m-3 hover:scale-105 ease-in-out transition-transform">
                <div className=" flex flex-col backdrop-opacity-90 border-[1px] p-[10px] bg-[#242424] hover:shadow-2xs shadow-white rounded-3xl h-[200px] w-[200px] hover:border-[#646cff] text-white">
                    <p className="font-semibold">
                        Title: This is a card
                    </p>
                    <div className="flex justify-evenly fixed bottom-5">
                        <button onClick={handleEdit} className="cursor-pointer rounded-3xl px-[1em] hover:border-sky-200 ">
                            <img src={editicon} className="h-6" />
                        </button>
                        <button onClick={handleDone} className="cursor-pointer rounded-3xl px-[1em] hover:border-sky-200 ">
                            <img src={doneicon} className="h-6" />
                        </button>
                        <button onClick={handleDelete} className="cursor-pointer rounded-3xl px-[1em] hover:border-sky-200 ">
                            <img src={deleteicon} className="h-6" />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};
export default TaskCard
