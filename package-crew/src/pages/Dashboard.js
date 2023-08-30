import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import tw from "tailwind-styled-components";
import { PieChart } from "react-minimal-pie-chart";
import axios from "axios";
import { useRecoilState } from "recoil";
import { workIdState } from "../atom/exampleState";

const ItemBox = tw.div`
 rounded-md  p-6 flex items-center justify-between transition-all cursor-pointer dropdown 
`;

const ExtraText = tw.span`
font-bold text-xl
`;

const Dashboard = () => {
  const [workId, setWordId] = useRecoilState(workIdState);
  const [total, setTotal] = useState();
  const [clear, setClear] = useState();
  const [limit, setLimit] = useState();
  const [avg, setAvg] = useState();
  const [deliveryList, setDeliveryList] = useState([
    {
      trackingNum: 8,
      done: 1, // 1이 완료된 상태임, 0은 완료안됨
      items: [
        {
          id: 3,
        },
      ],
    },
    {
      trackingNum: 7,
      done: 1,
      items: [
        {
          id: 3,
        },
      ],
    },
    {
      trackingNum: 6,
      done: 1,
      items: [
        {
          id: 3,
        },
      ],
    },
    {
      trackingNum: 5,
      done: 1,
      items: [
        {
          id: 3,
        },
      ],
    },
    {
      trackingNum: 4,
      done: 1,
      items: [
        {
          id: 3,
        },
      ],
    },
    {
      trackingNum: 3,
      done: 1,
      items: [
        {
          id: 3,
        },
      ],
    },
    {
      trackingNum: 2,
      done: 1,
      items: [
        {
          id: 3,
        },
      ],
    },
  ]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/dangdol/dashboard/${workId}`)
      .then((res) => {
        console.log(res);
        setDeliveryList(res.data.deliveryList);
        setTotal(res.data.total);
        setClear(res.data.clear);
        setLimit(res.data.limit);
        setAvg(res.data.avg);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="  ">
      <div className="pt-5 pb-10 space-y-4">
        <ExtraText>DashBoard</ExtraText>
        <div className="grid grid-cols-3 gap-7">
          <ItemBox className="bg-mainColor">
            <div className="text-white flex flex-col">
              <span className="font-bold text-6xl">{total}</span>
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
              <span className="font-bold text-6xl">{clear}</span>
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
              <span className="font-bold text-6xl">{limit}</span>
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

      <div className="flex space-x-7">
        <div className="flex-1 space-y-4">
          <ExtraText>최근 작업된 물품 상황</ExtraText>
          <div>
            <table className="table  ">
              <thead className="  text-center text-gray-400">
                <tr className=" bg-base-200 text-base">
                  <th>송장 번호</th>
                  <th>상품 번호</th>
                  <th>작업 상황</th>
                </tr>
              </thead>
              <tbody className="text-center text-black  ">
                {deliveryList.map((d, i) => (
                  <tr>
                    <td>{d.trackingNum}</td>
                    <td>
                      {d.items[0].id}
                      {d.items.length === 1 ? "" : `외 ${d.items.length - 1}개`}
                    </td>
                    <td className="font-normal">
                      {d.done === 1 ? (
                        <span className="text-mainColor">완료</span>
                      ) : (
                        "진행 전"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-4">
          <ExtraText>전체 진행률</ExtraText>
          <div className="bg-[#37CDBE] pt-5 pb-20 px-16 rounded-md relative flex justify-center">
            <div className="bg-white rounded-full w-64 h-64 p-4">
              <PieChart
                data={[
                  { title: "One", value: avg, color: "#37CDBE" },
                  { title: "Two", value: 100 - avg, color: "white" },
                ]}
                lineWidth={20}
                startAngle={270}
                animate
              />
              <div className="font-bold absolute top-28 left-36  flex justify-center text-6xl text-[#37CDBE]">
                {avg}%
              </div>
              <div className="font-bold text-3xl absolute bottom-6 left-40 text-white">
                {clear}/{total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
