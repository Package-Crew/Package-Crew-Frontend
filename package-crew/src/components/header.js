// header
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between py-5 px-3  text-base font-bold">
      <div className="flex justify-around space-x-10">
        <Link>패키지 크루 로고</Link>
        <Link>업무</Link>
        <Link>상품등록</Link>
      </div>
      <div className="">당돌컴퍼니</div>
    </div>
  );
};

export default Header;
