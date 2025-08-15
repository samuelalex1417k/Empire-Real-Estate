'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from 'react-feather';
import { AiOutlineClose } from "react-icons/ai";

export default function AddNewsletter() {
  const [modal, setModal] = useState(false);
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
      setError("All fields except image are required.");
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
        alert("newsletter updated successfully!");
        window.location.href = "/newsletter";
      } else {
        const data = await res.json();
        alert("Error updating newsletter: " + (data.detail || "Unknown"));
      }
 

      setSuccess("newsletter created successfully!");
      setTitle("");
      setDescription("");
      setContent("");
      setAuthor("");
      setUploadFile(null);
      setFileObj(null);
      setModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Link
          href="#"
          onClick={() => setModal(true)}
          className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[20px] text-center bg-gray-800/5 hover:bg-gray-800/10 dark:bg-gray-800 border border-gray-800/5 dark:border-gray-800 text-slate-900 dark:text-white rounded-full"
        >
          + {/* You can replace this with an icon if you want */}
        </Link>
      </div>

      <div className={`fixed flex items-center justify-center overflow-hidden inset-0 m-auto bg-gray-900/75 z-9999 ${modal ? "" : "hidden"}`}>
        <div className="relative w-full h-auto max-w-lg p-4 max-h-screen overflow-y-auto">
          <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-sm dark:shadow-gray-700 max-h-full overflow-y-auto">

            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
              <h5 className="text-xl font-semibold">Add Newsletter Content</h5>
              <button
                type="button"
                onClick={() => setModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ms-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <AiOutlineClose className="size-5" />
              </button>
            </div>

            <div className="p-4">
              <div>
                <p className="font-semibold mb-4">Upload newsletter image (optional)</p>
                {uploadFile ? (
                  <div className="preview-box flex justify-center rounded-md shadow-sm overflow-hidden bg-gray-50 dark:bg-slate-800 text-slate-400 p-2 max-h-60">
                    <Image
                      src={uploadFile}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      alt="preview"
                    />
                  </div>
                ) : (
                  <div className="preview-box flex justify-center rounded-md shadow-sm overflow-hidden bg-gray-50 dark:bg-slate-800 text-slate-400 p-2 max-h-60">
                    Supports JPG/PNG. Max size: 10MB.
                  </div>
                )}
                <input type="file" id="input-file" hidden accept="image/*" onChange={handleChange} />
                <label htmlFor="input-file" className="btn-upload py-2 px-5 inline-block font-semibold tracking-wide border text-base bg-[#947e03] hover:bg-indigo-700 border-[#947e03] text-white rounded-md mt-6 cursor-pointer">
                  Upload Image
                </label>
              </div>

              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-12">
                    <label className="font-semibold">Title <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-input w-full py-2 px-3 h-10 bg-transparent border rounded mt-2"
                      placeholder="Title"
                    />
                  </div>

                  <div className="col-span-12">
                    <label className="font-semibold">Description <span className="text-red-600">*</span></label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-input w-full py-2 px-3 h-20 bg-transparent border rounded mt-2"
                      placeholder="Short description"
                    />
                  </div>

                  <div className="col-span-12">
                    <label className="font-semibold">Content <span className="text-red-600">*</span></label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="form-input w-full py-2 px-3 h-28 bg-transparent border rounded mt-2"
                      placeholder="Write the full content here..."
                    />
                  </div>

                  <div className="col-span-12">
                    <label className="font-semibold">Author <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="form-input w-full py-2 px-3 h-10 bg-transparent border rounded mt-2"
                      placeholder="Author name"
                    />
                  </div>

                  {error && <p className="text-red-500 col-span-12">{error}</p>}
                  {success && <p className="text-green-500 col-span-12">{success}</p>}

                  <div className="col-span-12">
                    <button
                      type="submit"
                      disabled={loading}
                      className="py-2 px-5 font-semibold bg-[#947e03] hover:bg-indigo-700 text-white rounded-md w-full"
                    >
                      {loading ? "Posting..." : "Create Newsletter Content"}
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
