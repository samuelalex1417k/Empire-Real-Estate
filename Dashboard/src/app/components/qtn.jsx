"use client"
import React,{useState} from "react";
import Link from "next/link";

export default function Qtn(){

    let [counter, setCounter] = useState(0);
  
    let incrementCounter = () => {
        setCounter(counter + 1);
    };
  
    let decrementCounter = () => {
        if (counter !== 0) {
            setCounter(counter - 1);
        }
    };
    return(
        <div className="flex items-center">
            <h5 className="text-lg font-semibold me-2">Quantity:</h5>
            <div className="qty-icons ms-3 space-x-1">
                <button  onClick={decrementCounter}  className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md bg-[#947e03]/5 hover:bg-[#947e03] border-[#947e03]/10 border hover:border-[#947e03] text-[#947e03] hover:text-white minus">-</button>
                <input min="0" name="quantity" defaultValue={counter} type="number" className="h-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md bg-[#947e03]/5 hover:bg-[#947e03] border border-[#947e03]/10 hover:border-[#947e03] text-[#947e03] hover:text-white pointer-events-none w-16 ps-4 quantity"/>
                <button onClick={incrementCounter} className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md bg-[#947e03]/5 hover:bg-[#947e03] border border-[#947e03]/10 hover:border-[#947e03] text-[#947e03] hover:text-white plus">+</button>
            </div>
        </div>
    )
}