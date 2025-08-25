'use client'
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import Navbar from '../componets/Navbar/navbar';
import Footer from '../componets/Footer/footer';
import Switcher from '../componets/switcher';
import CookieModal from '../componets/cookieModal';
import MasonryBlog from '../componets/blog/masonryBlog';
import * as Icon from 'react-feather';
import { FaArrowRight, FaRegEnvelope } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { motion } from 'framer-motion';

export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs/`);
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/newsletters/');
        const data = await res.json();
        setNewsletters(data);
      } catch (error) {
        console.error('Failed to fetch newsletters:', error);
      }
    };
    fetchNewsletters();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/subscribe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setMessage(data.email?.[0] || 'Subscription failed');
      } else {
        setEmail('');
        setMessage('Subscribed successfully!');
      }
    } catch (err) {
      setMessage('Network error');
    }
  };

  return (
    <>
      <Navbar navClass="nav-light" />

      <motion.section
        className="relative md:pt-60 pt-40 md:pb-74 pb-56 flex items-center bg-center bg-no-repeat bg-cover jarallax bg-fixed"
        style={{ backgroundImage: "url('/images/blog/bg1.jpg')" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[#452f0c]/40"></div>
        <div className="container relative">
          <motion.div
            className="md:flex justify-center mt-10"
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          >
            <div className="w-full">
              <span className="flex items-center">
                <Image src="/images/client/05.jpg" width={32} height={32} className="h-8 rounded-full shadow-sm dark:shadow-gray-800" alt="" />
                <span className="ms-1 text-lg">
                  <span className="text-white/80 mx-1">by</span>
                  <Link href="#" className="text-white">Cristino Loly</Link>
                </span>
                <span className="ms-1 text-lg">
                  <span className="text-white/80 mx-1">in</span>
                  <Link href="#" className="text-white">Business</Link>
                </span>
              </span>

              <Link href="#" className="font-bold text-white leading-snug text-[30px] lg:text-[42px] mt-6 block">
                Establishing that <br /> you have something to say
              </Link>

              <div className="mt-8"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="relative">
        <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
          <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <section className="relative md:py-45 py-16">
        <MasonryBlog />

        {/* Subscription Section */}
        <motion.div className="container relative mt-16"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <div className="relative bg-white dark:bg-slate-900 lg:px-8 px-6 py-10 rounded-xl shadow-sm dark:shadow-gray-800 overflow-hidden">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
              <div className="md:text-start text-center z-1">
                <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Subscribe to Newsletter!</h3>
                <p className="text-slate-400 max-w-xl mx-auto mt-2">Subscribe to get latest updates and information.</p>
              </div>

              <div className="subcribe-form z-1">
                <form onSubmit={handleSubscribe} className="relative max-w-xl">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pt-4 pe-40 pb-4 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800"
                    placeholder="Your Email Address :"
                  />
                  <button
                    type="submit"
                    className="py-2 px-5 inline-block font-semibold tracking-wide align-middle transition duration-500 ease-in-out text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-[#947e03] hover:bg-[#947e10] border border-[#947e03] hover:border-[#947e03] text-white rounded-full"
                  >
                    Subscribe
                  </button>
                </form>
                {message && (
                  <p className={`mt-2 text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                    {message}
                  </p>
                )}
              </div>
            </div>

            <div className="absolute -top-5 -start-5">
              <FaRegEnvelope className="lg:text-[150px] text-7xl text-slate-900/5 dark:text-white/5 -rotate-45" />
            </div>
            <div className="absolute -bottom-5 -end-5">
              <BsPencil className="lg:text-[150px] text-7xl text-slate-900/5 dark:text-white/5" />
            </div>

           
          </div>
        </motion.div>

        <motion.div className="container relative mt-16"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-center md:text-start">Newsletters</h3>
          <div className="grid md:grid-cols-12 grid-cols-1 mt-8 gap-[30px]">
            <div className="lg:col-span-8 md:col-span-6">
              <div className="grid grid-cols-1 gap-[30px]">
                {newsletters.slice(0, 7).map((item, index) => (
                  <motion.div
                    key={index}
                    className="blog relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className="lg:flex relative">
                      <div className="relative md:shrink-0">
                        <img className="h-full w-full object-cover lg:w-52 lg:h-56" src={item.image} alt={item.title} />
                      </div>
                      <div className="p-6 flex flex-col lg:h-56 justify-center">
                        <Link href={`/blog-detail/${item.id}`} className="title h5 text-lg font-medium hover:text-[#947e03] duration-500 ease-in-out">
                          {item.title}
                        </Link>
                        <div className="my-auto">
                          <p className="text-slate-400 mt-3">{item.description}</p>
                        </div>
                        <div className="mt-4">
                          <Link href={`/newsletter-detail/${item.id}`} className="relative inline-flex items-center font-normal tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 hover:text-[#947e03] after:bg-[#947e03] duration-500">
                            Read More <FaArrowRight className="ms-2 text-[10px]" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
      <Switcher />
    </>
  );
}
