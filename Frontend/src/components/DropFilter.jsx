import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const DropFilter = ({ onClose }) => {
  const [showRoles, setShowRoles] = useState(false);
  const [showTeams, setShowTeams] = useState(false);

  return (
    <div className="w-56 bg-white p-1 rounded shadow z-10">
      <h3 className="text-lg font-normal px-4 py-2">Filters</h3>

      {/* Roles Section */}
      <div className="px-4">
        <button
          className="flex justify-between items-center w-full mt-4"
          onClick={() => setShowRoles(!showRoles)}
        >
          <span>Roles</span>
          <span>{showRoles ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </button>
        {showRoles && (
          <div className="ml-6 mt-2">
            <label>
              <input type="checkbox" /> Product Designer
            </label>
            <label className="block">
              <input type="checkbox" /> Product Manager
            </label>
            <label className="block">
              <input type="checkbox" /> Frontend Developer
            </label>
            <label className="block">
              <input type="checkbox" /> Backend Developer
            </label>
          </div>
        )}
      </div>

      {/* Teams Section */}
      <div className="px-4">
        <button
          className="flex justify-between items-center w-full mt-4"
          onClick={() => setShowTeams(!showTeams)}
        >
          <span>Teams</span>
          <span>{showTeams ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </button>
        {showTeams && (
          <div className="ml-6 mt-2">
            <label>
              <input type="checkbox" /> Design
            </label>
            <label className="block">
              <input type="checkbox" /> Product
            </label>
            <label className="block">
              <input type="checkbox" /> Marketing
            </label>
            <label className="block">
              <input type="checkbox" /> Technology
            </label>
          </div>
        )}
      </div>

      <button
        onClick={onClose}
        className="w-full bg-[#6941C6] text-white py-2 mt-4 rounded"
      >
        SELECT
      </button>
    </div>
  );
};

export default DropFilter;
