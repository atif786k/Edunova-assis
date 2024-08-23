import React from "react";
import "./style/style.css";
import { IoMdClose } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";

const DetailCard = ({ member, onClose }) => {
  return (
    <>
      <div className="popup-inLeft">
        <div className="detail-card relative mr-5 pb-24 bg-white text-black min-h-[80%] w-[650px] rounded-xl overflow-hidden">
          <span
            onClick={onClose}
            className="absolute right-4 top-4 cursor-pointer"
          >
            <IoMdClose className="text-3xl text-white" />
          </span>

          <div className="first-div bg-[#2a5b7e] text-white flex items-center py-6 px-10 space-x-10">
            <figure className="h-[100px] w-[100px] rounded-full overflow-hidden">
              <img src={member.avatar} alt="" className="w-[100px] h-[100px]" />
            </figure>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">{member.username}</h2>
              <div className="flex">
                <div className="flex flex-col border-r pr-4">
                  <span className="text-md font-medium">User ID</span>
                  <span className="text-md font-normal text-gray-300">
                    @{member.username}
                  </span>
                </div>
                <div className="flex flex-col border-l pl-4">
                  <span className="text-md font-medium">Role</span>
                  <span className="text-md font-normal text-gray-300 capitalize">
                    {member.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="second-div mt-3 px-6">
            <h4 className="bg-[#f8fafc] border-2 border-[#dee5ec] rounded-[4px] py-1 px-4 font-semibold text-[16px]">
              Personal Information
            </h4>
            <ul className="mt-2 px-4">
              <li className="flex justify-between items-center py-2 border-b border-[#dee5ec] text-[14px]">
                <span className="font-semibold">Team</span>
                <span>
                  {member.teams.map((team) => {
                    return (
                      <span key={team} className="text-[#64748b]">
                        {team},
                      </span>
                    );
                  })}
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-[#dee5ec] text-[14px]">
                <span className="font-semibold">Gender</span>
                <span className="text-[#64748b]">Unknown</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-[#dee5ec] text-[14px]">
                <span className="font-semibold">Nationality</span>
                <span className="text-[#64748b]">Unknown</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-[#dee5ec] text-[14px]">
                <span className="font-semibold">Contact no.</span>
                <span className="text-[#64748b]">1234567890</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-[#dee5ec] text-[14px]">
                <span className="font-semibold">Email Address</span>
                <span className="text-[#64748b]">{member.email}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-[#dee5ec] text-[14px]">
                <span className="font-semibold">Work email address</span>
                <span className="text-[#64748b]">{member.email}</span>
              </li>
            </ul>
          </div>

          <div className="third-div mt-3 px-6">
            <h4 className="bg-[#f8fafc] border-2 border-[#dee5ec] rounded-[4px] py-1 px-4 font-semibold text-[16px]">
              Research & Publication
            </h4>
            <div className="mt-2 space-y-2 px-4">
              <h5 className="text-[14px] font-semibold">
                AI and User Experience: The Future of Design
              </h5>
              <h6 className="text-[14px] font-normal">
                Published in the Journal of Modern Design • 2022
              </h6>
              <p className="text-[14px] font-normal">
                AI, IoT based real time condition monitoring of Electrical
                Machines using Python language Abstract: Maintaining induction
                motors in good working order before they fail benefits small
                <span className="ml-2 text-[#F15A22]">See More...</span>{" "}
              </p>
              <h2 className="flex items-center text-[#F15A22] text-lg font-semibold uppercase border-b py-2">
                <MdArrowOutward className="text-xl mr-2" />
                SEE PUBLICATION
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
