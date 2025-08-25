"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from 'react-feather';

import {
  FaRegEnvelope, FaDribbble, FaLinkedin, FaFacebookF,
  FaInstagram, FaTwitter, FaRegFile, FaBehance
} from 'react-icons/fa';
import { PiShoppingCart } from "react-icons/pi"
import { MdKeyboardArrowRight } from "react-icons/md"
import { FaTelegram } from 'react-icons/fa6';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/subscribe/`, {
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

  const footerLinks = [
    { liClass: '', route: '/page-terms', title: 'Terms of Services' },
    { liClass: 'mt-[10px]', route: '/page-privacy', title: 'Privacy Policy' },
  ];

  const footerCompany = [
    { liClass: '', route: '/page-aboutus', title: 'About us' },
    { liClass: 'mt-[10px]', route: '/page-services', title: 'Services' },
    { route: '/page-team', title: 'Team', liClass: 'mt-[10px]' },
    { route: '/page-pricing', title: 'Pricing', liClass: 'mt-[10px]' },
    { route: '/blog', title: 'Blog', liClass: 'mt-[10px]' },
  ];

  return (
    <footer className="relative bg-[#000000] dark:bg-[#000000] text-gray-200 dark:text-gray-200">
      <div className="container relative">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="py-[60px] px-0">
              <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">

                {/* Logo + About */}
                <div className="lg:col-span-4 md:col-span-12">
                  <Link href="/" className="text-[22px] h-1 bg-white focus:outline-none">
                    <h5><span className="text-[#947e03] font-worksans"><b>Justice</b></span> <span className="text-1xl font-worksans">Real estate</span></h5>
                  </Link>
                  <p className="mt-6 text-gray-300">
                    Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect.
                  </p>
                  <ul className="list-none mt-5 space-x-1 space-y-1">
                    {[
                      { href: 'https://1.envato.market/techwind-next', icon: <PiShoppingCart /> },
                      { href: 'https://www.behance.net/shreethemes', icon: <FaBehance /> },
                      { href: 'https://dribbble.com/shreethemes', icon: <FaDribbble /> },
                      { href: 'http://linkedin.com/company/shreethemes', icon: <FaLinkedin /> },
                      { href: 'https://www.facebook.com/shreethemes', icon: <FaFacebookF /> },
                      { href: 'https://www.instagram.com/shreethemes/', icon: <FaInstagram /> },
                      { href: 'https://twitter.com/shreethemes', icon: <FaTwitter /> },
                      { href: 'mailto:support@shreethemes.in', icon: <FaRegEnvelope /> },
                      { href: 'https://forms.gle/QkTueCikDGqJnbky9', icon: <FaRegFile /> },
                      { href: 'https://forms.gle/QkTueCikDGqJnbky9', icon: <FaTelegram /> },
                    ].map((item, index) => (
                      <li key={index} className="inline">
                        <Link href={item.href} target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-800 dark:border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#947e03] hover:bg-[#947e03]">
                          {item.icon}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Links */}
                <div className="lg:col-span-2 md:col-span-4">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">Company</h5>
                  <ul className="list-none footer-list mt-6">
                    {footerCompany.map((data, index) => (
                      <li key={index} className={data.liClass}>
                        <Link href={data.route} className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out flex items-center">
                          <MdKeyboardArrowRight className="text-xl me-1" /> {data.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Useful Links */}
                <div className="lg:col-span-3 md:col-span-4">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">Useful Links</h5>
                  <ul className="list-none footer-list mt-6">
                    {footerLinks.map((data, index) => (
                      <li key={index} className={data.liClass}>
                        <Link href={data.route} className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out flex items-center">
                          <MdKeyboardArrowRight className="text-xl me-1" /> {data.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Newsletter Form */}
                <div className="lg:col-span-3 md:col-span-4">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">Newsletter</h5>
                  <p className="mt-6">Sign up and receive the latest tips via email.</p>
                  <form onSubmit={handleSubscribe}>
                    <div className="grid grid-cols-1">
                      <div className="foot-subscribe my-3">
                        <label className="form-label">Write your email <span className="text-red-600">*</span></label>
                        <div className="form-icon relative mt-2">
                          <Icon.Mail className="size-4 absolute top-3 start-4" />
                          <input
                            type="email"
                            className="form-input ps-12 rounded w-full py-2 px-3 h-10 bg-[#947e034b] dark:bg-gray-700 border-0 text-gray-100 focus:shadow-none focus:ring-0"
                            placeholder="Email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        id="submitsubscribe"
                        name="send"
                        className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-[#947e03d1] border-[#322b00] hover:border-[#947e03d1] text-white rounded-md"
                      >
                        Subscribe
                      </button>
                      {message && (
                        <p className="text-sm mt-2 text-white">{message}</p>
                      )}
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-[30px] px-0 border-t border-gray-800 dark:border-gray-700">
        <div className="container relative text-center">
          <div className="grid md:grid-cols-2 items-center">
            <div className="md:text-start text-center">
              <p className="text-gray-500 mb-0">Powerd by Addis Click</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
