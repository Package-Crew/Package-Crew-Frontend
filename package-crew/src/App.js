import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CrewWork from "./pages/CrewWork";

function App() {
    return (
        <div className="w-full h-screen">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/crewWork" element={<CrewWork />} />
            </Routes>
        </div>
    );
}

export default App;
