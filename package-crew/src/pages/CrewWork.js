import React, { useState, useRef, useEffect } from "react";
import Scanner from "../components/Scanner";
import { useNavigate } from "react-router-dom";

export function CrewWork() {
    // QR 코드 스캔 결과 값
    const [decodedValue, setDecodedValue] = useState("");

    // const navigate = useNavigate();

    // 녹화 화면으로 이동
    // const goToRecord = () => {
    //     navigate("/crewRecord");
    // };

    useEffect(() => {
        // QR 코드 스캔 결과 값이 있으면 녹화 화면으로 이동
        if (decodedValue) {
            // goToRecord();
            console.log("녹화화면으로 이동");
        }
    }, [decodedValue]);

    return (
        <div>
            <h1>Webcam QR Code Scanner and Recorder</h1>
            <Scanner type={"QR"} onResult={(res) => setDecodedValue(res)} />
            <br />
            <p style={{ width: "100%", wordWrap: "break-word" }}>
                <strong>Value:</strong>
                {decodedValue}
            </p>{" "}
        </div>
    );
}

export default CrewWork;
