"use client"
import React from 'react'

import CountUp from 'react-countup';

export default function AboutCounter(){
    return(
        <div className="text-center">
            <span className="text-[#947e03] text-2xl font-bold mb-0"><CountUp className="counter-value text-6xl font-bold" start={1} end={15}></CountUp>+</span>
            <span className="self-end font-medium ms-2"><br/> Years <br /> Experience</span>
        </div>
    )
}