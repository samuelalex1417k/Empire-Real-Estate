"use client";
import React, { useState, useEffect } from "react";
import * as Icon from "react-feather";

export default function BlogComment({ blogId }) {
  const [formData, setFormData] = useState({
    user_name: "",
    content: "",
  });
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [userToken, setUserToken] = useState(null);

  // Load token and username from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

    setUserToken(token);
    setFormData((prev) => ({
      ...prev,
      user_name: username || "",
    }));

    if (!blogId) return;

    fetch(`${API_URL}/blogs/${blogId}/comments/`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(() => setComments([]));
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.content.trim()) {
      setMessage({ type: "error", text: "Comment cannot be empty" });
      return;
    }

    if (!userToken) {
      setMessage({ type: "error", text: "You must be logged in to comment" });
      return;
    }

     const user_name = localStorage.getItem("username");
  if (!user_name) {
    setMessage({ type: "error", text: "Username not found in localStorage" });
    return;
  }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`http://localhost:8000/api/blogs/${blogId}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          content: formData.content,
          user_name: formData.user_name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend error:", data);
        setMessage({ type: "error", text: data.detail || "Failed to submit comment" });
        return;
      }

      setComments((prev) => [...prev, data]);
      setFormData((prev) => ({ ...prev, content: "" }));
      setMessage({ type: "success", text: "Comment submitted successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800 mt-8">
      <h5 className="text-lg font-semibold">Leave A Comment:</h5>

      {userToken ? (
        <form onSubmit={handleSubmit} className="mt-8" noValidate>
          <div className="grid grid-cols-1">
            <div className="mb-5">
              <div className="text-start">
                <label htmlFor="content" className="font-semibold">
                  Your Comment:
                </label>
                <div className="form-icon relative mt-2">
                  <Icon.MessageCircle className="size-4 absolute top-3 start-4" />
                  <textarea
                    name="content"
                    id="content"
                    className="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-[#947e03] dark:border-gray-800 dark:focus:border-[#947e03] focus:ring-0"
                    placeholder="Message :"
                    value={formData.content}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {message && (
            <div
              className={`mb-4 font-semibold ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            id="submit"
            name="send"
            className={`py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded-md w-full ${
              loading
                ? "bg-gray-400 border-gray-400 cursor-not-allowed text-white"
                : "bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      ) : (
        <p className="mt-4 italic text-red-600">
          You must be logged in to leave a comment.
        </p>
      )}

      {/* Existing Comments */}
      <div className="mt-10">
        <h6 className="text-lg font-semibold mb-4">Comments ({comments.length})</h6>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="mb-4 border-b pb-3">
              <p className="font-semibold">{comment.user_name || "User"}</p>
              <p>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
