import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { cls } from "../libs/utils";

const DeliveryItemsCheck = () => {
  const [index, setIndex] = useState(0);
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
                <tr key={i}>
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
    </div>
  );
};

export default DeliveryItemsCheck;
