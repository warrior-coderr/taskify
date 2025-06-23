import { Route, Routes } from "react-router-dom"
import AddTask from "../pages/addTask"
import { addTaskRoute } from "./routes"
import Home from "../pages/home"

const Index = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path={addTaskRoute()} element={<AddTask />} />
        </Routes>
    )
}
export default Index   