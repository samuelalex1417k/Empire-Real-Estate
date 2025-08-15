import React from "react";
import Link from "next/link";

import * as Icon from 'react-feather'

export default function BackButton(){
    return(
        <>
         <div className="fixed bottom-3 end-3">
            <Link href="/" className="back-button size-9 inline-flex items-center justify-center tracking-wide border align-middle duration-500 text-base text-center bg-[#947e03] hover:bg-indigo-700 border-[#947e03] hover:border-indigo-700 text-white rounded-full"><Icon.ArrowLeft className="size-4"/></Link>
        </div>
        </>
    )
}