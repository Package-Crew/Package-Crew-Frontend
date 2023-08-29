import React from "react";
import SideBar from "../components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import DeliveryItemsCheck from "./DeliveryItemsCheck";

const WorkDetail = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full mt-10 mx-14">
        <div className="flex flex-col">
          <span className="font-bold text-3xl">블랙 프라이데이 업무</span>
          <span className="text-[#9E9E9E]">2023.08.29 ~ 2023.08.31</span>
        </div>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deliveryItemsCheck" element={<DeliveryItemsCheck />} />
        </Routes>
      </div>
    </div>
  );
};

export default WorkDetail;
