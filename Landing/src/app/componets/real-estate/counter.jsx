"use client"
import React from "react"
import CountUp from 'react-countup';
import { useInView } from "react-intersection-observer";

export default function Counter(){
    const [ref, inView] = useInView({ triggerOnce: false });

    return(
    <div 
    ref={ref} 
    className="relative grid md:grid-cols-3 grid-cols-1 items-center mt-8 gap-[30px] z-1">
        <CounterBox   
        title="Properties Sold"
            end={1548}
        inView={inView} 
        className=" text-center">
           
        </CounterBox>

        <CounterBox 
         title="Award Gained"
        end={25}
        inView={inView} 
        className=" text-center">
            
        </CounterBox>

        <CounterBox 
        title="Years Experience"
        end={9}
        inView={inView}
        className=" text-center">
            
        </CounterBox>
    </div>
    );
}

function CounterBox({ title, end, inView }) {
  return (
    <div className="counter-box text-center">
      <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-[#947e038b] dark:text-white">
        {inView ? <CountUp end={end} duration={2.5} /> : 0}+
      </h1>
      <h5 className="counter-head text-lg font-medium">{title}</h5>
    </div>
  );
}