'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

export default function Blogcards() {
  const [blogs, setBlogs] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // For filtering
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs/`);
        const data = await res.json();
        setBlogs(data);
        setFilteredData(data); // initialize filteredData with all blogs
      } catch (err) {
        console.error("Failed to fetch blogs", err);
        alert("Failed to fetch blogs");
      }
    };
    fetchBlogs();
  }, []);

  const matchCategory = (category) => {
    setSelectedCategory(category);
    if (!category) {
      setFilteredData(blogs);
    } else {
      const filtered = blogs.filter(blog => blog.category === category); // Adjust as needed
      setFilteredData(filtered);
    }
  };

  return (
    <div className="container relative">
      <div className="grid grid-cols-1 justify-center">
        <div className="relative z-2 transition-all duration-500 ease-in-out sm:-mt-[220px] -mt-[200px] m-0">
          {/* <div className="filters-group-wrap mb-4">
            <div className="filters-group">
              <ul className="mb-0 list-none container-filter-white filter-options text-center">
                <li
                  className={`${
                    selectedCategory === null ? 'active' : ''
                  } inline-block text-lg font-semibold mx-2 mb-3 cursor-pointer relative border-b border-transparent text-white/70 transition duration-500`}
                  onClick={() => matchCategory(null)}
                >
                  All
                </li>
                <li
                  className={`${
                    selectedCategory === 'business' ? 'active' : ''
                  } inline-block text-lg font-semibold mx-2 mb-3 cursor-pointer relative border-b border-transparent text-white/70 transition duration-500`}
                  onClick={() => matchCategory('business')}
                >
                  Business
                </li>
                <li
                  className={`${
                    selectedCategory === 'tech' ? 'active' : ''
                  } inline-block text-lg font-semibold mx-2 mb-3 cursor-pointer relative border-b border-transparent text-white/70 transition duration-500`}
                  onClick={() => matchCategory('tech')}
                >
                  Technology
                </li>
              </ul>
            </div>
          </div> */}

          <div className="columns-3 mb-5 gap-5">
            {filteredData.map((item, index) => (
              <div className="mb-01 break-inside-avoid" key={index}>
                <div className="blog relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden">
                  <Image
                    src={item.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    alt={item.title}
                  />

                  <div className="content p-6">
                    <Link
                      href={`/blog-detail/${item.id}`}
                      className="title h5 text-lg font-medium hover:text-[#947e03] duration-500 ease-in-out"
                    >
                      {item.title}
                    </Link>
                    <p className="text-slate-400 mt-3">{item.description}</p>

                    <div className="mt-4">
                      <Link
                        href={`/blog-detail/${item.id}`}
                        className="relative inline-flex items-center font-normal tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 hover:text-[#947e03] after:bg-[#947e03] duration-500"
                      >
                        Read More <FaArrowRight className="ms-2 text-[10px]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>  
        </div>
      </div>
    </div>
  );
}
