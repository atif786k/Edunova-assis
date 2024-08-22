import React from "react";
import "./style/style.css";
import { IoNotificationsOutline } from "react-icons/io5";

const NavBar = () => {
  return (
    <>
      <nav className="h-[88px] flex justify-between items-center px-6 border-b-[1px]">
        <h1 className="text-[#6941C6] text-[38px] font-bold leading-[47.5px] uppercase">People.co</h1>
        <div className="flex items-center space-x-2">
          <IoNotificationsOutline className="text-[20px]"/>
          <figure className="h-[45px] w-[45px] rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="/images/profileImg.jpg"
                alt=""
                className="scale-150"
              />
            </figure>
          <span className="text-[#0F172A] text-base leading-5 font-normal">Jane Doe</span>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
