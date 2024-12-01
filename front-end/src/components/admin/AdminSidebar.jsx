import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar({toggled}) {
    const navigate = useNavigate();
  

    return (
        <div className={`fixed top-0 left-0 h-screen  bg-[#000035] border rounded-none transition-all duration-300 ease-in-out ${toggled?"w-20 ":"w-64"}`}>
            <div className="flex justify-center  pb-6">
                <img
                        src={`${!toggled?"/images/ReadNest2.png":"/images/miniLogo.png"}`}
                        alt="books Logo"
                        id="logo"
                        className={`${!toggled? "max-w-40 ": "max-w-16  "} block   mt-8 `} 
                        />
            </div>
            <nav className="flex flex-col mt-14  ">
            <SidebarLink 
                to="dashboard"
                label="Dashboard"
                icon={<DashboardIcon fontSize="medium"/>}
                toggled={toggled}
               
                />
             
                <SidebarLink 
                to="books"
                label="Books"
                icon={<LibraryBooksIcon fontSize="medium"/>}
                toggled={toggled}
               
                />
                <SidebarLink 
                to="people"
                label="users"
                icon={<PeopleIcon fontSize="medium"/>}
                toggled={toggled}
               
                />
                <SidebarLink 
                to="genres"
                label="genres"
                icon={<BookIcon fontSize="medium"/>}
                toggled={toggled}
               
                />
            </nav>
        </div>
    );
}
const SidebarLink=({toggled,label,to,icon})=>{
    return (
        <NavLink
        to={to}
        className="flex items-center   font-roboto  font-medium text-xl p-2 mb-1 text-white leading-6 mx-2 hover:bg-[#FFD700] hover:text-gray-950 rounded-md transition-all duration-300 ease-in-out"
        
        >
            <span className="text-[#FFDB58] mr-2  hover:text-gray-950">{icon}</span>
            <span className={`${toggled?"max-w-0 opacity-0":"max-w-auto opacity-100"}hover:text-gray-950 overflow-hidden transition-all duration-300 ease-in-out `}>{label}</span>
        
        </NavLink >
    )
}
