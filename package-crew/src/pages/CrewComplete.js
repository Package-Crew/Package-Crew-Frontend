import React from "react";
import { ReactComponent as LgooWhite } from "../../src/images/logo_white.svg";
import { useNavigate } from "react-router-dom";

function CrewComplete() {
    const navigate = useNavigate();
    return (
        <div className=" h-screen bg-mainColor flex flex-col justify-center items-center">
            <div className="text-white font-extrabold text-lg">
                현명한 이커머스 사장님의 효율적인 패키징 관리 솔루션
            </div>
            <LgooWhite className=" w-96 h-24" />
            <div className="text-white mt-10 font-extrabold text-lg">
                업무가 종료되었습니다. 기간 내에는 언제든 다시 접속할 수
                있습니다.
            </div>
            <button
                className="btn btn-wide mt-5 text-mainColor font-bold text-lg"
                onClick={() => {
                    navigate("/crewWork");
                }}
            >
                다시 작업하기
            </button>
        </div>
    );
}

export default CrewComplete;
