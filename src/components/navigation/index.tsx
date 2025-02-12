"use client";
import { useState } from "react";
import NavBar from "./navbar";
import Sidebar from "./sidebar";

const Navigation =()=>{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
    };
    return(
        <>
        <NavBar toggle={toggle}/>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        </>
    )
}

export default Navigation;