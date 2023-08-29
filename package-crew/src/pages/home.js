
// Home
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { cls } from "../libs/utils";

const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth + 10 : -window.outerWidth - 10,
  }),
};

const Circle = tw.div`
    h-3 w-3 bg-[#D9D9D9] rounded-full 
`;
const Home = () => {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [worksIndex, setWorksIndex] = useState(0);
  const [finishIndex, setFinishIndex] = useState(0);
  const [isNowWork, setIsNowWork] = useState(true);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <div className="text-base">
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
        <div className="flex justify-between items-center text-[#9E9E9E]">
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
          <button className="flex items-center btn btn-info bg-mainColor text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
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
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                  .slice(5 * worksIndex, 5 * worksIndex + 5)
                  .map((i) => (
                    <div className="flex justify-between p-3 bg-[#F8F8F8]">
                      <div className="flex flex-col ">
                        <span className="font-bold">
                          블랙 프라이데이 현재 업무 {i}
                        </span>
                        <span>2023.08.29 ~ 2023.08.31</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold">
                          총 1000개 품목 중 300개 완료(30%)
                        </span>
                        <div className="border-mainColor p-4 rounded-xl border text-mainColor font-bold">
                          5명
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="space-x-2 flex justify-center">
                {[0, 1].map((i) => (
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
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                  .slice(5 * finishIndex, 5 * finishIndex + 5)
                  .map((i) => (
                    <div className="flex justify-between p-3 bg-[#F8F8F8] text-[#9E9E9E]">
                      <div className="flex flex-col ">
                        <span className="font-bold">
                          블랙 프라이데이 이전 업무 {i}
                        </span>
                        <span>2023.08.29 ~ 2023.08.31</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold">
                          총 1000개 품목 중 300개 완료(30%)
                        </span>
                        <div className="border-mainColor p-4 rounded-xl border text-mainColor font-bold">
                          5명
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <div className="space-x-2 flex justify-center">
                  {[0, 1].map((i) => (
                    <span
                      onClick={() => {
                        setFinishIndex(i);
                      }}
                      className={cls(
                        i === finishIndex ? "text-mainColor" : "text-[#D9D9D9]",
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
    </div>
  );
};

export default Home;
