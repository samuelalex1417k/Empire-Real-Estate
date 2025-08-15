"use client"
import React from "react"
import dynamic from "next/dynamic";
import { LuSearch } from "react-icons/lu";
import { AiOutlineDollar, AiOutlineHome } from "react-icons/ai";

const Select = dynamic(()=>import('react-select'),{ssr: false,});

export default function Form(){
    let project = [
        { value: '1', label: 'Houses' },
        { value: '2', label: 'Apartment' },
        { value: '3', label: 'Offices' },
        { value: '4', label: 'Townhome' },
    ]
    let minPrice = [
        { value: '1', label: '500' },
        { value: '2', label: '1000' },
        { value: '3', label: '2000' },
        { value: '4', label: '3000' },
        { value: '5', label: '4000' },
        { value: '5', label: '5000' },
        { value: '5', label: '6000' },
        { value: '5', label: '7000' },
        { value: '5', label: '8000' },
        { value: '5', label: '9000' },
    ]
    let maxPrice = [
        { value: '1', label: '500' },
        { value: '2', label: '1000' },
        { value: '3', label: '2000' },
        { value: '4', label: '3000' },
        { value: '5', label: '4000' },
        { value: '5', label: '5000' },
        { value: '5', label: '6000' },
        { value: '5', label: '7000' },
        { value: '5', label: '8000' },
        { value: '5', label: '9000' },
    ]
    return(
        <form className="p-6 bg-white dark:bg-slate-900 rounded-md shadow-md dark:shadow-gray-800">
            <div className="registration-form text-dark text-start">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6 lg:divide-x-[1px] lg:divide-gray-200 lg:dark:divide-gray-700">
                    <div>
                        <div className="filter-search-form relative">
                            <LuSearch className="absolute top-[48%] -translate-y-1/2 start-3 z-1 text-[#947e03] text-[20px]"/>
                            <input name="name" type="text" id="job-keyword" className="form-input lg:rounded-t-sm lg:rounded-e-none lg:rounded-b-none lg:rounded-s-sm lg:outline-0 w-full filter-input-box bg-gray-50 dark:bg-slate-800 border-0 focus:ring-0 ps-10" placeholder="Search your Keywords" />
                        </div>
                    </div>

                    <div>                                                      
                        <div className="filter-search-form relative">
                            <AiOutlineHome className="absolute top-[48%] -translate-y-1/2 start-3 z-1 text-[#947e03] text-[20px]"/>
                            <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0 ps-10 pt-3" options={project} />

                        </div>
                    </div>

                    <div>                                                       
                        <div className="filter-search-form relative">
                            <AiOutlineDollar className="absolute top-[48%] -translate-y-1/2 start-3 z-1 text-[#947e03] text-[20px]"/>
                            <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0 ps-10 pt-3" options={minPrice} />

                        </div>
                    </div>

                    <div>                                                       
                        <div className="filter-search-form relative">
                            <AiOutlineDollar className="absolute top-[48%] -translate-y-1/2 start-3 z-1 text-[#947e03] text-[20px]"/>
                            <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0 ps-10 pt-3" options={maxPrice} />

                        </div>
                    </div>

                    <div className="lg:mt-6">
                        <input type="submit" id="search-buy" name="search" className="btn bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white searchbtn submit-btn w-full !h-12 rounded" value="Search" />
                    </div>
                </div>
            </div>
        </form>
    )
}