import React from "react";
import "./style/style.css";
import { RxDashboard } from "react-icons/rx";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <section className="dashboard-container flex">
        <nav className="side-nav h-full min-w-[240px] px-6 pt-8">
          <ul className="space-y-4">
            <li className="flex items-center text-[#6941C6] text-[16px] font-semibold cursor-pointer">
              <span className="bg-[#6941C6] text-white mr-2 p-1 rounded-md">
                <RxDashboard className="text-base" />
              </span>
              <Link to="welcome">Overview</Link>
            </li>

            <li className="flex items-center text-[16px] font-semibold cursor-pointer">
              <span className="bg-[#1E1E1E] text-white mr-2 p-1 rounded-md">
                <RxDashboard className="text-base" />
              </span>
              <Link to="table">People Directory</Link>
            </li>
          </ul>
        </nav>
        <div className="content-show m-4 border rounded-xl">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
