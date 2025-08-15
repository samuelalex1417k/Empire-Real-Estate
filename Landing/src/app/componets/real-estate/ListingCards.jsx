"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ListingCards() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/listing/")
      .then((res) => res.json())
      .then(setListings)
      .catch(() => alert("Failed to fetch listings"));
  }, []);

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,  
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
      {listings.slice(0, 6).map((data, index) => (
        <motion.div
          key={data.id}
          className="group rounded-md bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-800 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          custom={index}
        >
          <div className="relative">
            <Image
              src={data.image || (data.images?.[0]?.image) || "/images/placeholder.png"}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt={`Property at ${data.address || "Unknown location"}`}
            />
            <div className="absolute top-50 end-75">
              <Link
                href="#"
                className="size-9 inline-flex items-center justify-center text-[#947e03] bg-transparent "
              >
                <i className="mdi mdi-heart text-white "></i>
              </Link>
            </div>
          </div>

          <div className="p-6">
            <Link
              href={`/property-detail/${data.id}`}
              className="text-lg hover:text-[#947e03] font-medium"
            >
              <span className="flex items-center me-2 text-sm">
                <FaMapMarkerAlt /> {data.address}
              </span>
            </Link>

            <ul className="py-6 border-y border-gray-100 dark:border-gray-800 -ml-0.5 flex items-center list-none">
              <li className="flex items-center me-2 text-sm">
                <span className="text-1xl me-0.5 text-sm text-[#947e03]">Size:</span>
                <span>{data.size || "N/A"}m²</span>
              </li>
              <li className="flex items-center me-2 text-sm">
                <span className="text-1xl me-0.5 text-sm text-[#947e03]">Beds:</span>
                <span>{data.beds}</span>
              </li>
              <li className="flex items-center me-2 text-sm">
                <span className="text-1xl me-0.5 text-sm text-[#947e03]">Baths:</span>
                <span className="text-1xl">{data.baths}</span>
              </li>
              <li className="flex items-center text-sm">
                <span className="text-1xl me-0.5 text-sm text-[#947e03]">Type:</span>
                <span className="text-1xl">{data.type || "N/A"}</span>
              </li>
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
