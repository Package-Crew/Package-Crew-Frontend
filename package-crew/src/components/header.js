// header
import React from "react";

import { Link, useLocation } from "react-router-dom";
import { cls } from "../libs/utils";

const Header = () => {
  const location = useLocation();

  return (
    <div className="flex items-center justify-between py-5 px-3  text-base font-bold">
      <div className="flex justify-around items-center space-x-10">
        <Link to="/">
          <img src="/img/Logo.svg" className="h-7" />
        </Link>
        <Link
          to="/"
          className={cls(location.pathname === "/" ? "text-mainColor" : "")}
        >
          업무
        </Link>
        <Link
          to="/item"
          className={cls(location.pathname === "/item" ? "text-mainColor" : "")}
        >
          상품등록
        </Link>
      </div>
      <div className="flex items-center space-x-1">
        <img src="/img/company.svg" />
        <span className="pt-1">당돌컴퍼니</span>
      </div>
    </div>
  );
};

export default Header;
