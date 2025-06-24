import back from "../assets/back.svg";
import { useNavigate } from "react-router-dom";
const AddTask = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                {/* Head section */}
                <section className="relative flex items-center justify-center shadow-md shadow-gray-500 mb-5 px-4 py-1">
                    <div className="absolute left-4">
                        <button onClick={() => navigate(-1)} className="rounded-xl hover:border-[1px] hover:border-[#646cff]">
                            <img src={back} alt="Back" />
                        </button>
                    </div>

                    <div className="flex gap-4 text-gray-300 font-bold">
                        <button className="rounded-3xl px-[1em] py-[1.2em] hover:border-[1px] hover:py-[1em] hover:border-[#646cff]">Home</button>
                        <button className="rounded-3xl px-[1em] py-[1.2em] hover:border-[1px] hover:py-[1em] hover:border-[#646cff]">My Tasks</button>
                        <button className="rounded-3xl px-[1em] py-[1.2em] hover:border-[1px] hover:py-[1em] hover:border-[#646cff]">Completed</button>
                        <button className="rounded-3xl px-[1em] py-[1.2em] hover:border-[1px] hover:py-[1em] hover:border-[#646cff]">Logout</button>
                    </div>
                </section>

                <section>
                    <div className="flex flex-col relative justify-center w-xl text-3xl font-semibold text-white">
                        <p className="bg-amber-950 text-center ">New Task</p>
                        <input type="text" placeholder="Title.." className="border-[2px] in-hover:border-[#646cff] w-xl rounded-lg my-2" />
                        <label htmlFor="Title.." />
                        <textarea itemType="text" placeholder="Description" className="border-[2px] rounded-lg in-hover:border-[#646cff] my-2" />
                        <button className="border-[1px] border-white rounded-lg w-sm hover:border-[#646cff] my-3">Save Task</button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AddTask