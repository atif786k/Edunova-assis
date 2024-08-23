import React, { useState } from "react";
import "./style/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { IoReload } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

const AddCard = ({ onCancel, addFunction }) => {
  const [imageSrc, setImageSrc] = useState("/images/profileImg.jpg");
  const [previewSrc, setPreviewSrc] = useState(null);

  const schema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z
      .string()
      .min(2, { message: "Role must be at least 2 characters long" }),
    status: z
      .string()
      .min(1, { message: "Status is required" })
      .regex(/(active|inactive)/i, { message: "Invalid status value" }),
    teams: z.string().min(2, { message: "Please assign at least one team" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const teamsArray = data.teams.split(",").map((team) => team.trim());

    const newMember = {
      ...data,
      teams: teamsArray,
      userId: faker.string.uuid(),
      avatar: imageSrc,
    };

    addFunction(newMember);
    onCancel();
  };
  return (
    <>
      <div className="popup">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[700px] py-6 px-5 border-2 bg-white text-black space-y-8 rounded-lg"
        >
          <h1 className="text-3xl font-bold">Add Member</h1>
          <div className="flex flex-col items-center space-y-4">
            <figure className="h-[100px] w-[100px] rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={imageSrc || "/images/defaultProfile.jpg"}
                alt="Profile"
                className="scale-150"
              />
            </figure>
            <div className="flex space-x-2">
              {/* <button className="bg-[#f8fafc] flex items-center uppercase border-2 border-[#dee5ec] rounded-[4px] p-2 font-semibold tracking-wider text-[14px]">
                <IoReload className="text-[20px] mr-2" />
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                Change Photo
              </button> */}
              <label className="bg-[#f8fafc] flex items-center uppercase border-2 border-[#dee5ec] rounded-[4px] p-2 font-semibold tracking-wider text-[14px] cursor-pointer">
                <IoReload className="text-[20px] mr-2" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                Change Photo
              </label>
              <button className="bg-[#f8fafc] flex items-center uppercase border-2 border-[#dee5ec] rounded-[4px] p-2 font-semibold tracking-wider text-[14px]">
                <RiDeleteBinLine className="text-[20px] mr-2" />
                Remove Photo
              </button>
            </div>
          </div>

          <div className="grid-container grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-base font-medium">Name</label>
              <input
                {...register("username")}
                type="text"
                className={`w-full border-r border-l border-t border-b-[#aeb4bd] border-b-[3px] rounded-sm py-[10px] px-4 outline-none ${
                  errors.username ? "border-red-500" : "border-[#dee5ec]"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-base font-medium">Email</label>
              <input
                {...register("email")}
                type="email"
                className={`w-full border-r border-l border-t border-b-[#aeb4bd] border-b-[3px] rounded-sm py-[10px] px-4 outline-none ${
                  errors.email ? "border-red-500" : "border-[#dee5ec]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-base font-medium">Role</label>
              <select
                {...register("role")}
                id="role"
                className={`w-full border-r border-l border-t border-b-[#aeb4bd] border-b-[3px] rounded-sm py-[10px] px-4 outline-none ${
                  errors.role ? "border-red-500" : "border-[#dee5ec]"
                }`}
              >
                <option value="Product Designer">Product Designer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="frontend ">Frontend Developer</option>
                <option value="fullstack">FullStack Developer</option>
                <option value="ux">UX Designer</option>
                <option value="ui">UI Designer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-base font-medium">Status</label>
              <select
                {...register("status")}
                id="status"
                className={`w-full border-r border-l border-t border-b-[#aeb4bd] border-b-[3px] rounded-sm py-[10px] px-4 outline-none ${
                  errors.status ? "border-red-500" : "border-[#dee5ec]"
                }`}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-base font-medium">Teams</label>
            <input
              {...register("teams")}
              type="text"
              placeholder="E.g. Design, Product"
              className={`w-full border-r border-l border-t border-b-[#aeb4bd] border-b-[3px] rounded-sm py-[10px] px-4 outline-none ${
                errors.teams ? "border-red-500" : "border-[#dee5ec]"
              }`}
            />
            {errors.teams && (
              <p className="text-red-500 text-sm">{errors.teams.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 mr-2 bg-[#f8fafc] border-2 border-[#dee5ec] rounded-[4px] font-semibold"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6941C6] text-white rounded-[4px] font-semibold"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCard;
