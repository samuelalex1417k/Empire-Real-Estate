'use client';

import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  createContext
} from 'react';

import Link from "next/link";
import Image from "next/image";
import Navbar from '../componets/Navbar/navbar';
import EcommerceNavbar from '../componets/Navbar/ecommerceNavbar';
import Switcher from '../componets/switcher';
import MobileApp from '../componets/mobileApp';
import ShopFooter from '../componets/Footer/shopFooter';
import Footer from '../componets/Footer/footer';
import AccountingTab from '../componets/shop/accountingTab';

import { MdKeyboardArrowRight } from 'react-icons/md';
import { FiUser, FiCamera } from 'react-icons/fi';

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

        const res = await fetch("http://localhost:8000/api/users/", {
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
  );S
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
      const res = await fetch("http://localhost:8000/api/users/profile/", {
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
      <div className="absolute h-10 mt-15 inset-0 bg-[#00000046] bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
    <>
      <Navbar navClass="nav-light" />
      <section className="relative table w-full py-20 lg:py-24 bg-[#947e0399] dark:bg-slate-800">
        <div className="container relative">
          <div className="grid grid-cols-1 mt-14">
            <h3 className="text-3xl leading-normal font-semibold">My Account</h3>
          </div>

          <div className="relative mt-3">
            <ul className="tracking-[0.5px] mb-0 inline-flex space-x-1">
              <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-[#947e03]">
                <Link href="/index-shop">Techwind</Link>
              </li>
              <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5">
                <MdKeyboardArrowRight className="text-xl" />
              </li>
              <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-[#947e03]" aria-current="page">
                My Account
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container">
          <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-3 md:col-span-5">
              <div className="flex items-center">
                <ProfileImageUpload />
                <div className="ms-2">
                  <p className="font-semibold text-slate-400">Hello,</p>

                  <h5 className="text-lg font-semibold">{user?.username || "Guest"}</h5>
                </div>
              </div>
            </div>
            <div className="lg:col-span-9 md:col-span-7">
              <p className="text-slate-400 max-w-xl">
                Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect.
              </p>
            </div>
            <AccountingTab />
          </div>
        </div>

      
      </section>

      <Footer />
      <Switcher />
    </>
  );
}

export default function Page() {
  return (
    <UserProvider>
      <ProfileContent />
    </UserProvider>
  );
}
