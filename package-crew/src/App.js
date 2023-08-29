import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import RegiDelivery from "./pages/RegiDelivery";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registerDeliveryItem/id" element={<RegiDelivery />} />
        <Route path="/detail/id/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
