"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { LuSearch } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { LuCheckCheck , LuBedDouble } from "react-icons/lu";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function Form({ onSearch }) {
  const projectOptions = [
    { value: "Houses", label: "Houses" },
    { value: "Apartment", label: "Apartment" },
    { value: "Offices", label: "Offices" },
  ];
  const projectBeds = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];
    const projectStatus = [
    { value: "Active", label: "Active" },
    { value: "ongoing", label: "ongoing" },
    { value: "new order", label: "new order" },
  ];


  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState(null);
  const [bed, setbed] = useState(null);
  const [status, setstatus] = useState(null);

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      border: "1px solid #ccc",
      height: "46px",
      paddingLeft: "2.5rem",
      fontSize: "0.875rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#000000",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
    }),
    input: (provided) => ({
      ...provided,
      color: "#000000",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#947e03" : "transparent",
      color: "#000000",
      cursor: "pointer",
    }),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      keyword: keyword.trim(),
      type: type ? type.value : null,
      bed: bed ? bed.value : null,
      status: status ? status.value : null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-[#260f01] dark:bg-[#260f01]  absolute top-[-50%] w-full"
    >
      <div className="registration-form text-start bg-transparent">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4">
          
          {/* Keyword Input */}
          <div className="bg-white">
            <div className="relative h-[46px]">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[#947e03] text-[20px]" />
              <input
                name="keyword"
                type="text"
                className="w-full h-full pl-10 pr-4 text-sm rounded bg-transparent dark:bg-transparent  text-black focus:ring-0 focus:outline-none"
                placeholder="Search your Keywords"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>

          {/* Property Type */}
          <div>
            <div className="relative h-[46px]">
              <AiOutlineHome className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[#947e03] text-[20px]" />
              <Select
                options={projectOptions}
                styles={customSelectStyles}
                placeholder="Property Type"
                value={type}
                onChange={setType}
                isClearable
              />
            </div>
          </div>

          {/* Min Price */}
          <div>
            <div className="relative h-[46px]">
              <LuBedDouble className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[#947e03] text-[20px]" />
              <Select
                options={projectBeds}
                styles={customSelectStyles}
                placeholder="Beds"
                value={bed}
                onChange={setbed}
                isClearable
              />
            </div>
          </div>

          {/* Max Price */}
          <div>
            <div className="relative h-[46px]">
              <LuCheckCheck className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[#947e03] text-[20px]" />
              <Select
                options={projectStatus}
                styles={customSelectStyles}
                placeholder="Status"
                value={status}
                onChange={setstatus}
                isClearable
              />
            </div>
          </div>

          {/* Search Button */}
          <div>
            <input
              type="submit"
              className="btn bg-[#947e03] hover:bg-[#947e10] border-[#947e03] text-white w-full h-[46px] rounded text-sm"
              value="Search"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
