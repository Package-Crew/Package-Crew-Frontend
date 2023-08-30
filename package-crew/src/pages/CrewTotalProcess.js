import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoWhite } from "../images/logo_white.svg";
import axios from "axios";
import tw from "tailwind-styled-components";

import { PieChart } from "react-minimal-pie-chart";

const ItemBox = tw.div`
 rounded-md  p-6 flex items-center justify-between transition-all cursor-pointer dropdown 
`;

const ExtraText = tw.span`
font-bold text-xl
`;

function CrewTotalProcess() {
    const navigate = useNavigate();
    const [totalData, setTotalData] = useState({
        workName: "블랙 프라이데이 컨버스 아울렛",
        startDate: "2023-08-29",
        endDate: "2023-09-01",
        total: 100,
        clear: 10,
        limit: 27, // 남은 시간
        avg: 10, //퍼센트
        my: 30, //내가 작업한 개수
        myPercent: 33, //내가 작업한 퍼센트
        myTotal: 330, // 앞으로 할 것 같은 양
    });

    const [trackingNum, setTrackingNum] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [deliveryResponseDtos, setDeliveryResponseDtos] =
        useState(exampleData);

    // 송장번호 스캔 페이지로 이동
    const goToCrewWork = () => {
        navigate("/crewWork");
    };

    //  진행 상황 조회 페이지로 이동
    const goToCrewProcess = () => {
        navigate("/crewProcess");
    };

    // 전체 진행 상황 조회 페이지로 이동
    const goToCrewTotalProcess = () => {
        navigate("/crewTotalProcess");
    };

    const goToCrewComplete = () => {
        navigate("/crewComplete");
    };

    // 페이지가 로드되면 데이터 불러오기
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/dangdol/process/all?workerId=6`
            )
            .then((res) => {
                setTotalData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="flex h-screen">
            {" "}
            <div className=" bg-mainColor w-96 flex flex-col">
                <div className="flex justify-center">
                    <LogoWhite className=" w-48 h-8 my-3" />
                </div>
                <div className="flex flex-col items-end">
                    <button
                        className={`border-none font-bold rounded-tl-lg rounded-bl-lg w-48 py-4 text-lg flex justify-center ${
                            window.location.pathname === "/crewWork"
                                ? "bg-white text-black "
                                : "bg-mainColor text-white"
                        }`}
                        onClick={goToCrewWork}
                    >
                        송장번호 스캔
                    </button>
                    <button
                        className={`border-none text-black font-bold rounded-tl-lg rounded-bl-lg w-48 py-4 text-lg flex justify-center ${
                            window.location.pathname === "/crewProcess"
                                ? "bg-white text-black "
                                : "bg-mainColor text-white"
                        }`}
                        onClick={goToCrewProcess}
                    >
                        {" "}
                        진행상황 조회
                    </button>
                    <button
                        className={`border-none text-black font-bold rounded-tl-lg rounded-bl-lg w-48 py-4 text-lg flex justify-center ${
                            window.location.pathname === "/crewTotalProcess"
                                ? "bg-white text-black "
                                : "bg-mainColor text-white"
                        }`}
                        onClick={goToCrewTotalProcess}
                    >
                        {" "}
                        전체 진행 상황 조회
                    </button>
                </div>
                <button
                    className="btn w-48 mx-auto mt-auto mb-7 bg-mainColor border-none text-white"
                    onClick={() => {
                        goToCrewComplete();
                    }}
                >
                    업무 종료
                </button>
            </div>
            {/* 오른쪽 화면 */}
            <div className="flex flex-col w-full">
                <div className="h-1/6">
                    <div className=" text-3xl font-extrabold mr-auto pl-24 mt-10">
                        {totalData.workName}
                    </div>
                    <div className=" text-lg text-gray-400 mr-auto pl-24 mt-3">
                        {totalData.startDate} ~ {totalData.endDate}
                    </div>
                </div>
                <div className=" px-24 h-5/6 ">
                    <div className="pt-5 pb-10 space-y-4">
                        <ExtraText>DashBoard</ExtraText>
                        <div className="grid grid-cols-3 gap-7">
                            <ItemBox className="bg-mainColor">
                                <div className="text-white flex flex-col">
                                    <span className="font-bold text-6xl">
                                        {totalData.total}
                                    </span>
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
                                    <span className="font-bold text-6xl">
                                        {totalData.clear}
                                    </span>
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
                                    <span className="font-bold text-6xl">
                                        {totalData.limit}
                                    </span>
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

                    <div className="flex justify-center space-x-7">
                        <div className="space-y-4">
                            <ExtraText>전체 진행률</ExtraText>
                            <div className="bg-[#37CDBE] pt-5 pb-20 px-16 rounded-md relative flex justify-center">
                                <div className="bg-white rounded-full w-64 h-64 p-4">
                                    <PieChart
                                        data={[
                                            {
                                                title: "One",
                                                value: totalData.avg,
                                                color: "#37CDBE",
                                            },
                                            {
                                                title: "Two",
                                                value: 100 - totalData.avg,
                                                color: "white",
                                            },
                                        ]}
                                        lineWidth={20}
                                        startAngle={270}
                                        animate
                                    />
                                    <div className="font-bold absolute top-32 left-32 text-6xl text-[#37CDBE]">
                                        {totalData.avg}%
                                    </div>
                                    <div className="font-bold text-3xl absolute bottom-6 left-[140px] text-white">
                                        {totalData.clear}/{totalData.total}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 내가 진행한 작업 */}
                        <div className="space-y-4">
                            <ExtraText>내가 진행한 작업</ExtraText>
                            <div className="bg-[#B1A582] pt-5 pb-20 px-8 pr-52 rounded-md relative flex justify-center">
                                <div className="bg-white rounded-full w-48 h-48 p-4">
                                    <PieChart
                                        data={[
                                            {
                                                title: "One",
                                                value: 100,
                                                color: "#B1A582",
                                            },
                                            {
                                                title: "Two",
                                                value: 900,
                                                color: "white",
                                            },
                                        ]}
                                        lineWidth={20}
                                        startAngle={270}
                                        animate
                                    />
                                    <div className="font-bold absolute top-24 left-20 text-6xl text-[#B1A582]">
                                        {totalData.avg}%
                                    </div>
                                    <div className="font-bold text-3xl absolute bottom-6 left-[70px] text-white">
                                        {totalData.my}/{totalData.total}
                                    </div>
                                </div>
                                <div className="pr-24">
                                    <div className="font-bold absolute top-12 left-64 text-6xl text-[#FFFFFF]">
                                        {totalData.myPercent}%
                                    </div>
                                    <div className="font-bold absolute top-28 left-64 text-base text-[#FFFFFF]">
                                        현재 진행된 작업 중 <br />내 작업이
                                        차지하는 비율
                                    </div>
                                    <div className="font-bold absolute top-40 left-64 text-6xl text-[#FFFFFF]">
                                        {totalData.myTotal}
                                    </div>
                                    <div className="font-bold absolute top-56 left-64 text-base text-[#FFFFFF]">
                                        현재 비율만큼 작업을 진행한다면 <br />
                                        최종적인 작업물의 양
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const exampleData = [
    {
        trackingNum: 333,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 2,
            },
            {
                id: 3,
            },
        ],
    },
    {
        trackingNum: 334,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 22,
            },
            {
                id: 33,
            },
        ],
    },
    {
        trackingNum: 335,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 222,
            },
            {
                id: 333,
            },
        ],
    },
    {
        trackingNum: 336,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 2222,
            },
            {
                id: 3333,
            },
        ],
    },
    {
        trackingNum: 336,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 2222,
            },
            {
                id: 3333,
            },
        ],
    },
    {
        trackingNum: 336,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 2222,
            },
            {
                id: 3333,
            },
        ],
    },
    {
        trackingNum: 13461,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 1234,
            },
            {
                id: 1235,
            },
        ],
    },
    {
        trackingNum: 13461,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 1234,
            },
            {
                id: 1235,
            },
        ],
    },
    {
        trackingNum: 13461,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 1234,
            },
            {
                id: 1235,
            },
        ],
    },
    {
        trackingNum: 13461,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 1234,
            },
            {
                id: 1235,
            },
        ],
    },
    {
        trackingNum: 13461,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 1234,
            },
            {
                id: 1235,
            },
        ],
    },
    {
        trackingNum: 13461,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 1234,
            },
            {
                id: 1235,
            },
        ],
    },
    {
        trackingNum: 13461,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 1234,
            },
            {
                id: 1235,
            },
        ],
    },
    {
        trackingNum: 13461,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 1234,
            },
            {
                id: 1235,
            },
        ],
    },
    {
        trackingNum: 13461,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 1234,
            },
            {
                id: 1235,
            },
        ],
    },
    {
        trackingNum: 8765,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 876,
            },
            {
                id: 54,
            },
        ],
    },
    {
        trackingNum: 8765,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 876,
            },
            {
                id: 54,
            },
        ],
    },
    {
        trackingNum: 8765,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 876,
            },
            {
                id: 54,
            },
        ],
    },
    {
        trackingNum: 8765,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 876,
            },
            {
                id: 54,
            },
        ],
    },
    {
        trackingNum: 8765,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 876,
            },
            {
                id: 54,
            },
        ],
    },
    {
        trackingNum: 8765,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 876,
            },
            {
                id: 54,
            },
        ],
    },
    {
        trackingNum: 8765,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 876,
            },
            {
                id: 54,
            },
        ],
    },
    {
        trackingNum: 8765,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 876,
            },
            {
                id: 54,
            },
        ],
    },
    {
        trackingNum: 8765,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 876,
            },
            {
                id: 54,
            },
        ],
    },
    {
        trackingNum: 8765,
        workerId: 3,
        done: 1, // 0: 완료 안됨, 1: 완료
        itemList: [
            {
                id: 876,
            },
            {
                id: 54,
            },
        ],
    },
];

export default CrewTotalProcess;
