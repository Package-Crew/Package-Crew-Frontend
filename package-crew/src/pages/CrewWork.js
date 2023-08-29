import React, { useState, useEffect, useRef } from "react";
import Scanner from "../components/Scanner";
import Webcam from "react-webcam";
import axios from "axios";

function CrewWork() {
    // QR 코드 스캔 결과 값
    const [decodedValue, setDecodedValue] = useState("");
    const [recording, setRecording] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const webcamRef = useRef(null);

    useEffect(() => {
        // QR 코드 스캔 결과 값이 있으면 녹화 시작
        if (decodedValue) {
            setRecording(true);
        }
    }, [decodedValue]);

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
            await axios.post("서버 엔드포인트 URL", formData);
            console.log("녹화된 비디오가 서버로 전송되었습니다.");
        } catch (error) {
            console.error("녹화된 비디오 전송 중 오류 발생:", error);
        }
    };

    return (
        <div className="flex h-screen w-full">
            <div className=" bg-mainColor w-96 flex flex-col">
                <div className="flex justify-center">Package Crew</div>
                <div className="join join-vertical">
                    <button className="btn border-none mx-2 bg-mainColor ">
                        송장번호 스캔
                    </button>
                    <button className="btn border-none mx-2 bg-mainColor ">
                        진행상황 조회
                    </button>
                    <button className="btn border-none mx-2 bg-mainColor ">
                        전체 진행 상황 조회
                    </button>
                </div>
            </div>
            {recording ? (
                // 웹캠 녹화 화면
                <div className="flex justify-center items-center w-full">
                    <Webcam ref={webcamRef} />
                    <button
                        className="bg-red-500 text-white py-2 px-4 mt-4 rounded"
                        onClick={handleRecordingStop}
                    >
                        녹화 중지 및 전송
                    </button>
                </div>
            ) : (
                // QR 코드 스캐너
                <div className="flex justify-center items-center w-full">
                    {/* <Scanner
                        type={"QR"}
                        onResult={(res) => setDecodedValue(res)}
                    /> */}
                </div>
            )}
        </div>
    );
}

export default CrewWork;
