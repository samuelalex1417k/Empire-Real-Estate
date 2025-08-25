"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import Navbar from '../componets/Navbar/navbar';
import Footer from '../componets/Footer/footer';
import Switcher from '../componets/switcher';
import CompanyLogo from '../componets/companyLogo';
import KeyFeature from '../componets/keyFeatures';
import VideoModal from '../componets/videoModal/videoModal';
import Clients from '../componets/AboutUs/clients';
import Counter from '../componets/AboutUs/about-counter';
import * as Icon from 'react-feather';
import { teamData } from '../Data/data';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaRegEnvelope } from 'react-icons/fa';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <>
      <Navbar navClass="nav-light" />

      <motion.section
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="relative table w-full py-36 lg:py-44 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/images/company/aboutus.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#452f0c]/40"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center mt-10">
            <motion.h3 className="mb-6 md:text-4xl text-3xl font-medium text-white" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              About Us
            </motion.h3>
            <motion.p className="text-slate-300 text-lg max-w-xl mx-auto" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect.
            </motion.p>
          </div>
        </div>
      </motion.section>

      <div className="relative">
        <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
          <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <motion.div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.2 }}>
            <motion.div className="lg:col-span-5 md:col-span-6" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-6">
                  <Image src="/images/about/ab03.jpg" width={0} height={0} sizes='100vw' style={{ width: "100%", height: "auto" }} className="shadow-sm rounded-md" alt="" />
                  <Image src="/images/about/ab02.jpg" width={0} height={0} sizes='100vw' style={{ width: "100%", height: "auto" }} className="shadow-sm rounded-md mt-6" alt="" />
                </div>
                <div className="col-span-6">
                  <Image src="/images/about/ab01.jpg" width={0} height={0} sizes='100vw' style={{ width: "100%", height: "auto" }} className="shadow-sm rounded-md" alt="" />
                </div>
              </div>
            </motion.div>

            <motion.div className="lg:col-span-7 md:col-span-6" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="lg:ms-5">
                <div className="flex mb-4">
                  <span className="text-[#947e03] text-2xl font-bold mb-0">
                    <CountUp className="counter-value text-6xl font-bold" end={15} />+
                  </span>
                  <span className="self-end font-medium ms-2">Years <br /> Experience</span>
                </div>
                <h3 className="mb-6 md:text-3xl text-2xl font-semibold">Who we are ?</h3>
                <p className="text-slate-400 max-w-xl">
                  Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect...
                </p>
                <div className="mt-6">
                  <Link href="/contact-one" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-[#947e03ac] border-[#947e03] hover:border-[#947e03ac] text-white rounded-md me-2 mt-2">
                    <FaRegEnvelope className="me-2 text-sm" /> Contact us
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="container relative mt-8">
          <CompanyLogo />
        </div>
      </section>

      <div className="md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
        <KeyFeature btnFill={true} />
      </div>

      <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800 md:pt-0 pt-0">
        <div className="container relative">
          <motion.div className="grid grid-cols-1 justify-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative z-1">
              <div className="grid lg:grid-cols-12 grid-cols-1 md:text-start text-center justify-center">
                <div className="lg:col-start-2 lg:col-span-10">
                  <div className="relative">
                    <Image src="/images/cta-bg.jpg" width={0} height={0} sizes='100vw' style={{ width: "100%", height: "auto" }} className="rounded-md shadow-lg" alt="" />
                    <VideoModal />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 start-0 end-0 sm:h-2/3 h-4/5 bg-gradient-to-b from-[#947e00] to-[#947e03]"></div>
      </section>

      <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800 md:pb-0 pb-0" id="team">
        <div className="container relative">
          <motion.div className="grid grid-cols-1 pb-8 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="mb-6 md:text-3xl text-2xl font-semibold">Our Professional Team</h3>
            <p className="text-slate-400 max-w-xl mx-auto">Start working with Tailwind CSS that can provide everything you need...</p>
          </motion.div>

          <div className="grid md:grid-cols-12 grid-cols-1 mt-8 gap-[30px]">
            {teamData.slice(0, 4).map((item, index) => (
              <motion.div key={index} className="lg:col-span-3 md:col-span-6"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}>
                <div className="team p-6 rounded-md border border-gray-100 dark:border-gray-700 bg-white dark:bg-slate-900">
                  <Image src={item.image} width={96} height={96} className="size-24 rounded-full shadow-md dark:shadow-gray-800" alt="" />
                  <div className="content mt-4">
                    <Link href="#" className="text-lg font-medium hover:text-[#947e03] block">{item.name}</Link>
                    <span className="text-slate-400 block">{item.title}</span>
                    <p className="text-slate-400 mt-4">{item.desc}</p>
                    <ul className="list-none mt-4 space-x-1">
                      <li className="inline"><Link href="#" className="team-icon"><Icon.Facebook /></Link></li>
                      <li className="inline"><Link href="#" className="team-icon"><Icon.Instagram /></Link></li>
                      <li className="inline"><Link href="#" className="team-icon"><Icon.Twitter /></Link></li>
                      <li className="inline"><Link href="#" className="team-icon"><Icon.Linkedin /></Link></li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="container relative md:mt-24 mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="grid md:grid-cols-12 grid-cols-1 items-center">
            <div className="lg:col-span-5 md:col-span-6 md:order-1 order-2">
              <div className="relative overflow-hidden after:content-[''] after:absolute after:h-40 after:w-40 after:bg-red-600/5 after:top-5 after:start-0 after:end-0 after:mx-auto after:-z-0 after:rounded-3xl after:animate-[spin_10s_linear_infinite]">
                <Image src="/images/hero2.png" width={0} height={0} sizes='100vw' style={{ width: "100%", height: "auto" }} className="relative z-1" alt="" />
              </div>
            </div>
            <div className="lg:col-span-7 md:col-span-6 md:order-2 order-1">
              <Clients />
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
      <Switcher />
    </>
  );
}
