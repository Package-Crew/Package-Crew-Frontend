import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import RegiDelivery from "./pages/RegiDelivery";
import CrewWork from "./pages/CrewWork";
import CrewProcess from "./pages/CrewProcess";
import CrewTotalProcess from "./pages/CrewTotalProcess";
import Dashboard from "./pages/Dashboard";
import DeliveryItemsCheck from "./pages/DeliveryItemsCheck";
import WorkDetail from "./pages/WorkDetail";
import CrewComplete from "./pages/CrewComplete";

function App() {
    return (
        <div className="w-full">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/crewWork" element={<CrewWork />} />
                <Route path="/crewComplete" element={<CrewComplete />} />
                <Route path="/crewProcess" element={<CrewProcess />} />
                <Route
                    path="/crewTotalProcess"
                    element={<CrewTotalProcess />}
                />
                <Route
                    path="/registerDeliveryItem/:id"
                    element={<RegiDelivery />}
                />
                <Route path="/detail/:id/*" element={<WorkDetail />} />
            </Routes>
        </div>
    );
}

export default App;
