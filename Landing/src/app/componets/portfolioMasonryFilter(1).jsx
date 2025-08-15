"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const AvailableProject = dynamic(()=>import('./availaleProject'));

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Fullscreen} from "yet-another-react-lightbox/plugins";

import { masonryimages } from '../Data/data';
import { mesonaryData } from '../Data/data';

import {MdKeyboardArrowRight,MdOutlineKeyboardArrowLeft} from "react-icons/md"


export default function PortfolioMasonryFilter({className,containerClass,columns }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isOpen, setisOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setisOpen(true);
    };
    const currentImage = masonryimages.map((img) => ({ src: img }))

    const matchCategory = (category) => {
        setSelectedCategory(category);
    };

    const filteredData = selectedCategory
        ? mesonaryData.filter((item) => item.category === selectedCategory)
        : mesonaryData;
    return (
        <section className="relative md:py-24 py-16">
        
            {containerClass === true ?
                <>
                    <div className="container relative mb-4">
                        <div className="grid grid-cols-1 items-center gap-[30px]">
                            <div className="filters-group-wrap text-center">
                                <div className="filters-group">
                                    <ul className="mb-0 list-none container-filter-border-bottom filter-options">
                                        <li className={`${selectedCategory === null ? 'active' : ''} inline-block font-medium text-lg mx-2 mb-3 cursor-pointer relative text-slate-400 transition duration-500`} data-group="all" onClick={() => matchCategory(null)}>All</li>
                                        <li className={`${selectedCategory === 'branding' ? 'active' : ''} inline-block font-medium text-lg mx-2 mb-3 cursor-pointer relative text-slate-400 transition duration-500`} data-group="branding" onClick={() => matchCategory('branding')} >Branding</li>
                                        <li className={`${selectedCategory === 'designing' ? 'active' : ''} inline-block font-medium text-lg mx-2 mb-3 cursor-pointer relative text-slate-400 transition duration-500`} data-group="designing" onClick={() => matchCategory('designing')}>Designing</li>
                                        <li className={`${selectedCategory === 'photography' ? 'active' : ''} inline-block font-medium text-lg mx-2 mb-3 cursor-pointer relative text-slate-400 transition duration-500`} data-group="photography" onClick={() => matchCategory('photography')}>Photography</li>
                                        <li className={`${selectedCategory === 'development' ? 'active' : ''} inline-block font-medium text-lg mx-2 mb-3 cursor-pointer relative text-slate-400 transition duration-500`} data-group="development" onClick={() => matchCategory('development')}>Development</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                    <div className={columns}>
                        {
                            filteredData.map((data, index) => {
                                return (
                                    <div key={index} className="mb-2" data-groups='["branding"]'>
                                        <div className="group relative block overflow-hidden rounded-md transition-all duration-500">
                                            <Link href="#" className="lightbox transition-all duration-500 group-hover:scale-105" title="">
                                                <Image src={data.image} width={0} height={0} sizes='100vw' style={{width:"100%" , height:"auto"}} className="" alt="work" onClick={() => handleImageClick(data.id)} />

                                            </Link>
                                            <div className="absolute -bottom-52 group-hover:bottom-2 start-2 end-2 transition-all duration-500 bg-white dark:bg-slate-900 p-4 rounded shadow-sm dark:shadow-gray-800">
                                                <Link href="/portfolio-detail-two" className="hover:text-[#947e03] text-lg transition duration-500 font-medium">Iphone mockup</Link>
                                                <h6 className="text-slate-400">Branding</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>   
                        {isOpen && (
                            <Lightbox
                                open={isOpen}
                                close={() => setisOpen(false)}
                                index={currentImageIndex}
                                slides={currentImage}
                                plugins={[Fullscreen]} // Optional plugins
                            />
                        )}
                    </div>
                    <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                        <div className="md:col-span-12 text-center">
                            <nav aria-label="Page navigation example">
                                <ul className="inline-flex items-center -space-x-px">
                                    <li>
                                        <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-lg hover:text-white border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">
                                            <MdOutlineKeyboardArrowLeft className=" text-[20px] rtl:rotate-180 rtl:-mt-1"/>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">1</Link>
                                    </li>
                                    <li>
                                        <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">2</Link>
                                    </li>
                                    <li>
                                        <Link href="/#" aria-current="page" className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-[#947e03] border border-[#947e03]">3</Link>
                                    </li>
                                    <li>
                                        <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">4</Link>
                                    </li>
                                    <li>
                                        <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">5</Link>
                                    </li>
                                    <li>
                                        <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-lg hover:text-white border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">
                                            <MdKeyboardArrowRight className="text-xl rtl:rotate-180 rtl:-mt-1"/>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                
                </> :
                <>
                    <div className="container relative">
                        <div className="grid grid-cols-1 items-center gap-[30px] mb-4">
                            <div className="filters-group-wrap text-center">
                                <div className="filters-group">
                                    <ul className="mb-0 list-none container-filter-border-bottom filter-options">
                                        <li className={`${selectedCategory ===  null ? 'active' : ''} inline-block font-medium text-lg mx-2 mb-3 cursor-pointer relative text-slate-400 transition duration-500`} data-group="all" onClick={() => matchCategory(null)}>All</li>
                                        <li className={`${selectedCategory === 'branding' ? 'active' : ''} inline-block font-medium text-lg mx-2 mb-3 cursor-pointer relative text-slate-400 transition duration-500`} data-group="branding" onClick={() => matchCategory('branding')} >Branding</li>
                                        <li className={`${selectedCategory === 'designing' ? 'active' : ''} inline-block font-medium text-lg mx-2 mb-3 cursor-pointer relative text-slate-400 transition duration-500`} data-group="designing" onClick={() => matchCategory('designing')}>Designing</li>
                                        <li className={`${selectedCategory === 'photography' ? 'active' : ''} inline-block font-medium text-lg mx-2 mb-3 cursor-pointer relative text-slate-400 transition duration-500`} data-group="photography" onClick={() => matchCategory('photography')}>Photography</li>
                                        <li className={`${selectedCategory === 'development' ? 'active' : ''} inline-block font-medium text-lg mx-2 mb-3 cursor-pointer relative text-slate-400 transition duration-500`} data-group="development" onClick={() => matchCategory('development')}>Development</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={className}>
                            <div className={columns}>
                                {
                                    filteredData.map((data, index) => {
                                        return (
                                            <div className="mb-2" data-groups='["branding"]' key={index}>
                                                <div className="group relative block overflow-hidden rounded-md transition-all duration-500">
                                                    <Link href="#" className="lightbox transition-all duration-500 group-hover:scale-105" title="">
                                                        <Image src={data.image} width={0} height={0} sizes='100vw' style={{width:"100%" , height:"auto"}} className="" alt="work" onClick={() => handleImageClick(data.id)} />

                                                    </Link>
                                                    <div className="absolute -bottom-52 group-hover:bottom-2 start-2 end-2 transition-all duration-500 bg-white dark:bg-slate-900 p-4 rounded shadow-sm dark:shadow-gray-800">
                                                        <Link href="/portfolio-detail-two" className="hover:text-[#947e03] text-lg transition duration-500 font-medium">Iphone mockup</Link>
                                                        <h6 className="text-slate-400">Branding</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>  
                            {isOpen && (
                               <Lightbox
                                    open={isOpen}
                                    close={() => setisOpen(false)}
                                    index={currentImageIndex}
                                    slides={currentImage}
                                    plugins={[Fullscreen]} // Optional plugins
                                />
                            )}
                        </div>
                        <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                            <div className="md:col-span-12 text-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="inline-flex items-center -space-x-px">
                                        <li>
                                            <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-lg hover:text-white border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">
                                                <MdOutlineKeyboardArrowLeft className=" text-[20px] rtl:rotate-180 rtl:-mt-1"/>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">1</Link>
                                        </li>
                                        <li>
                                            <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">2</Link>
                                        </li>
                                        <li>
                                            <Link href="/#" aria-current="page" className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-[#947e03] border border-[#947e03]">3</Link>
                                        </li>
                                        <li>
                                            <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">4</Link>
                                        </li>
                                        <li>
                                            <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">5</Link>
                                        </li>
                                        <li>
                                            <Link href="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-lg hover:text-white border border-gray-100 dark:border-gray-800 hover:border-[#947e03] dark:hover:border-[#947e03] hover:bg-[#947e03] dark:hover:bg-[#947e03]">
                                                <MdKeyboardArrowRight className="text-xl rtl:rotate-180 rtl:-mt-1"/>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            }

        <AvailableProject/>
        </section>

    )
}
