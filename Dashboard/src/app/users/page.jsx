'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Footer from "../components/footer";
import Switcher from "../components/switcher";
import Wrapper from "../components/wrapper";

import { MdKeyboardArrowRight } from "react-icons/md";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users on mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/users/', {
          headers: {
            'Content-Type': 'application/json',
           
           'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data); // Expecting an array of users
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="md:flex justify-between items-center">
            <h5 className="text-lg font-semibold">Registered Users</h5>

            <ul className="tracking-[0.5px] inline-flex items-center sm:mt-0 mt-3">
              <li className="inline-block capitalize text-[14px] font-bold duration-500 dark:text-white/70 hover:text-[#947e03] dark:hover:text-white"><Link href="/Dashboard">Dashboard</Link></li>
              <li className="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><MdKeyboardArrowRight/></li>
              <li className="inline-block capitalize text-[14px] font-bold text-[#947e03] dark:text-white" aria-current="page">Users</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 mt-6">
            <div className="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 rounded-md">
              <table className="w-full text-start">
                <thead className="text-base">
                  <tr>
                    <th className="text-start p-4 min-w-[128px]">User ID</th>
                    <th className="text-start p-4 min-w-[192px]">Username</th>
                    <th className="text-center p-4 min-w-[200px]">Email</th>
                    <th className="text-center p-4 min-w-[150px]">Date Joined</th>
                    <th className="text-center p-4 min-w-[150px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">Loading users...</td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">No users found.</td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td className="text-start border-t border-gray-100 dark:border-gray-800 p-4">#{user.id}</td>
                        <td className="text-start border-t border-gray-100 dark:border-gray-800 p-4">{user.username}</td>
                        <td className="text-center border-t border-gray-100 dark:border-gray-800 p-4">{user.email}</td>
                        <td className="text-center border-t border-gray-100 dark:border-gray-800 p-4">{new Date(user.date_joined).toLocaleDateString()}</td>
                        <td className="text-center border-t border-gray-100 dark:border-gray-800 p-4">
                          <span className={`text-[12px] font-bold px-2.5 py-0.5 rounded h-5 ms-1 ${
                            user.is_active ? 'bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-600' : 'bg-red-600/10 dark:bg-red-600/20 text-red-600'
                          }`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination placeholder */}
            <div className="mt-5 flex items-center justify-between">
              <div>
                <Link href="#" className="size-8 inline-flex items-center justify-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 border-gray-100 dark:border-gray-700 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full"><i className="mdi mdi-arrow-left"></i></Link>
                <Link href="#" className="size-8 inline-flex items-center justify-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 border-gray-100 dark:border-gray-700 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full ms-2"><i className="mdi mdi-arrow-right"></i></Link>
              </div>
              <span className="text-slate-400">Showing 1 - {users.length} of {users.length}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      <Switcher/>
    </Wrapper>
  );
}

