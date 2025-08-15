"use client";
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import '../../../../node_modules/tiny-slider/dist/tiny-slider.css';

const TinySlider = dynamic(() => import('tiny-slider-react'), { ssr: false });
import { realEstateServices } from "../../Data/dataTwo";

export default function Clients() {
    let settings = {
        container: '.tiny-three-item',
        controls: false,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        speed: 400,
        gutter: 12,
        responsive: {
            992: {
                items: 3
            },
            767: {
                items: 2
            },
            320: {
                items: 1
            },
        },
    };

    return (
        <>
            {/* Inline styles for customizing the navigation dots */}
            <style jsx global>{`
                .tns-nav > [data-nav] {
                    background-color: #947e03 !important;
                    width: 10px;
                    height: 10px;
                    margin: 0 5px;
                    border-radius: 50%;
                    display: inline-block;
                }
                .tns-nav > .tns-nav-active {
                    background-color: #b58f00 !important;
                }
            `}</style>

            <div className="tiny-three-item">
                <TinySlider settings={settings}>
                    {realEstateServices.map((item, index) => (
                        <div className="tiny-slide" key={index}>
                            <div className="text-center mx-3">
                                <p className="text-lg italic text-[#947e03]">{item.description}</p>

                                <div className="text-center mt-5">
                                    <ul className="text-xl font-medium text-[#947e03] list-none mb-2">
                                        <li className="inline"><i className="mdi mdi-star"></i></li>
                                        <li className="inline"><i className="mdi mdi-star"></i></li>
                                        <li className="inline"><i className="mdi mdi-star"></i></li>
                                        <li className="inline"><i className="mdi mdi-star"></i></li>
                                        <li className="inline"><i className="mdi mdi-star"></i></li>
                                    </ul>

                                    <Image
                                        src={item.image}
                                        width={56}
                                        height={56}
                                        className="size-14 rounded-full shadow-md dark:shadow-gray-800 mx-auto"
                                        alt=""
                                    />
                                    <h6 className="mt-2 font-semibold text-[#947e03]">{item.name}</h6>
                                    <span className="text-slate-400 text-sm">{item.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </TinySlider>
            </div>
        </>
    );
}
