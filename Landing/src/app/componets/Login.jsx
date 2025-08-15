import React, { useState } from "react";

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (fetch / API call, save token, etc.)
    console.log("Logging in with", email, password);
    onClose(); // close modal on success or after action
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-md max-w-sm w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">
              Email Address:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded bg-transparent dark:bg-slate-900 dark:text-white"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-1">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded bg-transparent dark:bg-slate-900 dark:text-white"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#947e03] hover:bg-indigo-700 text-white py-2 rounded"
          >
            Login / Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
