import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import RegiDelivery from "./pages/RegiDelivery";

import Dashboard from "./pages/Dashboard";

import CrewWork from "./pages/CrewWork";
import DeliveryItemsCheck from "./pages/DeliveryItemsCheck";
import WorkDetail from "./pages/WorkDetail";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crewWork" element={<CrewWork />} />
        <Route path="/registerDeliveryItem/:id" element={<RegiDelivery />} />
        <Route path="/detail/:id/*" element={<WorkDetail />} />
      </Routes>
    </div>
  );
}

export default App;
