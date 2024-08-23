import React from "react";
import "./style/style.css";
import { IoMdClose } from "react-icons/io";

const DeleteCard = ({ onClose, deleteFunction }) => {
  return (
    <>
      <div className="popup">
        <div className="delete-card relative max-w-[600px] min-h-[220px] p-6 bg-white text-black rounded-lg space-y-4">
          <span
            onClick={onClose}
            className="absolute right-4 top-4 cursor-pointer"
          >
            <IoMdClose className="text-2xl text-black" />
          </span>
          <h2 className="text-2xl font-bold">Delete Member Details</h2>
          <p className="text-lg text-[#64748b] font-normal">
            Are you sure want to delete this Member details? This action cannot
            be undone.
          </p>
          <button
            onClick={() => deleteFunction()}
            className="absolute bottom-6 right-6 bg-[#6941C6] text-white text-xl font-medium py-2 px-6 rounded-md tracking-wider uppercase"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteCard;
