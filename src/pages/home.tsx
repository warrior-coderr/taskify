import TaskCard from "../cards/card"
import addtask from "../assets/newTask.webp"
import { useNavigate } from "react-router-dom"
import { addTaskRoute } from "../routes/routes";

const Home = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col">
                {/* Head section */}
                <section className="shadow-md shadow-gray-500 mb-5">
                    <div className="border-b-[1px] py-1">
                        <div className="flex flex-row gap-4 justify-center text-gray-300 font-bold ">
                            <button className="rounded-3xl hover:border-[1px] hover:py-[1em] hover:border-[#646cff] px-[1em] py-[1.2em] cursor-pointer">
                                Home
                            </button>
                            <button className="rounded-3xl hover:border-[1px] hover:py-[1em] hover:border-[#646cff] px-[1em] py-[1.2em] cursor-pointer">
                                My Tasks
                            </button>
                            <button className="rounded-3xl hover:border-[1px] hover:py-[1em] hover:border-[#646cff] px-[1em] py-[1.2em] cursor-pointer">
                                Completed
                            </button>
                            <button className="rounded-3xl hover:border-[1px] hover:py-[1em] hover:border-[#646cff] px-[1em] py-[1.2em] cursor-pointer">
                                Logout
                            </button>
                        </div>
                    </div>
                </section>
                {/* Body Section */}
                <section>
                    <div className="flex flex-wrap justify-items-end-safe">
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                    </div>
                </section>
                {/* Add New Task Section */}
                <section className=" bg-amber-200">
                    <button className=" w-20 fixed bottom-8 right-8 cursor-pointer rounded-2xl hover:border-[1px] hover:border-[#646cff]" onClick={() => navigate(addTaskRoute())}>
                        <img src={addtask} />
                    </button>
                </section>
            </div >
        </>
    )

}

export default Home