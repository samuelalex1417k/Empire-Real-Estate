"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../componets/Navbar/navbar";
import Footer from "../componets/Footer/footer";
import Switcher from "../componets/switcher";
import Form from "../componets/real-estate/form";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Page() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`${API_URL}/listing/`);
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 1000);
  }, [isLoadingMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < listings.length) {
          handleLoadMore();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleLoadMore, listings.length, visibleCount]);

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.1,
        ease: "easeOut",
      },
    }),
  };

  const handleSearch = (filters) => {
    console.log("Filters from search:", filters);
  };

  const formatPrice = (price) =>
    price
      ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Birr"
      : "N/A";

  return (
    <>
      <Navbar navClass="nav-light" />

      <section
        className="relative table w-full py-32 lg:py-60 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/images/real/bg/01.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#452f0c]/40"></div>
        <div className="container relative">
          <motion.div
            className="grid grid-cols-1 text-center mt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">
              Take a Look at your Future Home
            </h3>
          </motion.div>
        </div>
      </section>

      <div className="relative">
        <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
          <svg
            className="w-full h-auto scale-[2.0] origin-top"
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <motion.div
        className="container relative -mt-25 z-1"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1">
          <Form onSearch={handleSearch} />
        </div>
      </motion.div>

      <section className="relative mt-30 lg:py-24 py-16">
        <div className="container relative">
          {loading ? (
            <p className="text-center">Loading listings...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : listings.length === 0 ? (
            <p className="text-center">No listings found.</p>
          ) : (
            <>
              <motion.div
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {listings.slice(0, visibleCount).map((data, index) => (
                  <motion.div
                    key={data.id}
                    className="group rounded-md bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-800 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500"
                    variants={cardVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    custom={index}
                  >
                    <div className="relative">
                      <Image
                        src={
                          data.image ||
                          data.images?.[0]?.image ||
                          "/images/placeholder.png"
                        }
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        alt={`Property at ${data.address || "Unknown location"}`}
                      />
                      <div className="absolute top-50 end-75">
                        <Link
                          href="#"
                          className="size-9 inline-flex items-center justify-center text-[#947e03] bg-transparent rounded-full"
                        >
                          <i className="mdi mdi-heart text-white"></i>
                        </Link>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-100">
                      <Link
                        href={`/property-detail/${data.id}`}
                        className="text-lg hover:text-[#947e03] font-medium"
                      >
                        <span className="flex items-center me-2 text-sm">
                          <FaMapMarkerAlt />
                          {data.address}
                        </span>
                      </Link>

                      <ul className="py-6 border-y border-gray-100 dark:border-gray-800 -ml-0.5 flex items-center list-none">
                        <li className="flex items-center me-2 text-sm">
                          <span className="text-1xl me-0.5 text-sm text-[#947e03]">
                            Size:
                          </span>
                          <span>{data.size ?? "N/A"}m²</span>
                        </li>
                        <li className="flex items-center me-2 text-sm">
                          <span className="text-1xl me-0.5 text-sm text-[#947e03]">
                            Beds:
                          </span>
                          <span>{data.beds ?? "N/A"}</span>
                        </li>
                        <li className="flex items-center me-2 text-sm">
                          <span className="text-1xl me-0.5 text-sm text-[#947e03]">
                            Baths:
                          </span>
                          <span className="text-1xl">
                            {data.baths ?? "N/A"}
                          </span>
                        </li>
                        <li className="flex items-center text-sm">
                          <span className="text-1xl me-0.5 text-sm  text-[#947e03]">
                            Type:
                          </span>
                          <span className="text-1xl">
                            {data.type ?? "N/A"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              
              <div ref={loaderRef} className="text-center mt-10">
                {isLoadingMore && (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[#947e03]"></div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
      <Switcher />
    </>
  );
}
