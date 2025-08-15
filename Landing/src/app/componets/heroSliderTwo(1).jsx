"use client"
import React from "react"
import Link from "next/link"

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

export default function HeroSliderTwo(){
    return(
        <div className="swiper-container swiper-container-initialized swiper-container-horizontal h-full">
                <Swiper
                    className='swiper-wrapper'
                    slidesPerView={1}
                    onSwiper={(swiper) => console.log(swiper)}
                    modules={[Autoplay]}
                    navigation={true}
                    autoplay={true}
                    speed={3000}
                >
                    <SwiperSlide>
                        <div className="swiper-slide flex items-center overflow-hidden" style={{ backgroundImage: `url('/images/corporate/1.jpg')` }}>
                            <div className="slide-inner slide-bg-image flex items-center bg-center w-full h-full" >
                                <div className="absolute inset-0 bg-slate-900/70"></div>
                                <div className="container relative h-full flex justify-center items-center">
                                    <div className="grid grid-cols-1">
                                        <div className="text-center">
                                            <h1 className="font-semibold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5">Discover the world of <br /> business</h1>
                                            <p className="text-white/70 text-lg max-w-xl mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS v4.x html page.</p>

                                            <div className="mt-6">
                                                <Link href="#" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-md">Contact us</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-slide flex items-center overflow-hidden" style={{ backgroundImage: `url('/images/corporate/2.jpg')` }}>
                            <div className="slide-inner slide-bg-image flex items-center bg-center w-full h-full" >
                                <div className="absolute inset-0 bg-slate-900/70"></div>
                                <div className="container relative h-full flex justify-center items-center">
                                    <div className="grid grid-cols-1">
                                        <div className="text-center">
                                            <h1 className="font-semibold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5">Meet our brand <br /> new solution</h1>
                                            <p className="text-white/70 text-lg max-w-xl mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS v4.x html page.</p>

                                            <div className="mt-6">
                                                <Link href="#" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-md">Get Started</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
    )
}