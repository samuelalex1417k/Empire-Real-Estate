'use client'
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";

export default function CoachAbout(){
    const [isOpen, setOpen] = useState(false)
    return(
        <div className="container relative">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
            <div className="lg:col-span-5 md:col-span-6">
                <div className="relative">
                    <Image src="/images/coach/about.jpg" width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="rounded-full" alt=""/>
                    <div className="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                        <Link href="#" scroll={false} onClick={() => setOpen(true)}
                            className="lightbox size-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-[#947e03] dark:text-white">
                            <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                        </Link>
                    </div>
                    {isOpen && 
                        <div className="flex bg-[#00000099] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative p-1 w-full max-w-2xl max-h-full">
                                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600 border-gray-200">
                                        <button type="button" onClick={()=>setOpen(!isOpen)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="p-1 md:p-1 space-y-4">
                                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="absolute top-0 start-0 -z-1">
                        <Image src="/images/illustrator/dots.svg" width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} alt=""/>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-7 md:col-span-6">
                <div className="lg:ms-5">
                    <h6 className="text-[#947e03] text-sm font-bold uppercase mb-2">About Me</h6>
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Unleash Your Real <br/> Potential and <br/> Live Limitless!</h3>

                    <p className="text-slate-400 max-w-xl">I am glad that you have made it here to send a distress signal, and inform the Senate that all on board were killed. Dantooine.  I’m not going to Alderaan. I really got to go.</p>
                    <p className="text-slate-400 max-w-xl mt-2">But that to me. Send a distress signal, and inform the Senate that all on board were killed. Dantooine. They’re on Dantooine. The plans you refer to will soon be back in our hands. Alderaan? I’m not going to Alderaan. I got to go home.</p>
                    <Image src="/images/sign.png" width={128} height={32} className="mt-3" alt=""/>                            
                </div>
            </div>
        </div>
    </div>
    )
}