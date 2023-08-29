import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import RegiDelivery from "./pages/RegiDelivery";
import CrewWork from "./pages/CrewWork";




function App() {
  return (
    <div className="w-full mx-auto lg:w-[1024px]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crewWork" element={<CrewWork />} />
        <Route path="/registerDeliveryItem/id" element={<RegiDelivery />} />
      </Routes>
    </div>
  );
}

export default App;
