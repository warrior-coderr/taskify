import deletebutton from "../assets/delete-icon.svg";

const TaskCard = () => {
    return (
        <>
            <section className="flex m-3 hover:scale-105 ease-in-out transition-transform">
                <div className=" flex flex-col backdrop-opacity-90 border-[1px] p-[10px] bg-[#242424] hover:shadow-2xs shadow-white rounded-3xl h-[200px] w-[200px] hover:border-[#646cff] text-white">
                    <p className="font-semibold">
                        Title: This is a card
                    </p>
                    <button className="cursor-pointer rounded-3xl px-[1em] hover:border-sky-200 fixed bottom-5 right-3 ">
                        <img src={deletebutton} className="h-6" />
                    </button>
                </div>
            </section>
        </>
    );
};
export default TaskCard;
