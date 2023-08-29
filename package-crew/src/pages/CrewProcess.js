import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoWhite } from "../images/logo_white.svg";
import axios from "axios";

function CrewProcess() {
    const navigate = useNavigate();

    const [workName, setWorkName] = useState("블랙 프라이데이 컨버스 아울렛");
    const [startDate, setStartDate] = useState("2023-08-29");
    const [endDate, setEndDate] = useState("2023-09-01");
    const [deliveryResponseDtos, setDeliveryResponseDtos] =
        useState(exampleData);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = deliveryResponseDtos.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const pageNumbers = [];
    for (
        let i = 1;
        i <= Math.ceil(deliveryResponseDtos.length / itemsPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

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
    // useEffect(() => {
    //     axios
    //         .get(`URL/dangdol/qrscan?trackingNum=1`)
    //         .then((res) => {
    //             setWorkName(res.data.workName);
    //             setStartDate(res.data.startDate);
    //             setEndDate(res.data.endDate);
    //             setDeliveryResponseDtos(res.data.deliveryResponseDtos);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    useEffect(() => {
        console.log("currentItems", currentItems);
        console.log("currentPage", currentPage);
    }, [currentItems, currentPage]);

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
                {/* 타이틀 */}
                <div className="h-1/6">
                    <div className=" text-3xl font-extrabold mr-auto pl-24 mt-10">
                        {workName}
                    </div>
                    <div className=" text-lg text-gray-400 mr-auto pl-24 mt-3">
                        {startDate} ~ {endDate}
                    </div>
                </div>
                {/* 테이블 */}
                <div className="flex flex-col justify-start items-center w-full h-4/6 ">
                    <div className="overflow-x-auto w-full px-24">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className=" bg-base-200">
                                    <th className="text-base ">송장 번호</th>
                                    <th className="text-base ">상품 번호</th>
                                    <th className="text-base ">작업자</th>
                                    <th className="text-base ">작업 상황</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <th>{item.trackingNum}</th>
                                        <td>
                                            {item.itemList[0].id}
                                            {item.itemList.length > 1 ? (
                                                <>
                                                    {" "}
                                                    외{" "}
                                                    {item.itemList.length -
                                                        1}{" "}
                                                    개
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </td>
                                        <td>{item.workerId}</td>
                                        <td className="text-mainColor">
                                            {item.done === 1
                                                ? "완료"
                                                : "미완료"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>{" "}
                </div>{" "}
                {/* 페이징 버튼 */}
                <div className="join  h-1/6 flex justify-center">
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            className={`join-item btn ${
                                number === currentPage ? "btn-active" : ""
                            }`}
                            onClick={() => setCurrentPage(number)}
                        >
                            {number}
                        </button>
                    ))}
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

export default CrewProcess;
