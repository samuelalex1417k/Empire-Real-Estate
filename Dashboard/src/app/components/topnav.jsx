import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import * as Icon from "react-feather";
import { IoMdLogOut } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { FiUser } from "react-icons/fi";  // Added import

export default function Topnav({ setToggle, toggle }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:8000/api/adminpanel/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchUser();
  }, []);

  // Correctly build profile picture URL if exists
  const profilePicSrc = user?.profile_picture
    ? (user.profile_picture.startsWith("http")
        ? user.profile_picture
        : `http://localhost:8000${user.profile_picture}`)
    : null;

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  return (
    <div className="top-header">
      <div className="header-bar flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <Link
            id="close-sidebar"
            className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[20px] text-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-white rounded-full"
            href="#"
          >
            <Icon.Menu className="size-4" onClick={toggleHandler} />
          </Link>

          <div className="ps-1.5">
            <div className="form-icon relative sm:block hidden">
              <LuSearch className="absolute top-1/2 -translate-y-1/2 start-3" />
              <input
                type="text"
                className="form-input w-56 ps-9 py-2 px-3 h-8 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-3xl outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        <ul className="list-none mb-0 space-x-2 flex items-center">
          <li>
            <Link href="/profile">
              <span className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[20px] text-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-white rounded-full overflow-hidden relative w-8 h-8">
                {profilePicSrc ? (
                  <Image
                    src={profilePicSrc}
                    alt="Profile"
                    fill
                    sizes="32px"
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-slate-700 rounded-full">
                    <FiUser className="text-2xl text-gray-500 dark:text-white" />
                  </div>
                )}
              </span>
              {user?.full_name && (
                <span className="font-semibold text-[16px] ms-1 sm:inline-block hidden">
                  {user.full_name}
                </span>
              )}
            </Link>
          </li>
          <li>
            <a
              onClick={handleLogout}
              className="flex items-center space-x-1 cursor-pointer text-[#947e03] hover:text-[#b7920d] font-medium text-sm"
              title="Sign Out"
            >
              <IoMdLogOut size={20} />
              <span>Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
