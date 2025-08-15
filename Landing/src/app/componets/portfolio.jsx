"use client"
import React, {useState} from 'react'
import Link from "next/link"
import Image from "next/image"

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Fullscreen} from "yet-another-react-lightbox/plugins";

import { portfolioImageTwo,portfolioTwo } from '../Data/dataTwo';
import { FiCamera } from 'react-icons/fi';

export default function Portfolio(){
    let [currentImageIndex, setCurrentImageIndex] = useState(0);
    let [isImage, setIsImage] = useState(false);

    let handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setIsImage(true);
    };
    let currentImage = portfolioImageTwo.map((img) => ({ src: img }))


    return(
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">
            {portfolioTwo.slice(0,8).map((item,index)=>{
                return(
                    <div key={index} className="group relative block overflow-hidden rounded-md transition-all duration-500">
                        <Image src={item.image} width={0} height={0} sizes='100vw' style={{width:"100%", height:"suto"}} className="group-hover:origin-center group-hover:scale-110 group-hover:rotate-3 transition duration-500" alt="" />
                        <div className="absolute inset-0 group-hover:bg-dark opacity-50 transition duration-500 z-0"></div>

                        <div className="content">
                            <div className="icon absolute z-10 opacity-0 group-hover:opacity-100 top-4 end-4 transition-all duration-500">
                                <Link href="#" onClick={() => handleImageClick(index)} className="size-9 inline-flex items-center justify-center tracking-wide align-middle transition duration-500 ease-in-out text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-full lightbox"><FiCamera className="size-4"/></Link>
                            </div>

                            <div className="title absolute z-10 opacity-0 group-hover:opacity-100 bottom-4 start-4 transition-all duration-500">
                                <Link href="/portfolio-detail-one" className="h6 text-md font-medium text-white hover:text-[#947e03] duration-500 ease-in-out">{item.name}</Link>
                                <p className="text-slate-100 tag mb-0">{item.title}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            
            {isImage && (
                <Lightbox
                    open={isImage}
                    close={() => setIsImage(false)}
                    index={currentImageIndex}
                    slides={currentImage}
                    plugins={[Fullscreen]} // Optional plugins
                />
            )}
        </div>
    )
}