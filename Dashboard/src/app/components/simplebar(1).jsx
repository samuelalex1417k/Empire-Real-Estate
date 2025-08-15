'use client'
import React from "react"

import SimpleBarReact from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';

export default function Simplebar(props){
    return(
        <SimpleBarReact className={props.className} style={props.style}>
           {props.children}
        </SimpleBarReact>
    )
}