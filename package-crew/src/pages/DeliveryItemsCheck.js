import React from "react";
import SideBar from "../components/SideBar";

const DeliveryItemsCheck = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full mt-10 mx-14">
        <div className="flex flex-col">
          <span className="font-bold text-3xl">블랙 프라이데이 업무</span>
          <span>2023.08.29 ~ 2023.08.31</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryItemsCheck;
