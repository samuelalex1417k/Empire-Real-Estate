"use client"
import React,{useState} from "react";
import Topnav from "./topnav";
import SidebarColored from "./sidebar-colored";

export default function WrapperTwo(props){
    let [toggle, setToggle] = useState(true)
    return(
    <div className={`page-wrapper  ${toggle ? "toggled" : ""}`}>
      <SidebarColored/>
      <main className="page-content bg-gray-50 dark:bg-slate-800">
        <Topnav toggle={toggle} setToggle={setToggle}/>
        {props.children}
      </main>
    </div>
    )
}