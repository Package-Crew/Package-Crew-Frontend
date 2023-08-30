import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { cls } from "../libs/utils";
import axios from "axios";
import { useRecoilState } from "recoil";
import { workIdState } from "../atom/exampleState";

const DeliveryItemsCheck = () => {
  const [index, setIndex] = useState(0);
  const [isClickWork, setIsClickWork] = useState(false);
  const [isClickId, setIsClickId] = useState();
  const [trackingNum, setTrackingNum] = useState();
  const [videoUrl, setVideoUrl] = useState();

  const [workId, setWorkId] = useRecoilState(workIdState);

  const [deliveryList, setDeliveryList] = useState([
    {
      trackingNum: 5,
      done: 1, // 1은 완료된 작
      workerId: 8,
      items: [
        {
          id: 3,
        },
      ],
    },
    {
      trackingNum: 6,
      done: 0, //0은 아직 안된거
      workerId: 0, // 배정이 안됐을경우 0으로 전송
      items: [
        {
          id: 3,
        },
      ],
    },
  ]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/dangdol/delivery/${workId}`)
      .then((res) => {
        console.log(res);
        setDeliveryList(res.data.deliveryList);
      });
  }, []);

  useEffect(() => {
    if (isClickWork) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/dangdol/video?trackingNum=${trackingNum}`
        )
        .then((res) => {
          console.log(res);
          setVideoUrl(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isClickWork]);
  return (
    <div className="pt-10">
      <div className="overflow-x-auto text-center h-[572px]">
        <table className="table ">
          <thead className="text-center text-gray-400">
            <tr className="bg-base-200 text-base">
              <th>송장 번호</th>
              <th>상품 번호</th>
              <th>작업자</th>
              <th>작업 상황</th>
            </tr>
          </thead>
          <tbody className="text-center text-black text-base">
            {deliveryList.slice(10 * index, 10 * index + 10).map((d, i) => (
              <tr
                key={i}
                className="hover:bg-gray-300 transition-all cursor-pointer"
                onClick={() => {
                  if (d.done === 1) setIsClickWork(true);

                  setIsClickId(i);
                  setTrackingNum(d.trackingNum);
                }}
              >
                <td>{d.trackingNum}</td>
                <td>
                  {d.items[0].id}
                  {d.items.length === 1 ? "" : `외 ${d.items.length - 1}개`}
                </td>
                <td>{d.workerId}</td>
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
            <video src={videoUrl} className="h-80 w-full " controls />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DeliveryItemsCheck;
