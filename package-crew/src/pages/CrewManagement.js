import React, { useEffect, useState } from "react";
import { cls } from "../libs/utils";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilState } from "recoil";
import { workIdState } from "../atom/exampleState";

const CrewManagement = () => {
  const [index, setIndex] = useState(0);
  const [isClickCrew, setIsClickCrew] = useState(false);
  const [crewIndex, setCrewIndex] = useState(0);
  const [isClickNewCrew, setIsClickNewCrew] = useState(false);

  const [workId, setWorkId] = useRecoilState(workIdState);

  const [workerId, setWorkerId] = useState();
  const [workers, setWorkers] = useState([
    {
      id: 8,
      memo: "김철수",
      clear: 3, //완료된 개수
    },
    {
      id: 11,
      memo: "김철수2",
      clear: 1,
    },
  ]);

  const [workerNums, setWorkersNums] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const onValid = (data) => {
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/dangdol/worker/${workId}`, {
        memo: data.crewMemo,
      })
      .then((res) => {
        console.log(res);
        const newCrew = {
          id: res.data.workerId,
          memo: data.crewMemo,
          clear: 0,
        };

        setWorkers([...workers, newCrew]);
        setIsClickNewCrew(false);
        reset();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/dangdol/worker/all/${workId}`)
      .then((res) => {
        console.log(res);
        setWorkers(res.data.allWorkerList);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (isClickCrew) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/dangdol/delivery/all/${workerId}`
        )
        .then((res) => {
          console.log(res);
          setWorkersNums(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isClickCrew]);
  return (
    <div className="pt-4">
      <div className="flex justify-end pb-3">
        <button
          onClick={() => {
            setIsClickNewCrew(true);
          }}
          className="flex items-center text-lg btn btn-info bg-mainColor text-white px-8"
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
          크루추가
        </button>
      </div>

      <table className="table table-zebra">
        <thead className="text-center text-gray-400">
          <tr className="bg-base-200 text-base">
            <th>크루 아이디</th>
            <th>크루 URL</th>
            <th>메모</th>
            <th>완료 건수</th>
            <th>작업 내용</th>
          </tr>
        </thead>
        <tbody className="text-center text-black text-base">
          {workers.slice(10 * index, 10 * index + 10).map((w, i) => (
            <tr
              key={i}
              className="hover:bg-gray-300 transition-all cursor-pointer "
              onClick={() => {
                setIsClickCrew(true);
                setWorkerId(w.id);
              }}
            >
              <td>{w.id}</td>
              <td>{`https://package-crew-frontend.vercel.app/crewWork/${w.id}`}</td>
              <td>{w.memo}</td>
              <td>{w.clear}</td>
              <td className="text-mainColor hover:underline">확인하기</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isClickCrew ? (
        <div className="w-screen left-0 fixed  flex justify-center">
          <div
            className="fixed top-0 right-0 w-screen h-screen bg-black opacity-20"
            onClick={() => setIsClickCrew(false)}
          />
          <div className="fixed top-20  bg-white rounded-xl p-5 w-1/3">
            <div className="flex items-center justify-between">
              <div className="flex-1" />
              <div
                className="hover:bg-gray-300 transition-all rounded-full p-2"
                onClick={() => setIsClickCrew(false)}
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
            <div className="overflow-x-auto text-center h-[572px]">
              <table className="table ">
                <thead className="bg-[#F4F4F4] text-black text-xl text-center">
                  <tr>
                    <th>송장 번호</th>
                    <th>상품 번호</th>
                    <th>작업 상황</th>
                  </tr>
                </thead>
                <tbody className="text-center text-black  text-xl">
                  {workerNums
                    .slice(10 * crewIndex, 10 * crewIndex + 10)
                    .map((w, i) => (
                      <tr>
                        <td>{w.trackingNum}</td>
                        <td>{w.items[0].id}</td>
                        <td className="font-normal">
                          {w.done === 1 ? "완료" : "진행중"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center space-x-2 py-3 ">
              {[0, 1].map((i) => (
                <span
                  onClick={() => setCrewIndex(i)}
                  className={cls(
                    i === crewIndex ? "text-mainColor" : "text-[#D9D9D9]",
                    "font-bold"
                  )}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {isClickNewCrew ? (
        <div className="w-screen left-0 fixed  flex justify-center">
          <div
            className="fixed top-0 right-0 w-screen h-screen bg-black opacity-20"
            onClick={() => setIsClickNewCrew(false)}
          />
          <div className="fixed top-40  bg-white rounded-xl p-5 w-1/3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xl">크루 추가</div>
              <div
                className="hover:bg-gray-300 transition-all rounded-full p-2"
                onClick={() => setIsClickNewCrew(false)}
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
            <form onSubmit={handleSubmit(onValid)}>
              <div className="flex flex-col">
                <span className="font-bold py-3">
                  크루 메모<span className="text-[#FF5724]">*</span>
                </span>
                <input
                  {...register("crewMemo", {
                    required: "크루를 추가해주세요!",
                  })}
                  placeholder="메모를 작성하세요"
                  className="input pl-3  input-bordered w-full"
                />
                <span className="text-xs text-gray-400 pt-1">
                  해당 크루를 식별할 수 있는 메모를 작성해주세요.
                </span>
              </div>
              <div className="pt-7 flex justify-end">
                <button className="btn btn-info bg-mainColor text-white px-10">
                  크루 추가
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CrewManagement;
