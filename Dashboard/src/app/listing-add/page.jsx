"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import Footer from "../components/footer";
import Switcher from "../components/switcher";

export default function AddListing() {
  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const dropRef = useRef(null);

  const [amenities, setAmenities] = useState([]);
  const amenityOptions = ["Swimming Pool", "Gym", "Parking", "Wi-Fi", "Balcony", "Security"];

  const [formData, setFormData] = useState({
    address: "",
    price: "",
    label: "",
    size: "",
    type: "",
    beds: "",
    baths: "",
    garage: "",
    description: "",
  });

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setImageFiles((prev) => [...prev, ...newFiles]);
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const handleImagesChange = (event) => {
    handleFiles(event.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.remove("border-[#947e03]");
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("border-[#947e03]");
  };

  const handleDragLeave = () => {
    dropRef.current.classList.remove("border-[#947e03]");
  };

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ((name === "beds" || name === "baths") && value < 0) return;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please login first.");
      return;
    }
    if (imageFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    form.append("amenities", JSON.stringify(amenities));
    imageFiles.forEach((file) => form.append("images", file));

    try {
      const res = await fetch("http://localhost:8000/api/listing/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Listing added successfully!");
        window.location.href = "/Listing";
        setAmenities([]);
        setPreviewImages([]);
        setImageFiles([]);
      } else {
        alert(`Something went wrong: ${data.detail || "Unknown error"}`);
      }
    } catch (error) {
      alert("Something went wrong while connecting to the server.");
    }
  };

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="md:flex justify-between items-center mb-6">
            <div>
              <h5 className="text-lg font-semibold">Add New Listing</h5>
              <ul className="tracking-[0.5px] inline-flex items-center mt-2">
                <li className="text-[14px] font-bold text-[#947e03]">
                  <Link href="/Listing">Listing</Link>
                </li>
                <li className="mx-1 text-base">
                  <MdKeyboardArrowRight />
                </li>
                <li className="text-[14px] font-bold">Add Listing</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded p-8 shadow">
            <label className="block font-semibold mb-2">Upload images (drag or select):</label>

            <div
              ref={dropRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className="w-full border-2 border-dashed border-gray-300 p-6 text-center rounded cursor-pointer hover:border-[#947e03] transition mb-4"
            >
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="hidden"
                id="upload"
              />
              <label htmlFor="upload" className="cursor-pointer text-gray-600">
                Click or drag & drop images here
              </label>
            </div>

            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {previewImages.map((src, idx) =>
                  src ? (
                    <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
                      <Image src={src} alt={`Preview ${idx + 1}`} fill style={{ objectFit: "cover" }} />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1"
                      >
                        ✕
                      </button>
                    </div>
                  ) : null
                )}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { label: "Address", name: "address", type: "text", placeholder: "e.g. 123 Main St" },
                { label: "Price", name: "price", type: "number", placeholder: "5000" },
                { label: "Size (m²)", name: "size", type: "number", placeholder: "20" },
                { label: "Type", name: "type", type: "text", placeholder: "e.g. villa/apartment" },
                { label: "Status (optional)", name: "label", type: "text", placeholder: "e.g. New, Sold" },
                { label: "Beds", name: "beds", type: "number", placeholder: "3" },
                { label: "Baths", name: "baths", type: "number", placeholder: "2" },
                { label: "Garage", name: "garage", type: "number", placeholder: "1" },
                { label: "description", name:"description", type:"text", placeholder:""},
              ].map((field, index) => (
                <div key={index}>
                  <label className="block font-semibold mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full border px-3 py-2 rounded"
                    required={field.name !== "label"}
                  />
                </div>
              ))}
            </div>

            {/* Amenities */}
            <div className="col-span-2 mt-6">
              <label className="block font-semibold mb-2">Select Amenities</label>
              <div className="grid grid-cols-2 gap-2">
                {amenityOptions.map((item, idx) => (
                  <label key={idx} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={item}
                      checked={amenities.includes(item)}
                      onChange={() => handleAmenityToggle(item)}
                      className="accent-[#947e03]"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-60 py-3 bg-[#947e03] text-white rounded-md hover:bg-[#826d02] transition"
            >
              Submit Listing
            </button>
          </form>
        </div>
      </div>

      <Footer />
      <Switcher />
    </Wrapper>
  );
}
