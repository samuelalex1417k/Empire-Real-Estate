'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/footer";
import Switcher from "../../components/switcher";
import Wrapper from "../../components/wrapper";
import { MdKeyboardArrowRight } from 'react-icons/md';

export default function EditNewsletterPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
    const [realImageFile, setRealImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch newsletter content on load
  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/newsletters/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch newsletter content");
        const data = await res.json();
        setFormData({
          title: data.title || "",
          description: data.description || "",
          image: data.image || "",
          content: data.content || "",
          author: data.author || "",
        });
         setImagePreview(data.image || null);
      } catch (err) {
        alert("Failed to load newsletter content.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletter();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRealImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in.");
      return;
    }

     const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("content", formData.content);
    form.append("author", formData.author);
    if (realImageFile) form.append("image", realImageFile);

    try {
      const res = await fetch(`http://localhost:8000/api/newsletters/${id}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (res.ok) {
        alert("Newsletter content updated successfully!");
        window.location.href = "/newsletter";
      } else {
        const data = await res.json();
        alert("Error updating newsletter content: " + (data.detail || "Unknown"));
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <Wrapper>
      <div className="container-fluid relative px-20">
        <div className="layout-specing">
          <div className="md:flex justify-between items-center mb-6">
            <div>
              <h5 className="text-lg font-semibold">Edit Newsletter Content</h5>
              <ul className="tracking-[0.5px] inline-flex items-center mt-2">
                <li className="text-[14px] font-bold text-[#947e03]">
                  <Link href="/">Dashboard</Link>
                </li>
                <li className="mx-1 text-base">
                  <MdKeyboardArrowRight />
                </li>
                <li className="text-[14px] font-bold">Edit</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded p-6 -mt-140 shadow">
                   {imagePreview && (
                                <Image
                                  src={imagePreview}
                                  width={0}
                                  height={0}
                                  sizes="100vw"
                                  style={{ width: "50%", height: "auto" }}
                                  alt="Preview"
                                  className="rounded mb-4"
                                />
                              )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />  
          
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

         <div>
          <label className="block font-medium mb-1">Article Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={10}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Write the full article here..."
          />
        </div>
          

          <div className="mt-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
          <label className="block font-medium mb-1">Article Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={10}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Write the full article here..."
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Author Name</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g. Samuel Alemseged"
          />
        </div>

          <button
            type="submit"
            className="mt-6 bg-[#947e03] text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
      <Switcher />
    </Wrapper>
  );
}
