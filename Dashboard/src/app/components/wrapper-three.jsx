"use client"
import React,{useState} from "react";
import Topnav from "./topnav";
import SidebarLight from "./sidebar-light";

export default function WrapperThree(props){
    let [toggle, setToggle] = useState(true)
    return(
    <div className={`page-wrapper  ${toggle ? "toggled" : ""}`}>
      <SidebarLight/>
      <main className="page-content bg-gray-50 dark:bg-slate-800">
        <Topnav toggle={toggle} setToggle={setToggle}/>
        {props.children}
      </main>
    </div>
    )
}