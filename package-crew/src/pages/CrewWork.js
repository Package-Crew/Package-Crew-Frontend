import React, { useState, useEffect, useRef } from "react";
import Scanner from "../components/Scanner";
import Webcam from "react-webcam";
import axios from "axios";
import { ReactComponent as LogoWhite } from "../images/logo_white.svg";
import { ReactComponent as LogoBlue } from "../images/logo_blue.svg";
import { useNavigate } from "react-router-dom";

function CrewWork() {
    // QR 코드 스캔 결과 값
    const [decodedValue, setDecodedValue] = useState("");
    const [recording, setRecording] = useState(false);
    const webcamRef = useRef(null);
    // 송장 번호
    // const [trackingNum, setTrackingNum] = useState("");
    const [trackingNum, setTrackingNum] = useState(1);
    // 상품 목록
    // const [itemList, setItemList] = useState([]);
    const [itemList, setItemList] = useState([
        {
            id: 3,
            imageUrl:
                "https://footstepbucket.s3.ap-northeast-2.amazonaws.com/farmate/5c4f9272-62b7-4cf4-94fb-9445636be897_136144968.png",
            itemName: "파란티22",
        },
        {
            id: 4,
            imageUrl:
                "https://footstepbucket.s3.ap-northeast-2.amazonaws.com/farmate/c6feccf5-06a6-42cd-a49e-6dee5fdb962c_136144968.png",
            itemName: "파란티",
        },
    ]);
    // 선택된 상품
    const [selectedItemId, setSelectedItemId] = useState(null);

    // 상품들의 체크 여부
    const [checkedItems, setCheckedItems] = useState(
        itemList.map(() => false) // 초기값은 모두 false로 설정
    );

    // 상품 체크박스 변경
    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    const navigate = useNavigate();

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

    useEffect(() => {
        // QR 코드 스캔 결과 값이 생기면 녹화 시작
        if (decodedValue) {
            setRecording(true);
            // 서버에 query string 으로 decodedValue 전송
            // 상품 목록 받아오기
            // decodedValue 예시 값 1
            // axios
            //     .get(`URL/dangdol/qrscan?trackingNum=1`)
            //     .then((res) => {
            //         setTrackingNum(res.data.trackingNum);
            //         setItemList(res.data.itemList);

            //         console.log(trackingNum);
            //         const itemList = res.data.itemList;
            //         itemList.forEach((item) => {
            //             console.log(item.id);
            //             console.log(item.imageUrl);
            //             console.log(item.itemName);
            //         });
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        }
    }, [decodedValue]);

    // 녹화 중지 및 녹화된 비디오 서버로 전송
    const handleRecordingStop = async () => {
        setRecording(false);
        const screenshot = webcamRef.current.getScreenshot();

        // Base64 문자열을 Blob 객체로 변환
        const byteCharacters = atob(screenshot.split(",")[1]);
        const byteArrays = [];
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
        }
        const videoBlob = new Blob([new Uint8Array(byteArrays)], {
            type: "video/webm",
        });

        const formData = new FormData();
        formData.append("video", videoBlob, "recorded-video.webm");

        try {
            // axios를 사용하여 서버로 녹화된 비디오 전송
            // await axios.post(
            //     // 1은 workerId
            //     `URL/dangdol/packaging/${trackingNum}/1`,
            //     formData
            // );
            console.log("녹화된 비디오가 서버로 전송되었습니다.");
            setDecodedValue("");
            setCheckedItems(itemList.map(() => false));
        } catch (error) {
            console.error("녹화된 비디오 전송 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        // decodedValue가 변경될 때마다 녹화 시작
        if (decodedValue) {
            setRecording(true);
            // 녹화 시작 시 초기화
            setSelectedItemId(null);
        }
    }, [decodedValue]);

    useEffect(() => {
        console.log("selectedItemId", selectedItemId);
    }, [selectedItemId]);

    return (
        <div className="flex h-screen w-full">
            {/* 왼쪽 화면 */}
            {recording ? (
                // 녹화중인 경우의 화면, 체크할 상품 목록
                <div className="bg-white border w-2/5 flex flex-col">
                    <div className="flex flex-col justify-center pl-12 mb-5">
                        <LogoBlue className=" w-48 h-8 my-3" />
                        <div className="text-2xl font-bold mb-3">
                            {trackingNum}
                        </div>
                        <div className="text-lg font-bold">상품 목록</div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-base-200">
                                <tr>
                                    <th></th>
                                    <th className="text-lg font-semibold">
                                        확인
                                    </th>
                                    <th className="text-lg font-semibold">
                                        상품 아이디
                                    </th>
                                    <th className="text-lg font-semibold">
                                        상품 이름
                                    </th>
                                    <th className="text-lg font-semibold flex justify-center">
                                        사진
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemList.map((item, index) => (
                                    <tr>
                                        <th></th>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={checkedItems[index]}
                                                className="checkbox checkbox-primary"
                                                onChange={() =>
                                                    handleCheckboxChange(index)
                                                } // 체크박스 변경 핸들러
                                            />
                                        </td>
                                        <td>{item.id}</td>
                                        <td>{item.itemName}</td>
                                        <td>
                                            <label
                                                htmlFor="my_modal_6"
                                                className="btn flex justify-center"
                                                onClick={() => {
                                                    setSelectedItemId(item.id);
                                                }}
                                            >
                                                보기
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col justify-center items-center mt-auto mb-4">
                        <button className="btn btn-wide btn-error border-none text-white mb-4">
                            문제 상황 발생
                        </button>
                        <button
                            className={`complete-btn btn btn-wide border-none ${
                                checkedItems.every((isChecked) => isChecked)
                                    ? "bg-mainColor text-white"
                                    : "bg-gray-300 text-white"
                            }`}
                            onClick={() => handleRecordingStop()}
                        >
                            패키징 완료
                        </button>
                    </div>
                    {selectedItemId !== null && (
                        <>
                            <input
                                type="checkbox"
                                id="my_modal_6"
                                className="modal-toggle"
                            />
                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">
                                        {/* selectedItem 의 itemName */}
                                        {
                                            itemList.find(
                                                (item) =>
                                                    item.id === selectedItemId
                                            )?.itemName
                                        }
                                    </h3>
                                    <p className="py-4">
                                        {
                                            itemList.find(
                                                (item) =>
                                                    item.id === selectedItemId
                                            )?.id
                                        }
                                    </p>
                                    <img
                                        src={
                                            itemList.find(
                                                (item) =>
                                                    item.id === selectedItemId
                                            )?.imageUrl
                                        }
                                        alt="상품 사진"
                                    />
                                    <div className="modal-action">
                                        <label
                                            htmlFor="my_modal_6"
                                            className="btn"
                                        >
                                            닫기
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                // 스캐너 화면과 메뉴 화면
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
                    <button className="btn w-48 mx-auto mt-auto bg-mainColor border-none text-white">
                        업무 종료
                    </button>
                    {recording && (
                        <button
                            className="bg-red-500 text-white py-2 px-4 mt-4 rounded"
                            onClick={handleRecordingStop}
                        >
                            녹화 중지 및 전송
                        </button>
                    )}
                </div>
            )}

            {/* 오른쪽 화면 */}
            {recording ? (
                // 웹캠 녹화 화면
                <div className="flex justify-center items-center w-full">
                    <Webcam className="w-full" ref={webcamRef} />
                </div>
            ) : (
                // QR 코드 스캐너
                <div className="flex justify-center items-center w-full">
                    <Scanner
                        type={"QR"}
                        onResult={(res) => setDecodedValue(res)}
                    />
                </div>
            )}
        </div>
    );
}

export default CrewWork;
