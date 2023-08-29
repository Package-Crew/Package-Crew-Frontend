import React from "react";
import { Link, useLocation } from "react-router-dom";
import tw from "tailwind-styled-components";
import { cls } from "../libs/utils";

const LinkDiv = tw.div` cursor-pointer
`;
const SideBar = () => {
  const location = useLocation();

  return (
    <div className="bg-mainColor h-screen w-80 pl-10 py-5 relative">
      <div className="space-y-4 pb-4">
        <img src="/img/LogoWhite.svg" className="h-7" />
        <hr className="ml-7" />
      </div>
      <div className="space-y-3 text-xl text-[#ADDAFF] font-bold">
        <Link
          to={`/detail/id/dashboard`}
          className={cls(
            "w-full h-full px-10 py-4 flex justify-center rounded-l-xl ",
            location.pathname === "/detail/id/dashboard"
              ? "bg-white text-black"
              : ""
          )}
        >
          대시보드
        </Link>
        <Link
          to={`/detail/id/deliveryItemsCheck`}
          className={cls(
            "w-full h-full px-10 py-4 flex justify-center rounded-l-xl ",
            location.pathname === "/detail/id/deliveryItemsCheck"
              ? "bg-white text-black"
              : ""
          )}
        >
          배송 물품 조회
        </Link>
        <Link
          to={`/detail/id/crewManagement`}
          className={cls(
            "w-full h-full px-10 py-4 flex justify-center rounded-l-xl ",
            location.pathname === "/detail/id/crewManagement"
              ? "bg-white text-black"
              : ""
          )}
        >
          크루 관리
        </Link>
      </div>
      <div className="absolute bottom-10 flex justify-center left-16 text-xl text-[#ADDAFF] font-bold">
        <Link to="/">대시보드 나가기</Link>
      </div>
    </div>
  );
};

export default SideBar;
