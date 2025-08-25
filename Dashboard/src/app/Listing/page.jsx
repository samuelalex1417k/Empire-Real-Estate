'use client';
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import Footer from "../components/footer";
import Switcher from "../components/switcher";
import Wrapper from "../components/wrapper";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FiTrash2, FiEdit } from "react-icons/fi";

export default function Page() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 12;

  const [deleteId, setDeleteId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/listing/");
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();
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

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteError(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setDeleteError(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/listing/${deleteId}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setListings((prev) => prev.filter((listing) => listing.id !== deleteId));
        setDeleteId(null);
        if (currentListings.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
      } else {
        const data = await res.json();
        setDeleteError(data.detail || "Failed to delete listing.");
      }
    } catch (err) {
      setDeleteError("Error deleting listing. Please try again.");
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/listing-edit/${id}`;
  };

  return (
    <Wrapper>
      <div className="container mx-auto px-4 py-6" ref={containerRef}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h5 className="text-lg font-semibold">Property Listings</h5>
            <ul className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-300 mt-1">
              <li>
                <Link href="/Dashboard" className="hover:text-[#947e03]">Dashboard</Link>
              </li>
              <li><MdKeyboardArrowRight /></li>
              <li className="text-[#947e03] dark:text-white font-bold">Listings</li>
            </ul>
          </div>
          <Link href="/listing-add" className="inline-flex items-center space-x-2 bg-[#947e03] text-white px-4 py-2 rounded hover:bg-[#826d02] transition">
            <span className="text-lg">+</span>
            <span>Add Listing</span>
          </Link>
        </div>

        {/* Listings */}
        {loading ? (
          <p className="text-center mt-6">Loading listings...</p>
        ) : error ? (
          <p className="text-center text-red-600 mt-6">{error}</p>
        ) : listings.length === 0 ? (
          <p className="text-center mt-6">No listings found.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-3   gap-6 mt-6">
            {currentListings.map((item) => (
              <div key={item.id} className="group relative border rounded-md overflow-hidden shadow hover:shadow-lg transition flex flex-col">
                
                {/* Image */}
                <div className="relative w-full h-48 sm:h-56 md:h-52 lg:h-48">
                  {item.images?.length > 0 ? (
                    <Image
                      src={item.images[0]?.image}
                      fill
                      style={{ objectFit: "cover" }}
                      alt="Listing"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
                      No Image
                    </div>
                  )}
                </div>

                {/* Update/Delete Buttons */}
                <div className="absolute top-2 right-2 flex space-x-2 z-10">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="p-2 bg-black hover:bg-[#947e03] text-white rounded"
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

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="font-medium text-lg truncate">{item.address || "Untitled Property"}</h5>
                    <ul className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
                      <li>Size: <span className="text-[#947e03]">{item.size || "N/A"} m²</span></li>
                      <li>Beds: <span className="text-[#947e03]">{item.beds || 0}</span></li>
                      <li>Baths: <span className="text-[#947e03]">{item.baths || 0}</span></li>
                    </ul>
                  </div>
                  <p className="mt-4 font-medium text-green-600">{Number(item.price).toLocaleString()} Birr</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-8 gap-2">
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
                  className={`px-3 py-1 border rounded ${currentPage === page ? "bg-[#947e03] text-white" : "hover:bg-gray-100"}`}
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
        )}

        {/* Delete Modal */}
        {deleteId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
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

      </div>

      <Footer />
      <Switcher />
    </Wrapper>
  );
}
