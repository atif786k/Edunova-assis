import React, { useState, useMemo } from "react";
import "./style/style.css";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { CiFilter, CiSearch } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import AddCard from "../components/AddCard";
import DetailCard from "../components/DetailCard";

const Table = () => {
  const [addCardPop, setAddCardPop] = useState(false);
  const [singleSelectedData, setSingleSelectedData] = useState(null);

  const generateData = () => {
    return [...Array(8)].map(() => ({
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
        "Ux Designer",
      ]),
      status: faker.helpers.arrayElement(["Active"]),
      teams: faker.helpers.arrayElements(
        ["Design", "Product", "Marketing"],
        faker.datatype.number({ min: 3, max: 3 })
      ),
    }));
  };
  const [data, setData] = useState(generateData());

  const tableData = useMemo(() => data, []);

  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
    {
      header: "Name",
      accessorKey: "username",
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex items-center">
            <img
              src={row.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <div className="font-medium">{row.username}</div>
              <div className="text-[12px] text-gray-500">@{row.username}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info) => (
        <span className="h-full py-1 px-0.5 flex items-center justify-center border-2 rounded-lg">
          <span className="bg-green-500 w-2 h-2 mr-2 rounded-full"></span>
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
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
          {info.getValue().map((team, index) => (
            <span
              key={index}
              className="text-[#6941C6] bg-purple-100 px-3 py-0.5 border border-[#6941C6] rounded-3xl"
            >
              {team}
            </span>
          ))}
          <span className="px-3 py-0.5 border border-[#dee5ec] rounded-3xl">+4</span>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleCurrentMember = (member) => {
    console.log(member);
    setSingleSelectedData(member);
  };

  return (
    <div className="table-container w3-conainer">
      <div className="h-[68px] px-4 flex justify-between items-center border-b-2">
        <div className="left-div flex items-center">
          <h2 className="text-lg font-semibold">Team members</h2>
          <span className="ml-2 px-2 text-[#6941C6] text-sm font-normal border rounded-xl bg-purple-100">
            100 users
          </span>
        </div>
        <div className="right-div flex items-center space-x-2">
          <div className="input-div relative">
            <input
              type="text"
              placeholder="Search"
              className="w-[320px] border-r border-l border-t border-b-[3px] border-b-[#aeb4bd] border-[#dee5ec] rounded-sm py-2 px-4 outline-none"
            />
            <CiSearch className="absolute right-4 bottom-2 text-3xl text-[#6941C6]" />
          </div>
          <CiFilter className="text-3xl" />
          <button
            onClick={() => setAddCardPop(true)}
            className="flex items-center bg-[#6941C6] text-white font-medium py-2 px-4 rounded-md tracking-wider"
          >
            <AiOutlinePlus className="mr-2 text-xl" />
            ADD MEMBER
          </button>
        </div>
      </div>

      <table className="w3-table w3-striped w-full text-[14px] font-normal">
        <thead className="h-[44px]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="font-light">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="overflow-y-hidden">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleCurrentMember(row.original)}
              className="border mt-6 cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="space-x-4 pr-12">
                <button>
                  <RiDeleteBinLine className="text-[20px]" />
                </button>
                <button>
                  <FiEdit2 className="text-[20px]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {singleSelectedData && (
        <DetailCard
          member={singleSelectedData}
          onClose={() => setSingleSelectedData(null)}
        />
      )}
      {addCardPop && <AddCard onCancel={() => setAddCardPop(false)} />}
    </div>
  );
};

export default Table;
