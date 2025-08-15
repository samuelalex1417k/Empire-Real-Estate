'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import Wrapper from "../components/wrapper";
import Footer from "../components/footer"; 
import Switcher from "../components/switcher";

export default function AddBlogPage() {
  const [uploadFile, setUploadFile] = useState(null);
  const [fileObj, setFileObj] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    if (event.target.files && event.target.files.length !== 0) {
      setUploadFile(URL.createObjectURL(event.target.files[0]));
      setFileObj(event.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!title || !description || !content || !author || !fileObj) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("image", fileObj);

    try {
      const res = await fetch("http://localhost:8000/api/newsletters/", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("NewsLetter posted successfully!");
        window.location.href = "/newsletter";
      } else {
        const data = await res.json();
        alert("Error posting NewsLetter: " + (data.detail || "Unknown"));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="md:flex justify-between items-center mb-6">
            <div>
              <h5 className="text-lg font-semibold">Add New Blog</h5>
              <ul className="tracking-[0.5px] inline-flex items-center mt-2">
                <li className="text-[14px] font-bold text-[#947e03]">
                  <Link href="/newsletter">NewsLetter</Link>
                </li>
                <li className="mx-1 text-base">
                  <MdKeyboardArrowRight />
                </li>
                <li className="text-[14px] font-bold">Add Newsletter</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded p-8 shadow">
            <label className="block font-semibold mb-2">Upload Image:</label>

            <div className="w-full border-2 border-dashed border-gray-300 p-6 text-center rounded mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                id="upload"
              />
              <label htmlFor="upload" className="cursor-pointer text-gray-600">
                {uploadFile ? "Change Image" : "Click to upload"}
              </label>
            </div>

            {uploadFile && (
              <div className="mb-4">
                <Image
                  src={uploadFile}
                  alt="Preview"
                  width={500}
                  height={300}
                  className="rounded"
                />
              </div>
            )}

            <div className="grid gap-4">
              <div>
                <label className="block font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="News title"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Short description"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Main Article</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Write full News here..."
                  rows={5}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Author name"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-60 py-3 bg-[#947e03] text-white rounded-md hover:bg-[#826d02] transition"
            >
              {loading ? "Posting..." : "Submit Blog"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
      <Switcher />
    </Wrapper>
  );
}
