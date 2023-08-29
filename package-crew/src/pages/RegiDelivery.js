import React, { useState } from "react";
import { cls } from "../libs/utils";
import Header from "../components/header";

const RegiDelivery = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className=" w-full mx-auto lg:w-[1024px]">
      <Header />
      <div className="mx-2">
        <div className="flex items-center space-x-3 ">
          <span className="text-[25px] font-bold">배송 물품 등록</span>
          <div className="btn btn-outline btn-info text-sm btn-xs">
            CSV 파일로 등록하기
          </div>
        </div>
        <form className="py-3 flex items-end  space-x-2">
          <div className="flex-1 grid grid-cols-2 gap-3">
            <div className="flex flex-col space-y-2">
              <span>송장 번호</span>
              <input
                placeholder="송장 번호를 입력해주세요."
                className="pl-3 input input-bordered w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span>상품 번호</span>
              <input
                placeholder="상품 번호를 입력해주세요."
                className="pl-3 input input-bordered w-full"
              />
            </div>
          </div>

          <button className=" btn btn-info bg-mainColor text-white">
            등록하기
          </button>
        </form>

        <div className=" h-[600px]">
          <div className="overflow-x-auto text-center">
            <table className="table h-[572px]">
              <thead className="bg-[#F4F4F4] text-black text-xl text-center">
                <tr>
                  <th>송장 번호</th>
                  <th>상품 번호</th>
                  <th>작업 상황</th>
                </tr>
              </thead>
              <tbody className="text-center text-black font-bold text-xl">
                {Array(20)
                  .fill(0)
                  .slice(10 * index, 10 * index + 10)
                  .map((n, i) => (
                    <tr>
                      <td>344156485874</td>
                      <td>344156485874</td>
                      <td className="font-normal">진행 전</td>
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
                  "font-bold"
                )}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <div className="space-x-5 text-right">
            <span className="font-bold">
              총 송장 번호 개수 <span className="text-mainColor">1000</span>개
            </span>
            <button className="btn btn-info bg-mainColor text-white px-20 text-xl font-bold">
              업무 등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegiDelivery;
