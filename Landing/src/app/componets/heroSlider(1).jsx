"use client"
import React from "react"
import Link from "next/link"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Autoplay } from "swiper/modules";

export default function HeroSlider(){
    return(
        <section id="controls-carousel" className="relative">
            <Swiper className="overflow-hidden relative h-screen inset-0" modules={[Autoplay]} autoplay={true} loop={true} speed={3000}>
                <SwiperSlide className="flex items-center justify-center duration-700 ease-in-out overflow-hidden">
                    <div className="image-wrap absolute inset-0 -top-[350px] -bottom-[350px] -start-[100px] -end-[100px] min-w-full w-auto min-h-full h-auto overflow-hidden m-auto z-1 bg-top bg-no-repeat bg-cover" style={{backgroundImage:`url('/images/business/bg01.jpg')`}}></div>
                    <div className="absolute inset-0 ltr:md:bg-gradient-to-r rtl:md:bg-gradient-to-l md:from-slate-900 md:via-slate-900/80 md:bg-slate-900/20 bg-slate-900/70 z-2"></div>
                    <div className="container relative z-3 h-full flex items-center">
                        <div className="grid grid-cols-1 mt-10">
                            <div className="md:text-start text-center">
                                <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Take Care of Your Future</h1>
                                <p className="text-white/70 text-lg max-w-xl">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS v4.x html page.</p>
                                
                                <div className="mt-8">
                                    <Link href="#" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-md">Contact us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="flex items-center justify-center duration-700 ease-in-out overflow-hidden">
                    <div className="absolute inset-0 image-wrap z-1 bg-top bg-no-repeat bg-cover" style={{backgroundImage:`url('/images/business/bg02.jpg')`}}></div>
                    <div className="absolute inset-0 ltr:md:bg-gradient-to-r rtl:md:bg-gradient-to-l md:from-slate-900 md:via-slate-900/80 md:bg-slate-900/20 bg-slate-900/70 z-2"></div>
                    <div className="container relative z-3 h-full flex items-center justify-center">
                        <div className="grid grid-cols-1 mt-10">
                            <div className="text-center">
                                <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Let's Start With Techwind</h1>
                                <p className="text-white/70 text-lg max-w-xl mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS v4.x html page.</p>
                                
                                <div className="mt-8">
                                    <Link href="#" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-md">See Services</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="flex items-center justify-center duration-700 ease-in-out overflow-hidden">
                    <div className="absolute inset-0 image-wrap z-1 bg-top bg-no-repeat bg-cover" style={{backgroundImage:`url('/images/business/bg03.jpg')`}}></div>
                    <div className="absolute inset-0 ltr:md:bg-gradient-to-r rtl:md:bg-gradient-to-l md:from-slate-900 md:via-slate-900/80 md:bg-slate-900/20 bg-slate-900/70 z-2"></div>
                    <div className="container relative z-3 h-full flex items-center justify-end">
                        <div className="grid grid-cols-1 mt-10">
                            <div className="md:text-end text-center">
                                <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Build and Grow Your Business</h1>
                                <p className="text-white/70 text-lg max-w-xl md:ms-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS v4.x html page.</p>
                                
                                <div className="mt-8">
                                    <Link href="#" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-md">Pricing Plans</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>

        
    )
}