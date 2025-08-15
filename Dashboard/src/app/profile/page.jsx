'use client'
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Footer from "../components/footer";
import Switcher from "../components/switcher";
import Wrapper from "../components/wrapper";
import * as Icon from 'react-feather';
import { FiUser, FiCamera } from "react-icons/fi";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:8000/api/adminpanel/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function ProfileImageUpload() {
  const { user, setUser } = useContext(UserContext);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/adminpanel/profile/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload");

      const data = await res.json();
      setUser(prev => ({ ...prev, profile_picture: data.profile_picture }));
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const profilePicSrc = user?.profile_picture
    ? (user.profile_picture.startsWith("http")
        ? user.profile_picture
        : `http://localhost:8000${user.profile_picture}`)
    : null;

  return (
    <div 
      className="relative ml-19 w-24 h-24 rounded-full ring-4 ring-[#fffffff] dark:ring-slate-800 shadow overflow-hidden cursor-pointer group"
      onClick={handleClick}
      title="Click to change profile picture"
    >
      {profilePicSrc ? (
        <Image src={profilePicSrc} alt="Profile" fill sizes="96px" className="object-cover rounded-full"/>
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-slate-700 rounded-full">
          <FiUser className="text-4xl text-gray-500 dark:text-white" />
        </div>
      )}
      <div className="absolute h-10 mt-15 inset-0 bg-[#00000046] bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
        <FiCamera size={24} className="text-white" />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      {uploading && (
        <p className="absolute bottom-0 w-full text-center text-xs text-slate-400 bg-black bg-opacity-50 rounded-b-md">
          Uploading...
        </p>
      )}
    </div>
  );
}

function ProfileContent() {
  const { user, loading, error } = useContext(UserContext);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-center text-red-500">Error: {error}</p>;
  if (!user) return <p className="p-4 text-center">No user data</p>;

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="grid md:grid-cols-12 grid-cols-1">
            <div className="xl:col-span-3 lg:col-span-4 md:col-span-4 mt-6">
              <div className="p-6 relative rounded-md shadow-sm dark:shadow-gray-700 bg-white dark:bg-slate-900">
                <div className="profile-pic text-center mb-5">
                  <ProfileImageUpload />
                  <div className="mt-4">
                    <h5 className="text-lg font-semibold">{user.full_name || user.user.username}</h5>
                    <p className="text-slate-400">{user.user.email}</p>
                    <p className="text-[#947e03] text-sm">{user.role ? user.role.toUpperCase() : "Admin"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-9 lg:col-span-8 md:col-span-8 mt-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="p-8 w-210 ml-10 rounded-md shadow-sm dark:shadow-[#947e03] bg-[#947e03] dark:bg-slate-900">
                  <p className="text-white mt-3"><b>Welcome {user.user.username}!</b></p>
                </div>

                <div className="p-6 ml-10 rounded-md shadow-sm dark:shadow-gray-700 bg-white dark:bg-slate-900 h-fit">
                  <h5 className="text-xl font-semibold">Personal Details :</h5>
                  <div className="mt-6 space-y-4">
                    <Detail icon={<Icon.User />} title="Full Name" content={user.full_name || "N/A"} />
                    <Detail icon={<Icon.User />} title="Username" content={user.user.username} />
                    <Detail icon={<Icon.Mail />} title="Email" content={user.user.email} />
                    <Detail icon={<Icon.Phone />} title="Phone" content={user.phone_number || "Not provided"} />
                    <Detail icon={<Icon.Shield />} title="Role" content={user.role ? user.role.toUpperCase() : "ADMIN"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Switcher />
    </Wrapper>
  );
}

function Detail({ icon, title, content }) {
  return (
    <div className="flex items-center">
      <div className="text-[#947e03] me-3">{icon}</div>
      <div className="flex-1">
        <h6 className="text-[#947e03] dark:text-white font-medium mb-0">{title} :</h6>
        <p className="text-slate-400 mb-0">{content}</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <UserProvider>
      <ProfileContent />
    </UserProvider>
  );
}
