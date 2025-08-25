'use client'

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../componets/Navbar/navbar";
import Footer from "../componets/Footer/footer";
import Switcher from "../componets/switcher";
import * as Icon from "react-feather";
import { MdKeyboardArrowRight } from "react-icons/md";
import { contactData } from "../Data/data";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import contactAnimation from "../../../public/animations/contact-animation.json";


export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || data.message || 'Failed to send message');
      }

      setMessage('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setMessage(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar navClass="nav-light" />

      <section className="relative table w-full py-36 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/company/aboutus.jpg')" }}>
        <div className="absolute inset-0 bg-[#452f0c]/40"></div>
        <div className="container relative">
          <motion.div
            className="grid grid-cols-1 pb-8 text-center mt-10"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            <h3 className="md:text-4xl text-3xl font-medium text-white">Contact Us</h3>
          </motion.div>
        </div>
        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="tracking-[0.5px] mb-0 inline-flex space-x-1">
            <li className="text-[13px] text-white/50 hover:text-white font-bold"><Link href="/">Justice Real Estate</Link></li>
            <li className="mx-0.5 text-white/50"><MdKeyboardArrowRight className="text-xl" /></li>
            <li className="text-[13px] font-bold text-white">Contact Us</li>
          </ul>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]"
            initial="hidden" animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {contactData.map((item, index) => {
              let Icons = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4 }}
                  className="text-center px-6 mt-6"
                >
                  <div className="w-20 h-20 bg-[#947e03]/5 text-[#947e03] rounded-xl text-3xl flex justify-center items-center shadow-xs dark:shadow-gray-800 mx-auto">
                    <Icons className="w-7 h-7" />
                  </div>
                  <div className="mt-7">
                    <h5 className="text-xl font-medium">{item.title}</h5>
                    <p className="text-slate-400 mt-3">{item.desc}</p>
                    <div className="mt-5">
                      <Link href={`tel:${item.contact}`} className="text-[#947e03] relative after:bg-[#947e03] hover:text-[#947e03]">
                        {item.contact}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="container relative md:mt-24 mt-16">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
            <motion.div
              className="lg:col-span-7 md:col-span-6"
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            >
              <Lottie animationData={contactAnimation} loop={true} style={{ width: "100%", height: "auto" }} />

            </motion.div>

            <motion.div
              className="lg:col-span-5 md:col-span-6"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            >
              <div className="lg:ms-5">
                <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm dark:shadow-gray-800 p-6">
                  <h3 className="mb-6 text-2xl font-medium">Get in touch !</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-12 lg:gap-6">
                      <div className="lg:col-span-6 mb-5">
                        <div className="relative mt-2">
                          <Icon.User className="size-4 absolute top-3 start-4" />
                          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name :" required
                            className="form-input ps-11 w-full h-10 border focus:border-[#947e03] dark:bg-slate-900" />
                        </div>
                      </div>
                      <div className="lg:col-span-6 mb-5">
                        <div className="relative mt-2">
                          <Icon.Mail className="size-4 absolute top-3 start-4" />
                          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email :" required
                            className="form-input ps-11 w-full h-10 border focus:border-[#947e03] dark:bg-slate-900" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1">
                      <div className="mb-5">
                        <div className="relative mt-2">
                          <Icon.Book className="size-4 absolute top-3 start-4" />
                          <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject :" required
                            className="form-input ps-11 w-full h-10 border focus:border-[#947e03] dark:bg-slate-900" />
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="relative mt-2">
                          <Icon.MessageCircle className="size-4 absolute top-3 start-4" />
                          <textarea name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Message :" required
                            className="form-input ps-11 w-full border focus:border-[#947e03] dark:bg-slate-900"></textarea>
                        </div>
                      </div>
                    </div>

                    <button type="submit" disabled={loading}
                      className="py-2 px-5 bg-[#947e03] hover:bg-[#947e039d] text-white rounded-md font-semibold">
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                  {message && (
                    <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                      {message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container-fluid relative">
        <div className="grid grid-cols-1">
          <div className="w-full leading-[0] border-0">
            <iframe
              title="google"
              src="https://www.google.com/maps?q=8.995667,38.747460&z=15&output=embed"
              style={{ border: 0 }}
              className="w-full h-[500px]"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
      <Switcher />
    </>
  );
}
