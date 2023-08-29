import { Html5Qrcode } from "html5-qrcode";
import React, { useEffect, useState, useRef } from "react";
// import { getCameraList } from "./Utils";

const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } };
let html5QrCode;

// function startCamera(){}

export const Scanner = (props) => {
    const fileRef = useRef(null);
    const [cameraList, setCameraList] = useState([]);
    const [activeCamera, setActiveCamera] = useState();

    useEffect(() => {
        html5QrCode = new Html5Qrcode("reader");
        getCameras();
        const oldRegion = document.getElementById("qr-shaded-region");
        oldRegion && oldRegion.remove();

        // Start the scanner automatically when the component mounts
        handleClickAdvanced();
    }, []);

    const handleClickAdvanced = () => {
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            console.info(decodedResult, decodedText);
            props.onResult(decodedText);
            // alert(`decoded:__ ${decodedText}`);
            handleStop();
        };
        html5QrCode
            .start(
                { facingMode: "environment" },
                props.type === "QR" ? qrConfig : brConfig,
                qrCodeSuccessCallback
            )
            .then(() => {
                // const oldRegion = document.getElementById("qr-shaded-region");
                // if (oldRegion) oldRegion.innerHTML = "";
            });
    };
    const getCameras = () => {
        Html5Qrcode.getCameras()
            .then((devices) => {
                console.info(devices);
                if (devices && devices.length) {
                    setCameraList(devices);
                    setActiveCamera(devices[0]);
                }
            })
            .catch((err) => {
                console.error(err);
                setCameraList([]);
            });
    };
    const onCameraChange = (e) => {
        if (e.target.selectedIndex) {
            let selectedCamera = e.target.options[e.target.selectedIndex];
            console.info(selectedCamera);
            let cameraId = selectedCamera.dataset.key;
            setActiveCamera(cameraList.find((cam) => cam.id === cameraId));
        }
    };
    const handleStop = () => {
        try {
            html5QrCode
                .stop()
                .then((res) => {
                    html5QrCode.clear();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <div id="reader" width="600px"></div>
            <div className=" text-2xl flex justify-center">
                QR 코드를 스캔해주세요.
            </div>
            {/* 카메라 설정 */}
            <div className=" mt-20">
                <button className="btn" onClick={getCameras}>
                    Get List of cameras
                </button>
                {cameraList.length > 0 && (
                    <select
                        className="select select-bordered w-full max-w-xs mt-3"
                        onChange={onCameraChange}
                    >
                        {cameraList.map((li) => (
                            <option
                                key={li.id}
                                id={li.id}
                                selected={
                                    activeCamera && activeCamera.id === li.id
                                }
                            >
                                {li.label}
                            </option>
                        ))}
                        <option>Dummy</option>
                    </select>
                )}
                <button
                    className="hidden"
                    onClick={() => handleClickAdvanced()}
                >
                    click pro {props.type}
                </button>
                <button className="hidden" onClick={() => handleStop()}>
                    stop pro
                </button>
            </div>
        </div>
    );
};

export default Scanner;
