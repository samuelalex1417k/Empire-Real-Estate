"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

import Navbar from "../../componets/Navbar/navbar";
import Footer from "../../componets/Footer/footer";
import Switcher from "../../componets/switcher";
import Propreties from "../../componets/real-estate/propreties";

import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import { LuBath, LuBedDouble ,LuCar } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Page() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/listing/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch property");
        const data = await res.json();
        console.log("data",data)
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-[#947e03] text-lg font-semibold">
        Loading property...
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-500 text-lg font-semibold">
        Property not found or failed to load.
      </div>
    );
  }

 

  return (
    <>
      <Navbar navClass="nav-sticky" />

      <section className="relative md:pb-24 pb-16 bg-[#f1f1f1] mt-20">
        <Propreties property={property}/>
     
          <div className="md:flex justify-between items-center">
            <ul className="tracking-[0.5px] inline-flex items-center sm:mt-0 mt-3">
              <li className="inline-block capitalize text-[14px] font-bold duration-500 dark:text-white/70 hover:text-[#947e03] dark:hover:text-white"><Link href="/Dashboard">Dashboard</Link></li>
              <li className="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><MdKeyboardArrowRight/></li>
              <li className="inline-block capitalize text-[14px] font-bold text-[#947e03] dark:text-white" aria-current="page">Users</li>
            </ul>
          </div>
        
        <div className="container relative bg-white md:mt-24 mt-16">
          <div className="md:flex">
            
            <div className="lg:w-2/3 md:w-1/2 md:p-4 px-3">
              <h4 className="text-2xl font-medium">{property.address}</h4>
       
              {/* Add images here, above the ul
              {property.images && property.images.length > 0 ? (
                <div className="flex overflow-x-auto gap-4 py-4">
                  {property.images.map((img) => {
                    const imageUrl = img?.image || img?.url;
                    if (!imageUrl || imageUrl === "") return null; // skip invalid src

                    return (
                      <div
                        key={img.id || imageUrl}
                        className="relative w-48 h-32 flex-shrink-0 rounded-md overflow-hidden shadow-md"
                      >
                        <Image
                          src={imageUrl}
                          alt={`Property image ${img.id || ""}`}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 300px"
                          priority={true}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-sm text-gray-600 rounded-md">
                  No Images Available
                </div>
              )} */}

              <ul className="py-6 flex flex-wrap items-start list-none gap-y-4">
 
  <li className="flex flex-col lg:me-6 me-4">
    <span className="text-[#000000] md:text-1xl text-1xl mb-1">Property Size</span>
    <div className="flex items-center">
      <LiaCompressArrowsAltSolid className="text-[#000000] lg:text-1xl text-1xl me-1" />
      <span className="text-1xl">{property.size || "N/A"} m²</span>
    </div>
  </li>

 
  <li className="flex flex-col lg:me-6 me-4">
    <span className="text-[#000000] md:text-1xl text-1xl mb-1">Bedrooms</span>
    <div className="flex items-center">
      <LuBedDouble className="text-[#000000] lg:text-1xl text-1xl me-1" />
      <span className="text-1xl">{property.beds || "N/A"}</span>
    </div>
  </li>

 
  <li className="flex flex-col lg:me-6 me-4">
    <span className="text-[#000000] md:text-1xl text-1xl mb-1">Bathrooms</span>
    <div className="flex items-center">
      <LuBath className="text-[#000000] lg:text-1xl text-1xl me-1" />
      <span className="text-1xl">{property.baths || "N/A"}</span>
    </div>
  </li>

  
  <li className="flex flex-col lg:me-6 me-4">
    <span className="text-[#000000] md:text-1xl text-1xl mb-1">Garages</span>
    <div className="flex items-center">
      <LuCar className="text-[#000000] lg:text-1xl text-1xl me-1" />
      <span className="text-1xl">{property.garage || "N/A"}</span>
    </div>
  </li>
</ul>


              <p className="text-slate-400">{property.description || "No description available."}</p>

              <div className="w-full leading-[0] border-0 mt-6">
                <iframe
                  title="google"
                  src={property.map_url || "https://www.google.com/maps?q=8.995667,38.747460&z=15&output=embed"}
                  style={{ border: 0 }}
                  className="w-full h-[500px]"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            
            <div className="lg:w-1/3 md:w-1/2 md:p-4 px-3 mt-8 md:mt-0">
              <div className="sticky top-20">
                <div className="rounded-md bg-slate-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800">
                  <div className="p-6">
                    <h5 className="text-2xl font-medium">Price:</h5>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-medium">
                        {property.price
                          ? Number(property.price).toLocaleString() + " ETB"
                          : "N/A"}
                      </span>
                      <span className="bg-[#947e03]/10 text-[#947e03] text-sm px-2.5 py-0.75 rounded h-6">
                        {property.status || "For Sale"}
                      </span>
                    </div>

                    <ul className="list-none space-x-1 mt-4">
                      <li className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Days Listed</span>
                        <span className="font-medium text-sm">
                          {property.days || "N/A"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center mt-2">
                        <span className="text-slate-400 text-sm">Price per m²</span>
                        <span className="font-medium text-sm">
                          {property.price_per_sqf || "N/A"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center mt-2">
                        <span className="text-slate-400 text-sm">Monthly Payment</span>
                        <span className="font-medium text-sm">
                          {property.estimated_monthly || "N/A"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex">
                    <div className="p-1 w-1/2">
                      <Link
                        href="#"
                        className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-[#947f09c5] border-[#947e03] hover:border-[#947f09c5] text-white rounded-md w-full"
                      >
                        Book Now
                      </Link>
                    </div>
                    <div className="p-1 w-1/2">
                      <Link
                        href="#"
                        className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-[#947f09c5] border-[#947e03] hover:border-[#947f09c5] text-white rounded-md w-full"
                      >
                        Offer Now
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <h3 className="mb-6 text-xl leading-normal font-medium">
                    Have Questions? Get in touch!
                  </h3>
                  <div className="mt-6">
                    <Link
                      href="/contact-one"
                      className="py-2 px-5 inline-flex font-semibold tracking-wide align-middle transition duration-500 ease-in-out text-base text-center bg-transparent hover:bg-[#947e03] border border-[#947e03] text-[#947e03] hover:text-white rounded-md"
                    >
                      <FiPhone className="me-1 text-lg" /> Contact us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Switcher />
    </>
  );
}
