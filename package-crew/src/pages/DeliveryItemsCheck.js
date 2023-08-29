import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { cls } from "../libs/utils";

const DeliveryItemsCheck = () => {
  const [index, setIndex] = useState(0);
  const [isClickWork, setIsClickWork] = useState(false);
  const [isClickId, setIsClickId] = useState();
  return (
    <div className="pt-10">
      <div className="overflow-x-auto text-center">
        <table className="table h-[572px]">
          <thead className="bg-[#F4F4F4] text-black text-xl text-center">
            <tr>
              <th>송장 번호</th>
              <th>상품 번호</th>
              <th>작업자</th>
              <th>작업 상황</th>
            </tr>
          </thead>
          <tbody className="text-center text-black font-bold text-xl">
            {Array(20)
              .fill(0)
              .slice(10 * index, 10 * index + 10)
              .map((n, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-300 transition-all cursor-pointer"
                  onClick={() => {
                    setIsClickWork(true);
                    setIsClickId(i);
                  }}
                >
                  <td>344156485874</td>
                  <td>344156485874</td>
                  <td>1</td>
                  <td className="font-normal">진행 전{i}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center space-x-2 py-3 ">
        {[0, 1].map((i) => (
          <span
            onClick={() => setIndex(i)}
            className={cls(
              i === index ? "text-mainColor" : "text-[#D9D9D9]",
              "font-bold cursor-pointer"
            )}
          >
            {i + 1}
          </span>
        ))}
      </div>
      {isClickWork ? (
        <div className="w-screen left-0 fixed  flex justify-center">
          <div
            className="fixed top-0 right-0 w-screen h-screen bg-black opacity-20"
            onClick={() => setIsClickWork(false)}
          />
          <div className="fixed top-40  bg-white rounded-xl p-5 w-1/3">
            <div className="flex items-center justify-between">
              <div className="flex-1" />
              <div
                className="hover:bg-gray-300 transition-all rounded-full p-2"
                onClick={() => setIsClickWork(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div className="h-80 w-full bg-gray-300" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DeliveryItemsCheck;
