import React from "react";
import Link from "next/link";
import Image from "next/image";

import Footer from "../components/footer";
import Switcher from "../components/switcher";

import { blogData } from "../data/data";
import AddBlog from "../blog-add/page";
import Wrapper from "../components/wrapper";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
 
export default function Page() {
  return (
    <Wrapper>
        <div className="container-fluid relative px-3">
            <div className="layout-specing">
                <div className="md:flex justify-between items-center">
                    <div>
                        <h5 className="text-lg font-semibold">Blogs / News</h5>

                        <ul className="tracking-[0.5px] inline-flex items-center mt-2">
                            <li className="inline-block capitalize text-[14px] font-bold duration-500 dark:text-white/70 hover:text-[#947e03] dark:hover:text-white"><Link href="/">Techwind</Link></li>
                            <li className="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><MdKeyboardArrowRight/></li>
                            <li className="inline-block capitalize text-[14px] font-bold text-[#947e03] dark:text-white" aria-current="page">Blogs</li>
                        </ul>
                    </div>

                    <AddBlog/>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-6 gap-6">
                    {blogData.map((item,index)=>{
                        return(
                        <div className="relative rounded-md shadow-sm dark:shadow-gray-700 overflow-hidden bg-white dark:bg-slate-900" key={index}>
                            <Image src={item.image} width={0} height={0} sizes="100vw" placeholder="blur" blurDataURL={item.image} style={{width:'100%', height:'auto'}} alt=""/>

                            <div className="content p-6">
                                <Link href={`/blog-detail/${item.id}`} className="title h5 text-lg font-medium hover:text-[#947e03] duration-500">{item.title}</Link>
                                <p className="text-slate-400 mt-3">{item.desc}</p>
                                
                                <div className="mt-4">
                                    <Link href={`/blog-detail/${item.id}`} className="relative inline-flex items-center tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 font-normal hover:text-[#947e03] after:bg-[#947e03] duration-500">Read More <FiArrowRight className="ms-1 text-sm"/></Link>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>


                <div className="flex justify-end mt-6">
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <Link href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">
                                    <MdKeyboardArrowLeft className="text-[20px] rtl:rotate-180 rtl:-mt-1"/>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">1</Link>
                            </li>
                            <li>
                                <Link href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">2</Link>
                            </li>
                            <li>
                                <Link href="#" aria-current="page" className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-[#947e03] border border-[#947e03]">3</Link>
                            </li>
                            <li>
                                <Link href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">4</Link>
                            </li>
                            <li>
                                <Link href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">5</Link>
                            </li>
                            <li>
                                <Link href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">
                                    <MdKeyboardArrowRight className="text-[20px] rtl:rotate-180 rtl:-mt-1"/>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <Footer/>
        <Switcher/>
    </Wrapper>
    
  )
}
