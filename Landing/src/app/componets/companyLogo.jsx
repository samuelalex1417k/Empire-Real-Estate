"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const logos = [
  "/images/client/amazon.svg",
  "/images/client/google.svg",
  "/images/client/lenovo.svg",
  "/images/client/paypal.svg",
  "/images/client/spotify.svg",
  "/images/client/shopify.svg",
];

export default function CompanyLogo() {
  const settings = {
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="py-4">
      <Slider {...settings}>
        {logos.map((src, index) => (
          <div key={index} className="flex justify-center items-center px-4">
            <Image src={src} width={72} height={24} alt={`Logo ${index}`} className="h-6 w-auto" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
