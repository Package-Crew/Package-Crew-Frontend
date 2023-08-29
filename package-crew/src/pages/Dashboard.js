import React from "react";
import SideBar from "../components/SideBar";
import tw from "tailwind-styled-components";
import { Chart } from "react-google-charts";
import { PieChart } from "react-minimal-pie-chart";

const ItemBox = tw.div`
 rounded-md  p-6 flex items-center justify-between transition-all cursor-pointer dropdown 
`;

const ExtraText = tw.span`
font-bold text-xl
`;

const Dashboard = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className=" w-full mt-10 mx-14 ">
        <div className="flex flex-col">
          <span className="font-bold text-3xl">블랙 프라이데이 업무</span>
          <span>2023.08.29 ~ 2023.08.31</span>
        </div>

        <div className="pt-5 pb-10 space-y-4">
          <ExtraText>DashBoard</ExtraText>
          <div className="grid grid-cols-3 gap-7">
            <ItemBox className="bg-mainColor">
              <div className="text-white flex flex-col">
                <span className="font-bold text-6xl">1000</span>
                <span>전체 주문 개수</span>
              </div>
              <div className="text-white  relative">
                <div className="bg-white rounded-full h-16 w-16 flex opacity-30"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12 absolute right-2 top-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
            </ItemBox>
            <ItemBox className="bg-[#7B61FF]">
              <div className="text-white flex flex-col">
                <span className="font-bold text-6xl">100</span>
                <span>작업 완료된 주문 개수</span>
              </div>
              <div className="text-white  relative">
                <div className="bg-white rounded-full h-16 w-16 flex opacity-30"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-11 h-11 absolute right-3 top-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>
              </div>
            </ItemBox>
            <ItemBox className="bg-[#FF5724]">
              <div className="text-white flex flex-col">
                <span className="font-bold text-6xl">26</span>
                <span>일정 마무리까지 남은 시간</span>
              </div>
              <div className="text-white  relative">
                <div className="bg-white rounded-full h-16 w-16 flex opacity-30"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12 absolute right-2 top-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </ItemBox>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-7">
          <div className="col-start-1 col-end-3 space-y-4">
            <ExtraText>최근 작업된 물품 상황</ExtraText>
            <div>
              <table className="table table-lg ">
                <thead className="bg-[#F4F4F4] text-black text-center">
                  <tr>
                    <th>송장 번호</th>
                    <th>상품 번호</th>
                    <th>작업 상황</th>
                  </tr>
                </thead>
                <tbody className="text-center text-black font-bold ">
                  {Array(7)
                    .fill(0)
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
          </div>
          <div className="col-start-3 col-end-4 space-y-4">
            <ExtraText>전체 진행률</ExtraText>
            <div className="bg-[#37CDBE] p-8 pb-16 rounded-md relative">
              <div className="bg-white rounded-full p-5">
                <PieChart
                  data={[
                    { title: "One", value: 100, color: "#37CDBE" },
                    { title: "Two", value: 900, color: "white" },
                  ]}
                  lineWidth={20}
                  startAngle={270}
                  animate
                />
                <div className="font-bold absolute top-48 left-40 text-6xl text-[#37CDBE]">
                  10%
                </div>
                <div className="font-bold absolute bottom-3 text-3xl left-36 text-white">
                  100/1000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
