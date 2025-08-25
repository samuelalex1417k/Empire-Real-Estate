"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Switcher from "./components/switcher";


export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await fetch("http://localhost:8000/api/adminpanel/token/", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
    });

    const data = await response.json();
    console.log("Received data from login:", data);

    if (response.ok) {
      
      localStorage.setItem("token", data.access);  
      localStorage.setItem("refresh", data.refresh);
      window.location.href = "/dashboard";
    } else {
      setError(data.detail || "Login failed");
    }
  } catch (err) {
    setError("An unexpected error occurred");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
     <section className="min-h-screen flex items-center justify-center bg-[#000000]/[0.02] relative">
  <div className="relative ml-138 w-210 h-130 max-w-md p-8 bg-white dark:bg-slate-900 rounded-xl shadow-[#947e03] z-10">
    <div className="mr-12 mb-6 absolute top-[5%] left-[31%] ">
      <Link href="">
        <Image
          src="/images/2-removebg-preview copy.png"
          width={150}
          height={64}
          alt="logo"
          className="mx-auto"
        />
      </Link>
    </div>
               
                  <form onSubmit={handleSubmit} className="text-start">
                    <div className="grid grid-cols-1">
                      <div className="mt-35">
                        <label className="font-semibold" htmlFor="LoginEmail">
                         Email or Username:
                       </label>
                        <input
                          id="LoginEmail"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-[#947e03] dark:border-gray-800 dark:focus:border-[#947e03] focus:ring-0"
                          placeholder="name@example.com"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="font-semibold"
                          htmlFor="LoginPassword"
                        >
                          Password:
                        </label>
                        <input
                          id="LoginPassword"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-[#947e03] dark:border-gray-800 dark:focus:border-[#947e03] focus:ring-0"
                          placeholder="Password"
                          required
                        />
                      </div>

                      <div className="flex justify-between mb-4">
                        <div className="flex items-center mb-0">
                          <input
                            className="form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-[#947e03] checked:appearance-auto dark:accent-[#947e03] focus:border-indigo-300 focus:ring-0 focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2"
                            type="checkbox"
                            value=""
                            id="RememberMe"
                          />
                          <label
                            className="form-checkbox-label text-slate-400"
                            htmlFor="RememberMe"
                          >
                            Remember me
                          </label>
                        </div>
                        
                      </div>

                      {error && (
                        <p className="text-red-600 mb-2 font-semibold">{error}</p>
                      )}

                      <div className="mb-4">
                        <button
                          type="submit"
                          className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-[#947e03] border-[#947e03] hover:border-[#947e03] text-white rounded-md w-40 ml-25"
                          disabled={loading}
                        >
                          {loading ? "Logging in..." : "Login"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>         

            <div className="xl:w-[70%] lg:w-2/3 md:w-1/2 flex justify-center mx-6 md:my-auto my-20">
              <div>
                <div className="relative">
                  <div className="absolute top-20 start-20 bg-[#947e03]/[0.02] size-[1200px] rounded-full"></div>
                  <div className="absolute bottom-20 -end-20 bg-[#947e03]/[0.02] size-[600px] rounded-full"></div>
                </div>
              </div>
            </div>
          
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#00000030] rounded-full blur-1xl z-0"></div>
        <div className="absolute bottom-50 right-10 w-60 h-60 bg-[#00000030] rounded-full blur-1xl z-0"></div>
         <div className="absolute bottom-8 right-200 w-60 h-60 bg-[#947e0330] rounded-full blur-1xl z-0"></div>
      </section>
      <Switcher />
      
    </>
  );
}
