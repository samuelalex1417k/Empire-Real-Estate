'use client'
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { AiOutlineCreditCard, AiOutlineDashboard } from "react-icons/ai";
import { CgLogOff } from 'react-icons/cg';
import { UserContext } from '../context/userContext';  
import { TbNotebook } from "react-icons/tb";
// import { FaRecycle } from "react-icons/fa";
// import { LuBellRing } from "react-icons/lu";
// import { BiCog } from "react-icons/bi"; 

export default function UserProfileTab(){

    const pathname = usePathname();
    const { user } = useContext(UserContext); 

    const [uploadFile, setUploadFile] = useState(user?.profileImage || '/images/client/05.jpg');

    function handleChange(event) {
        if(event.target.files && event.target.files.length !== 0){
            setUploadFile(URL.createObjectURL(event.target.files[0]))
        }
    }
    
   

    return(
         <div>
      <h5>{user.username}</h5>
      <p>{user.email}</p>
        <div className="xl:col-span-3 lg:col-span-4 md:col-span-4 mx-6">
            <div className="p-6 relative rounded-md shadow-sm dark:shadow-gray-700 bg-white dark:bg-slate-900 -mt-48">
                <div className="profile-pic text-center mb-5">
                    <input id="pro-img" name="profile-image" type="file" className="hidden" onChange={handleChange} />
                    <div>
                        <div className="relative size-24 mx-auto">
                            <Image 
                              src={uploadFile} 
                              width={96} height={96} 
                              placeholder="blur" 
                              blurDataURL={uploadFile} 
                              className="rounded-full shadow-sm dark:shadow-gray-700 ring-4 ring-slate-50 dark:ring-slate-800" 
                              id="profile-image" alt="profile image"
                            />
                            <label className="absolute inset-0 cursor-pointer" htmlFor="pro-img"></label>
                        </div>

                        <div className="mt-4">
                            <h5 className="text-lg font-semibold">{user?.username || 'Loading...'}</h5>
                            <p className="text-slate-400">{user?.email || 'Loading...'}</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700">
                    <ul className="list-none sidebar-nav mb-0 mt-3" id="navmenu-nav">
                        {/* ...your nav links here, unchanged... */}
                        <li className="navbar-item account-menu">
                            <Link href="/profile" className={`${pathname === '/profile' ? 'text-[#947e03] dark:text-white' : 'text-[#000000]'} navbar-link  flex items-center py-2 rounded `}>
                                <span className="me-2 text-[18px] mb-0"><AiOutlineDashboard/></span>
                                <h6 className="mb-0 font-semibold">Profile</h6>
                            </Link>
                        </li>
                        {/* Rest of links */}
                        <li className="navbar-item account-menu">
                            <Link href="/auth-lock-screen" className={`${pathname === '/auth-lock-screen' ? 'text-[#947e03] dark:text-white' : 'text-[#000000]'} navbar-link  flex items-center py-2 rounded `}>
                                <span className="me-2 text-[18px] mb-0"><CgLogOff/></span>
                                <h6 className="mb-0 font-semibold">Sign Out</h6>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    )
}
