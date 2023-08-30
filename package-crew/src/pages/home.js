// Home
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { cls } from "../libs/utils";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/header";
import { useRecoilState } from "recoil";
import { workIdState } from "../atom/exampleState";

const rowVariants = {
  hidden: (back) => ({
    x: back ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (back) => ({
    x: back ? window.outerWidth + 10 : -window.outerWidth - 10,
  }),
};

const Circle = tw.div`
    h-3 w-3 bg-[#D9D9D9] rounded-full 
`;

function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const Home = () => {
  const [leaving, setLeaving] = useState(false);
  const [worksIndex, setWorksIndex] = useState(0);
  const [finishIndex, setFinishIndex] = useState(0);
  const [isNowWork, setIsNowWork] = useState(true);
  const [works, setWorks] = useState([
    {
      workName: "업무",
      startDate: "2023-08-29",
      endDate: "2023-08-29",
      total: 2,
      clear: 0,
      avg: 0,
      workers: 2,
    },
    {
      workName: "업무2",
      startDate: "2023-08-28",
      endDate: "2023-08-29",
      total: 0,
      clear: 0,
      avg: 0,
      workers: 2,
    },
  ]);
  const [prevWorks, setPrevWorks] = useState([
    {
      workName: "업무",
      startDate: "2023-08-20",
      endDate: "2023-08-21",
      total: 2, //전체 개수
      clear: 0, //완료한 작업 개수
      avg: 0,
      workers: 1,
    },
    {
      workName: "업무2",
      startDate: "2023-08-01",
      endDate: "2023-08-10",
      total: 0,
      clear: 0,
      avg: 0,
      workers: 2,
    },
  ]);

  const [isClickNew, setIsClickNew] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  const [workId, setWorkId] = useRecoilState(workIdState);
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onValid = (data) => {
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/dangdol/work/1`, {
        workName: data.workName,
        startDate: formatDateToYYYYMMDD(selectedDate1),
        endDate: formatDateToYYYYMMDD(selectedDate2),
      })
      .then((res) => {
        console.log(res);
        setWorkId(res.data);
        navigate(`/registerDeliveryItem/${res.data}`);
      })
      .catch((err) => console.log(err));
    reset();
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/dangdol/now/1`)
      .then((res) => {
        console.log(res);
        setWorks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/dangdol/previous/1`)
      .then((res) => {
        console.log(res);
        setPrevWorks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="text-base pb-10 h-screen w-full mx-auto lg:w-[1024px]">
      <Header />
      <div className="space-y-2 flex flex-col justify-center items-center">
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <div className="bg-gray-300 w-full h-80 rounded-2xl"></div>
        </AnimatePresence>
        <div className="flex space-x-4">
          <Circle />
          <Circle />
          <Circle />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center text-[#9E9E9E] pt-7 pb-4">
          <div className="space-x-3">
            <span
              onClick={() => {
                setIsNowWork(true);
              }}
              className={cls(
                isNowWork ? "text-black font-bold" : null,
                "cursor-pointer"
              )}
            >
              나의 현재 업무
            </span>
            <span>ㅣ</span>
            <span
              onClick={() => {
                setIsNowWork(false);
              }}
              className={cls(
                isNowWork ? null : "text-black font-bold",
                "cursor-pointer"
              )}
            >
              이전 업무
            </span>
          </div>
          <button
            onClick={() => setIsClickNew(true)}
            className="flex items-center btn btn-info bg-mainColor text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            작업 만들기
          </button>
        </div>
        <div className="">
          {isNowWork ? (
            <div>
              <div className="space-y-2">
                {works
                  .slice(5 * worksIndex, 5 * worksIndex + 5)
                  .map((work, i) => (
                    <Link
                      to={`/detail/${work.id}/dashboard`}
                      className="flex justify-between p-3 bg-[#F8F8F8]"
                      onClick={() => setWorkId(work.id)}
                    >
                      <div className="flex flex-col space-y-3">
                        <span className="font-bold">{work.workName}</span>
                        <span>
                          {work.startDate} ~ {work.endDate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold">
                          총 {work.total}개 품목 중 {work.clear}개 완료(
                          {parseInt(work.avg) * 100}%)
                        </span>
                        <div className="border-mainColor p-4 rounded-xl border text-mainColor font-bold">
                          {work.workers}명
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              <div className="space-x-2 flex justify-center py-3">
                {Array(parseInt(works.length / 5) + 1)
                  .fill(0)
                  .map((n, i) => (
                    <span
                      onClick={() => {
                        setWorksIndex(i);
                      }}
                      className={cls(
                        i === worksIndex ? "text-mainColor" : "text-[#D9D9D9]",
                        "font-bold cursor-pointer"
                      )}
                    >
                      {i + 1}
                    </span>
                  ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-2">
                {prevWorks
                  .slice(5 * finishIndex, 5 * finishIndex + 5)
                  .map((work, i) => (
                    <div className="flex justify-between p-3 bg-[#F8F8F8] text-[#9E9E9E]">
                      <div className="flex flex-col space-y-3">
                        <span className="font-bold">{work.workName}</span>
                        <span>
                          {work.startDate} ~ {work.endDate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold">
                          총 {work.total}개 품목 중 {work.clear}개 완료(
                          {parseInt(work.avg) * 100}%)
                        </span>
                        <div className="border-mainColor p-4 rounded-xl border text-mainColor font-bold">
                          {work.workers}명
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="">
                <div className="space-x-2 flex justify-center py-3">
                  {Array(parseInt(prevWorks.length / 5) + 1)
                    .fill(0)
                    .map((i) => (
                      <span
                        onClick={() => {
                          setFinishIndex(i);
                        }}
                        className={cls(
                          i === finishIndex
                            ? "text-mainColor"
                            : "text-[#D9D9D9]",
                          "font-bold cursor-pointer"
                        )}
                      >
                        {i + 1}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isClickNew ? (
        <div className="flex justify-center">
          <div
            className="fixed top-0 right-0 w-screen h-screen bg-black opacity-20"
            onClick={() => setIsClickNew(false)}
          />
          <div className="fixed top-40  bg-white rounded-xl p-5 w-1/3">
            <div className="flex justify-between items-center">
              <span className="text-[25px] font-bold">업무 설정</span>
              <div
                className="hover:bg-gray-300 transition-all rounded-full p-2"
                onClick={() => setIsClickNew(false)}
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
            <form onSubmit={handleSubmit(onValid)} className="py-4 pl-1">
              <div className="h-32 flex flex-col space-y-2">
                <span className="text-xl font-bold">
                  업무 이름 <span className="text-[#FF5724]">*</span>
                </span>
                <input
                  placeholder="업무 이름을 작성해주세요."
                  {...register("workName", {
                    required: "업무 이름을 입력해주세요",
                  })}
                  className=" input input-bordered w-full border border-[#9E9E9E] rounded-md "
                />
              </div>
              <div className="pb-10">
                <span className="text-xl font-bold">
                  업무 기간 <span className="text-[#FF5724]">*</span>
                </span>
                <div className=" text-[#9E9E9E] pt-2 py-4 grid grid-cols-2 gap-2">
                  <div className="flex flex-col ">
                    <span className="font-bold pl-3 pb-1">시작일</span>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      selected={selectedDate1}
                      onChange={(date) => setSelectedDate1(date)}
                      className="border w-full rounded-md border-[#9E9E9E] p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold pl-3 pb-1">종료일</span>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      selected={selectedDate2}
                      onChange={(date) => setSelectedDate2(date)}
                      className="border w-full rounded-md border-[#9E9E9E] p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn btn-info bg-mainColor text-white ">
                  배송 물품 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
