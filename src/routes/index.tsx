import { Route, Routes } from "react-router-dom"
import AddTask from "../pages/addTask"
import { addTaskRoute, cardDetailViewRoute } from "./routes"
import Home from "../pages/home"
import CardDetailView from "../dialogs/cardDetailView"

const Index = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path={addTaskRoute()} element={<AddTask />} />
            <Route path={cardDetailViewRoute()} element={<CardDetailView />} />
        </Routes>
    )
}
export default Index   