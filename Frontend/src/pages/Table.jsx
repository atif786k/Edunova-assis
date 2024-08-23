import React, { useState, useEffect, useMemo } from "react";
import "./style/style.css";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { CiFilter, CiSearch } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { IoArrowDownSharp } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import AddCard from "../components/AddCard";
import DetailCard from "../components/DetailCard";
import DeleteCard from "../components/DeleteCard";
import DropFilter from "../components/DropFilter";
import EditCard from "../components/EditCard";

const Table = () => {
  const [addCardPop, setAddCardPop] = useState(false);
  const [deleteCardPop, setDeleteCardPop] = useState(false);
  const [editCardPop, setEditCardPop] = useState(false);
  const [editMemberDetail, setEditMemberDetail] = useState(null);
  const [singleSelectedData, setSingleSelectedData] = useState(null);
  const [deleteMemberID, setDeleteMemberID] = useState(null);
  const [filterDrop, setFilterDrop] = useState(false);

  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("query") || "";
  });

  const generateData = () => {
    return [...Array(20)].map(() => ({
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      role: faker.helpers.arrayElement([
        "Product Designer",
        "Product Manager",
        "Frontend Developer",
        "FullStack Developer",
        "UI Designer",
        "UX Designer",
      ]),
      status: faker.helpers.arrayElement(["Active"]),
      teams: ["Design", "Product", "Marketing"],
    }));
  };

  const [data, setData] = useState(generateData());

  const tableData = useMemo(() => {
    // Filter data based on the search query
    return data.filter(
      (item) =>
        item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
    {
      header: (
        <span className="flex items-center">
          Name
          <IoArrowDownSharp className="ml-2 text-gray-400" />
        </span>
      ),
      accessorKey: "username",
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex items-center">
            <img
              src={row.avatar ? row.avatar : "/images/profileImg.jpg"}
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <div className="font-medium">{row.username}</div>
              <div className="text-[14px] text-gray-500">@{row.username}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: (
        <span className="flex items-center">
          Status
          <IoArrowDownSharp className="ml-2 text-gray-400" />
        </span>
      ),
      accessorKey: "status",
      cell: (info) => (
        <span className="h-full py-1 px-0.5 flex items-center justify-center border-2 border-[#dee5ec] rounded-lg capitalize">
          <span className="bg-green-500 w-2 h-2 mr-2 rounded-full"></span>
          {info.getValue()}
        </span>
      ),
    },
    {
      header: (
        <span className="flex items-center">
          Role
          <BsQuestionCircle className="ml-2 text-gray-400" />
        </span>
      ),
      accessorKey: "role",
      cell: (info) => <span className="capitalize">{info.getValue()}</span>,
    },
    {
      header: "Email address",
      accessorKey: "email",
    },
    {
      header: "Teams",
      accessorKey: "teams",
      cell: (info) => (
        <div className="flex flex-wrap gap-2">
          {info.getValue().map((team, index) => {
            let bgColor, borderColor, textColor;
            switch (team.toLowerCase()) {
              case "design":
                bgColor = "bg-purple-100";
                borderColor = "border-purple-600";
                textColor = "text-purple-600"; // Light purple
                break;
              case "product":
                bgColor = "bg-blue-100"; // Light blue
                borderColor = "border-blue-600";
                textColor = "text-blue-600";
                break;
              case "marketing":
                bgColor = "bg-pink-100";
                borderColor = "border-pink-600";
                textColor = "text-pink-600"; // Light pink
                break;
              default:
                bgColor = "bg-green-100";
                borderColor = 'border-green-600';
                textColor = 'text-green-600' // Default background color
            }
            return (
              <span
                key={index}
                className={`text-white ${bgColor} px-3 py-0.5 border ${borderColor} ${textColor} rounded-3xl`}
              >
                {team}
              </span>
            );
          })}
          <span className="px-3 py-0.5 border border-[#dee5ec] rounded-3xl">
            +4
          </span>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const url = new URL(window.location);
    url.searchParams.set("query", query);
    window.history.pushState({}, "", url);
  };

  const handleAddMember = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  const handleCurrentMember = (member) => {
    console.log(member);
    setSingleSelectedData(member);
  };

  const handleDeleteMember = () => {
    setData((prevData) =>
      prevData.filter((member) => member.userId !== deleteMemberID)
    );
    setDeleteCardPop(false);
    setDeleteMemberID(null);
  };

  return (
    <div className="table-container relative">
      <div className="h-[68px] px-4 flex justify-between items-center border-b-2">
        <div className="left-div flex items-center">
          <h2 className="text-lg font-semibold">Team members</h2>
          <span className="ml-2 px-2 text-[#6941C6] text-sm font-normal border rounded-xl bg-purple-100">
            {data.length} users
          </span>
        </div>
        <div className="right-div flex items-center space-x-2">
          <div className="input-div relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search username"
              className="w-[320px] border-r border-l border-t border-b-[3px] border-b-[#aeb4bd] border-[#dee5ec] rounded-sm py-2 px-4 outline-none"
            />
            <CiSearch className="absolute right-4 bottom-2 text-3xl text-[#6941C6]" />
          </div>
          <div className="relative">
            <CiFilter
              onClick={() => setFilterDrop(!filterDrop)}
              className="text-3xl cursor-pointer"
            />
            <div className="absolute right-5 top-10">
              {filterDrop && (
                <DropFilter onClose={() => setFilterDrop(false)} />
              )}
            </div>
          </div>
          <button
            onClick={() => setAddCardPop(true)}
            className="flex items-center bg-[#6941C6] text-white font-medium py-2 px-4 rounded-md tracking-wider"
          >
            <AiOutlinePlus className="mr-2 text-xl" />
            ADD MEMBER
          </button>
        </div>
      </div>

      <div className="member-table overflow-auto">
        <table className=" w-full text-[14px] font-normal">
          <thead className="h-[44px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="font-normal text-[16px] px-4 text-start"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                onClick={() => handleCurrentMember(row.original)}
                className={index % 2 === 0 ? "bg-[#f2f2f3]" : "bg-white"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="space-x-8 pr-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteCardPop(true);
                      setDeleteMemberID(row.original.userId);
                    }}
                  >
                    <MdDeleteOutline className="text-[24px]" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditCardPop(true);
                      setEditMemberDetail(row.original);
                    }}
                  >
                    <FiEdit2 className="text-[22px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="w-full absolute bottom-6 px-6 flex justify-between items-center text-[16px] pt-6 border-t">
        <button className="flex items-center px-4 py-2 mr-2 bg-[#f8fafc] border-2 border-[#dee5ec] rounded-[4px] font-semibold">
          <GoArrowLeft className="mr-2 text-[18px]" />
          Previous
        </button>
        <ul className="flex justify-evenly items-center space-x-2">
          <li className="bg-[#f8fafc] rounded-[4px] py-2 px-4">1</li>
          <li className="bg-[#f8fafc] rounded-[4px] py-2 px-4">2</li>
          <li className="bg-[#f8fafc] rounded-[4px] py-2 px-4">3</li>
          <li className="bg-[#f8fafc] rounded-[4px] py-2 px-4">...</li>
          <li className="bg-[#f8fafc] rounded-[4px] py-2 px-4">8</li>
          <li className="bg-[#f8fafc] rounded-[4px] py-2 px-4">9</li>
          <li className="bg-[#f8fafc] rounded-[4px] py-2 px-4">10</li>
        </ul>
        <button className="flex items-center px-4 py-2 mr-2 bg-[#f8fafc] border-2 border-[#dee5ec] rounded-[4px] font-semibold">
          Next <GoArrowRight className="ml-2 text-[18px]" />
        </button>
      </footer>
      {singleSelectedData && (
        <DetailCard
          member={singleSelectedData}
          onClose={() => setSingleSelectedData(null)}
        />
      )}
      {addCardPop && (
        <AddCard
          onCancel={() => setAddCardPop(false)}
          addFunction={handleAddMember}
        />
      )}
      {editCardPop && (
        <EditCard
          member={editMemberDetail}
          onCancel={() => setEditCardPop(false)}
        />
      )}
      {deleteCardPop && (
        <DeleteCard
          onClose={() => {
            setDeleteCardPop(false);
            setDeleteMemberID(null);
          }}
          deleteFunction={handleDeleteMember}
        />
      )}
    </div>
  );
};

export default Table;
