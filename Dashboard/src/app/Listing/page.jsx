"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import Footer from "../components/footer";
import Switcher from "../components/switcher";
import Wrapper from "../components/wrapper";

import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import { LuBath, LuBedDouble } from "react-icons/lu";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { FiTrash2, FiEdit } from "react-icons/fi";
import AddListing from "../listing-add/page";

export default function Page() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 12;

  const [deleteId, setDeleteId] = useState(null); // ID of listing to delete (for modal)
  const [deleteError, setDeleteError] = useState(null); // delete error message

  const containerRef = useRef(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/listing/");
        if (!res.ok) throw new Error("Failed to fetch listings");
        let data = await res.json();
        setListings(data);
      } catch (err) {
        setError(err.message || "Error fetching listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const totalPages = Math.ceil(listings.length / listingsPerPage);
  const indexOfLast = currentPage * listingsPerPage;
  const indexOfFirst = indexOfLast - listingsPerPage;
  const currentListings = listings.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Open modal for delete confirmation
  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteError(null);
  };

  // Close modal
  const cancelDelete = () => {
    setDeleteId(null);
    setDeleteError(null);
  };

  // Actual delete request
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/listing/${deleteId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setListings((prev) => prev.filter((listing) => listing.id !== deleteId));
        setDeleteId(null);

        // Adjust page if last item removed
        if ((currentListings.length === 1) && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        const data = await res.json();
        console.error("Delete failed, response:", data);
        setDeleteError(data.detail || "Failed to delete listing.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setDeleteError("Error deleting listing. Please try again.");
    }
  };

  // Navigate to update/edit page
  const handleUpdate = (id) => {
    window.location.href = `/listing-edit/${id}`;
  };

  return (
    <Wrapper>
      <div className="container-fluid relative px-3" ref={containerRef}>
        <div className="layout-specing">
          <div className="md:flex justify-between items-center">
            <div>
              <h5 className="text-lg font-semibold">Property Listings</h5>
              <ul className="tracking-[0.5px] inline-flex items-center mt-2">
                <li className="inline-block capitalize text-[14px] font-bold duration-500 dark:text-white/70 hover:text-[#947e03] dark:hover:text-white">
                  <Link href="/Dashboard">Dashboard</Link>
                </li>
                <li className="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5">
                  <MdKeyboardArrowRight />
                </li>
                <li
                  className="inline-block capitalize text-[14px] font-bold text-[#947e03] dark:text-white"
                  aria-current="page"
                >
                  Listings
                </li>
              </ul>
            </div>
            <Link href="/listing-add" className="inline-flex items-center space-x-2 bg-[#947e03] text-white px-4 py-2 rounded hover:bg-[#826d02] transition">
            <span className="text-lg">+</span>
            <span>Add Listing</span>
            </Link>
          </div>

          {loading ? (
            <p className="mt-6 text-center">Loading listings...</p>
          ) : error ? (
            <p className="mt-6 text-center text-red-600">{error}</p>
          ) : listings.length === 0 ? (
            <p className="mt-6 text-center">No listings found.</p>
          ) : (
            <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 mt-6 gap-6">
              {currentListings.map((item, index) => (
                <div className="group relative" key={item.id || index}>
                  <div className="relative overflow-hidden shadow-sm dark:shadow-gray-700 group-hover:shadow-lg rounded-md duration-500">
                    {item.images?.length > 0 ? (
                        <Image
                            src={item.images[0]?.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            alt="Listing Image"
                        />
                   ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                             No Image
                        </div>
                         )}
                  </div>

                  {/* Update and Delete buttons */}
                  <div className="absolute top-2 right-2 flex space-x-2 z-10">
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="p-2 bg-[#000000] hover:bg-[#947e03] text-white rounded"
                      title="Update Listing"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => confirmDelete(item.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded"
                      title="Delete Listing"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  <div className="content p-6">
                    <h5 className="title text-lg font-medium">
                      {item.address || "Untitled Property"}
                    </h5>

                    <ul className="py-3 border-y border-gray-100 dark:border-gray-800 flex items-center list-none text-sm mt-2">
                      <li className="flex items-center me-15">
                        <span className="text-1xl me-0.5 text-[#947e03]">Size:</span>
                        <span>{item.size || "N/A"} m²</span>
                      </li>
                      <li className="flex items-center me-15">
                        <span className="text-1xl me-0.5 text-[#947e03]">Beds:</span>
                        <span>{item.beds || 0}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-1xl me-0.5 text-[#947e03]">Bath:</span>
                        <span>{item.baths || 0}</span>
                      </li>
                      {/* <li className="flex items-center">
                        <span className="text-1xl me-0.5 text-[#947e03]">Type:</span>
                        <span>{item.type || 0}</span>
                      </li> */}
                    </ul>

                    <div className="mt-2 flex justify-between items-center">
                      <span>Price:</span><p className="text-green-600 mr-45 text-md font-medium">{Number(item.price).toLocaleString()} Birr</p>
                      <ul className="font-medium text-amber-400 list-none">
                        {/* {[...Array(5)].map((_, i) => (
                          <li key={i} className="inline">
                            <i className="mdi mdi-star"></i>
                          </li>
                        ))} */}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              <MdKeyboardArrowLeft size={20} />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page ? "bg-[#947e03] text-white" : "hover:bg-indigo-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              <MdKeyboardArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className="bg-white dark:bg-slate-900 rounded p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this listing?</p>
            {deleteError && <p className="mb-4 text-red-600">{deleteError}</p>}
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <Switcher />
    </Wrapper>
  );
}
