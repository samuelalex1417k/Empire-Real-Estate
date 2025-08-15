"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Fullscreen } from "yet-another-react-lightbox/plugins";

import { FiCamera } from "react-icons/fi";

export default function Propreties({property}) {
    const [photoIndex, setActiveIndex] = useState(0);
    const [isOpen, setOpen] = useState(false);

    const handleClick = (index) => {
        setActiveIndex(index);
        setOpen(true);
    };


  
    const currentImage = property.images.map((img) => ({ src: img.image || img.url }));
   
    
   
    const filledImages = [...property.images];
    while (filledImages.length < 5) {
        filledImages.push(null); 
    }

    return (
        <>
            <div className="container-fluid relative">
                <div className="md:flex mt-4">
                    
                    <div className="lg:w-1/2 md:w-1/2 p-1">
                        {filledImages[0] ? (
                            <ImageBlock
                                img={filledImages[0]}
                                index={0}
                                onClick={handleClick}
                            />
                        ) : (
                            <EmptyImageBlock />
                        )}
                    </div>

                    
                    <div className="lg:w-1/2 md:w-1/2">
                        <div className="flex">
                            {[1, 2].map((i) => (
                                <div className="w-1/2 p-1" key={i}>
                                    {filledImages[i] ? (
                                        <ImageBlock img={filledImages[i]} index={i} onClick={handleClick} />
                                    ) : (
                                        <EmptyImageBlock />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex">
                            {[3, 4].map((i) => (
                                <div className="w-1/2 p-1" key={i}>
                                    {filledImages[i] ? (
                                        <ImageBlock img={filledImages[i]} index={i} onClick={handleClick} />
                                    ) : (
                                        <EmptyImageBlock />
                                    )}
                                </div>
                            ))}
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
                    plugins={[Fullscreen]}
                />
            )}
        </>
    );
}

function ImageBlock({ img, index, onClick }) {
   

    return (
        <div className="group relative overflow-hidden h-full">
            <Image
                src={img.image || img.url}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                alt={`property-${index}`}
            />
            <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
            <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center invisible group-hover:visible">
                <Link
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onClick(index);
                    }}
                    className="size-9 inline-flex items-center justify-center tracking-wide align-middle transition duration-500 ease-in-out text-base text-center bg-[#947e03] hover:bg-[#947e03] border-[#947e03] hover:border-indigo-700 text-white rounded-full"
                >
                    <FiCamera className="size-4" />
                </Link>
            </div>
        </div>
    );
}

function EmptyImageBlock() {
    return (
        <div className="group relative overflow-hidden bg-gray-100 aspect-video rounded-md flex items-center justify-center text-sm text-gray-400">
            No Image
        </div>
    );
}
