"use client"
import React, { useState } from 'react'
import Link from "next/link"
import Image from "next/image"


import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Fullscreen} from "yet-another-react-lightbox/plugins";

import { masonryimages } from '../Data/data'
import { mesonaryData } from '../Data/data'

export default function PortfolioDetailFilter({columns}) {

    const [isOpen, setisOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
 
    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setisOpen(true);
    };
    const currentImage = masonryimages.map((img) => ({ src: img }))
   
    return (
        <div>
              <div className={`gap-2 ${columns}`}>
                {
                    mesonaryData.map((data, index) => {
                        return (
                            <div className="mb-2" data-groups={data.dataGroup} key={index}>
                                <div className="group relative block overflow-hidden rounded-md transition-all duration-500">
                                    <Link href="#" className="lightbox transition-all duration-500 group-hover:scale-105" title="">
                                        <Image src={data.image} width={0} height={0} sizes='100vw' style={{width:"100%", height:"auto"}} className="" alt="" onClick={() => handleImageClick(index)} />
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
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
        </div>
    )
}
