"use client"
import React,{useState} from "react"
import Link from "next/link"
import Image from "next/image"

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Fullscreen} from "yet-another-react-lightbox/plugins";

import { FiCamera } from "react-icons/fi";


export default function Propreties(){
    let [photoIndex, setActiveIndex] = useState(0);
    let [isOpen, setOpen] = useState(false);

    let images = [
        "/images/real/property/single/1.jpg",
        "/images/real/property/single/2.jpg",
        "/images/real/property/single/3.jpg",
        "/images/real/property/single/4.jpg",
        "/images/real/property/single/5.jpg"
    ];
    let handleCLick = (index) => {
        setActiveIndex(index)
        setOpen(true);
    }

    let currentImage = images.map((img) => ({ src: img }))
    return(
        <>
        <div className="container-fluid relative">
                <div className="md:flex mt-4">
                    <div className="lg:w-1/2 md:w-1/2 p-1">
                        <div className="group relative overflow-hidden">
                            <Image src="/images/real/property/single/1.jpg" width={0} height={0} sizes="100vw" style={{width:'100%', height:"auto"}} alt="" />
                            <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                            <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center invisible group-hover:visible">
                                <Link href="#" onClick={() => handleCLick(0)} className="size-9 inline-flex items-center justify-center tracking-wide align-middle transition duration-500 ease-in-out text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-full lightbox"><FiCamera className="size-4"/></Link>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 md:w-1/2">
                        <div className="flex">
                            <div className="w-1/2 p-1">
                                <div className="group relative overflow-hidden">
                                    <Image src="/images/real/property/single/2.jpg" width={0} height={0} sizes="100vw" style={{width:'100%', height:"auto"}} alt="" />
                                    <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                    <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center invisible group-hover:visible">
                                        <Link href="#" onClick={() => handleCLick(1)} className="size-9 inline-flex items-center justify-center tracking-wide align-middle transition duration-500 ease-in-out text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-full lightbox"><FiCamera className="size-4"/></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/2 p-1">
                                <div className="group relative overflow-hidden">
                                    <Image src="/images/real/property/single/3.jpg" width={0} height={0} sizes="100vw" style={{width:'100%', height:"auto"}} alt="" />
                                    <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                    <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center invisible group-hover:visible">
                                        <Link href="#" onClick={() => handleCLick(2)} className="size-9 inline-flex items-center justify-center tracking-wide align-middle transition duration-500 ease-in-out text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-full lightbox"><FiCamera className="size-4"/></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="w-1/2 p-1">
                                <div className="group relative overflow-hidden">
                                    <Image src="/images/real/property/single/4.jpg" width={0} height={0} sizes="100vw" style={{width:'100%', height:"auto"}} alt="" />
                                    <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                    <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center invisible group-hover:visible">
                                        <Link href="#" onClick={() => handleCLick(3)} className="size-9 inline-flex items-center justify-center tracking-wide align-middle transition duration-500 ease-in-out text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-full lightbox"><FiCamera className="size-4"/></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/2 p-1">
                                <div className="group relative overflow-hidden">
                                    <Image src="/images/real/property/single/5.jpg" width={0} height={0} sizes="100vw" style={{width:'100%', height:"auto"}} alt="" />
                                    <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                    <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center invisible group-hover:visible">
                                        <Link href="#" onClick={() => handleCLick(4)} className="size-9 inline-flex items-center justify-center tracking-wide align-middle transition duration-500 ease-in-out text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-full lightbox"><FiCamera className="size-4"/></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={() => setOpen(false)}
                    index={photoIndex}
                    slides={currentImage}
                    plugins={[Fullscreen]} // Optional plugins
                />
            )}
        </>
    )
}