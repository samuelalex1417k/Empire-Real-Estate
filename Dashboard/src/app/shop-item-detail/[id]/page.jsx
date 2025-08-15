"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";

import Footer from "../../components/footer";
import Switcher from "../../components/switcher";
import Qtn from "../../components/qtn";
import Wrapper from "../../components/wrapper";
import ProductDetailTab from "../../components/product-detail-tab";


import {BsCheckCircle} from 'react-icons/bs'
import { productData } from "../../data/data";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    let data = productData.find((product) => product.id === parseInt(params.id))

  return (
    <Wrapper>
        <div className="container-fluid relative px-3">
            <div className="layout-specing">
                <div className="md:flex justify-between items-center">
                    <h5 className="text-lg font-semibold">{data?.name}</h5>

                    <ul className="tracking-[0.5px] inline-flex items-center sm:mt-0 mt-3">
                        <li className="inline-block capitalize text-[14px] font-bold duration-500 dark:text-white/70 hover:text-[#947e03] dark:hover:text-white"><Link href="/">Techwind</Link></li>
                        <li className="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><MdKeyboardArrowRight/></li>
                        <li className="inline-block capitalize text-[14px] font-bold duration-500 dark:text-white/70 hover:text-[#947e03] dark:hover:text-white"><Link href="/shop">Shop</Link></li>
                        <li className="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><MdKeyboardArrowRight/></li>
                        <li className="inline-block capitalize text-[14px] font-bold text-[#947e03] dark:text-white" aria-current="page">{data?.name}</li>
                    </ul>
                </div>

                <div className="p-6 rounded-md mt-6 shadow-sm dark:shadow-gray-700 bg-white dark:bg-slate-900">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-6 items-center">
                        <div className="xl:col-span-4 lg:col-span-5 md:col-span-6">
                            <Image src={data?.image} width={0} height={0} sizes="100vw" placeholder="blur" blurDataURL={data?.image} style={{width:'100%', height:'auto'}} className="rounded-md shadow-sm dark:shadow-gray-800" alt="" />
                        </div>
    
                        <div className="xl:col-span-8 lg:col-span-7 md:col-span-6">
                            <div className="lg:ms-6">
                                <h5 className="text-2xl font-semibold">{data?.name}</h5>
                                <div className="mt-2">
                                    <span className="text-slate-400 font-semibold me-1">$16USD <del className="text-red-600">$21USD</del></span>
    
                                    <ul className="list-none inline-block text-orange-400">
                                        <li className="inline"><i className="mdi mdi-star text-lg"></i></li>
                                        <li className="inline"><i className="mdi mdi-star text-lg"></i></li>
                                        <li className="inline"><i className="mdi mdi-star text-lg"></i></li>
                                        <li className="inline"><i className="mdi mdi-star text-lg"></i></li>
                                        <li className="inline"><i className="mdi mdi-star text-lg"></i></li>
                                        <li className="inline text-slate-400 font-semibold">4.8 (45)</li>
                                    </ul>
                                </div>
    
                                <div className="mt-4">
                                    <h5 className="text-lg font-semibold">Overview :</h5>
                                    <p className="text-slate-400 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero exercitationem, unde molestiae sint quae inventore atque minima natus fugiat nihil quisquam voluptates ea omnis. Modi laborum soluta tempore unde accusantium.</p>
                                
                                    <ul className="list-none text-slate-400 mt-4">
                                        <li className="mb-1 flex items-center"><BsCheckCircle className="text-[#947e03] text-lg me-2"/> Digital Marketing Solutions for Tomorrow</li>
                                        <li className="mb-1 flex items-center"><BsCheckCircle className="text-[#947e03] text-lg me-2"/> Our Talented & Experienced Marketing Agency</li>
                                        <li className="mb-1 flex items-center"><BsCheckCircle className="text-[#947e03] text-lg me-2"/> Create your own skin to match your brand</li>
                                    </ul>
                                </div>
    
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4">
                                    <div className="flex items-center">
                                        <h5 className="text-lg font-semibold me-2">Size:</h5>
                                        <div className="space-x-1">
                                            <Link href="" className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md bg-[#947e03]/5 hover:bg-[#947e03] border-[#947e03]/10 hover:border-[#947e03] text-[#947e03] hover:text-white">S</Link>
                                            <Link href="" className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md bg-[#947e03]/5 hover:bg-[#947e03] border-[#947e03]/10 hover:border-[#947e03] text-[#947e03] hover:text-white">M</Link>
                                            <Link href="" className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md bg-[#947e03]/5 hover:bg-[#947e03] border-[#947e03]/10 hover:border-[#947e03] text-[#947e03] hover:text-white">L</Link>
                                            <Link href="" className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md bg-[#947e03]/5 hover:bg-[#947e03] border-[#947e03]/10 hover:border-[#947e03] text-[#947e03] hover:text-white">XL</Link>
                                        </div>
                                    </div>
    
                                    <Qtn/>
                                </div>
    
                                <div className="mt-4">
                                    <Link href="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-md me-2 mt-2">Shop Now</Link>
                                    <Link href="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded-md bg-[#947e03]/5 hover:bg-[#947e03] border-[#947e03]/10 hover:border-[#947e03] text-[#947e03] hover:text-white mt-2">Add to Cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProductDetailTab/>
                
            </div>
        </div>
        <Footer/>
        <Switcher/>
    </Wrapper>
   
  )
}
