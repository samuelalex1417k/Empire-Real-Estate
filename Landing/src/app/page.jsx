"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./componets/Navbar/navbar";
import Footer from "./componets/Footer/footer";
import GetInTuct from "./componets/getInTuch";
import ListingCards from "./componets/real-estate/ListingCards";
import Form from "./componets/real-estate/form";
import Counter from "./componets/real-estate/counter";
import Clients from "./componets/real-estate/clients";
import { workData } from "./Data/data";
import { FaArrowRight } from "react-icons/fa";
import * as Icon from "react-feather";
import { motion } from "framer-motion";
import CompanyLogo from "./componets/companyLogo";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
};

const imageVariants = {
  hidden: { opacity: 0, x: -100 },   
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: 100 },   
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Page() {
  return (
    <>
      <Navbar navClass="nav-light" />

      <section className="relative mt-0">
        <div className="container-fluid relative md:mx-0 mx-0">
          <div className="relative pt-76 pb-60 table w-full rounded-1xl shadow-md overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="/images/3773486-hd_1920_1080_30fps.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="container relative z-10">
              <div className="grid grid-cols-1">
                <div className="md:text-start text-center">
                  <motion.h1
                    className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  >
                    Justice RealEstate <br /> Properties
                  </motion.h1>

                  <motion.p
                    className="text-white/70 text-xl max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  >
                    Start working with Tailwind CSS that can provide everything you
                    need to generate awareness, drive traffic, connect.
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:pb-24 pb-16">
        <motion.div
          className="container relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 justify-center">
            <div className="relative -mt-15">
              <Form />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="container relative md:mt-24 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
            <motion.div className="md:col-span-5" variants={imageVariants}>
              <div className="relative">
                <div className="p-5 shadow-sm dark:shadow-gray-800 w-full h-120 bg-gray-50 dark:bg-slate-800 rounded-4xl">
                  <video
                    className="shadow-lg absolute top-0 left-0 w-full h-full object-cover z-0 rounded-4xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source
                      src="/images/7578545-uhd_3840_2160_30fps.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </motion.div>

            <motion.div className="md:col-span-7" variants={textVariants}>
              <div className="lg:ms-4">
                <h4 className="mb-6 md:text-3xl text-2xl font-semibold">
                  Efficiency. Transparency. <br /> Control.
                </h4>
                <p className="text-slate-400 max-w-xl">
                  Techwind Homes developed a platform for the Real Estate marketplace
                  that allows buyers and sellers to easily execute a transaction on
                  their own. The platform drives efficiency, cost transparency and
                  control into the hands of the consumers. Techwind Homes is Real
                  Estate Redefined.
                </p>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-[#947e10] border-[#947e03] hover:border-[#947e10] text-white rounded-md mt-3"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="container relative md:mt-24 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="grid grid-cols-1 pb-8 text-center" variants={itemVariants}>
            <h3 className="mb-4 md:text-3xl text-2xl font-semibold">
              How It Works
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Start working with Tailwind CSS that can provide everything you need to
              generate awareness, drive traffic, connect.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            {workData.map((item, index) => {
              const Icons = item.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-md bg-white dark:bg-slate-900 overflow-hidden text-center"
                  variants={itemVariants}
                >
                  <div className="relative overflow-hidden text-transparent -m-3">
                    <Icon.Hexagon className="size-32 fill-[#947e03]/5 mx-auto" />
                    <div className="absolute inset-0 flex justify-center items-center text-[#947e03] text-4xl">
                      <Icons className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <h5 className="text-xl font-medium">{item.title}</h5>
                    <p className="text-slate-400 mt-3">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="container relative md:mt-24 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-3xl text-2xl font-semibold">
              Featured Properties
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Start working with Tailwind CSS that can provide everything you need to
              generate awareness, drive traffic, connect.
            </p>
          </div>

          <ListingCards />

          <div className="md:flex justify-center text-center mt-6">
            <Link
              href="/property-listing"
              className="relative inline-flex items-center font-semibold tracking-wide text-base text-[#947e03] hover:text-[#947e10] duration-500"
            >
              View More Properties <FaArrowRight className="ml-2 text-[10px]" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="container relative md:mt-24 mt-16 lg:pt-24 pt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={itemVariants}
        >
          <div
            className="absolute inset-0 opacity-25 dark:opacity-50 bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: "url('/images/map.png')" }}
          ></div>

          <div className="relative grid grid-cols-1 pb-8 text-center z-10">
            <h3 className="mb-6 md:text-3xl text-2xl font-semibold text-black dark:text-white">
              Trusted by more than 10K users
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Start working with Tailwind CSS that can provide everything you need to
              generate awareness, drive traffic, connect.
            </p>
          </div>
          <Counter />
        </motion.div>

        {/* Clients */}
        <motion.div
          className="container relative md:py-24 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-3xl text-2xl font-semibold">
              What Our Clients Say
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Start working with Tailwind CSS that can provide everything you need to
              generate awareness, drive traffic, connect.
            </p>
          </div>
          <Clients />
        </motion.div>

        <motion.div
          className="container relative md:py-24 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={itemVariants}
        >
          <GetInTuct />
        </motion.div>
      </section>

      <CompanyLogo />
      <Footer />
    </>
  );
}
