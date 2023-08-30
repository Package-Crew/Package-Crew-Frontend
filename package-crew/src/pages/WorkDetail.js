import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import DeliveryItemsCheck from "./DeliveryItemsCheck";
import CrewManagement from "./CrewManagement";
import axios from "axios";
import { useRecoilState } from "recoil";
import { workIdState } from "../atom/exampleState";

const WorkDetail = () => {
  const [workId, setWordId] = useRecoilState(workIdState);
  const [workName, setWorkName] = useState("업무10");
  const [startDate, setStartDate] = useState("2023-08-29");
  const [endDate, setEndDate] = useState("2023-09-01");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/dangdol/dashboard/${workId}`)
      .then((res) => {
        console.log(res);
        setWorkName(res.data.workName);
        setStartDate(res.data.startDate);
        setEndDate(res.data.endDate);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full mt-10 mx-14">
        <div className="flex flex-col">
          <span className="font-bold text-3xl">{workName}</span>
          <span className="text-[#9E9E9E]">
            {startDate} ~ {endDate}
          </span>
        </div>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deliveryItemsCheck" element={<DeliveryItemsCheck />} />
          <Route path="/crewManagement" element={<CrewManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default WorkDetail;
