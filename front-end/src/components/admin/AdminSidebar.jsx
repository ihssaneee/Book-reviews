import React, { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import WindowSize from "../useWindowSize";

export default function AdminSidebar({toggled,toggle}) {
    const navigate = useNavigate();
   

    return (
        <div className={` top-0 left-0 h-dvh   bg-[#000035] border rounded-none transition-all duration-300 ease-in-out `}>
            <div className="flex items-center justify-center pb-6 items ">
                {WindowSize>=1020?(
                <img
                        src={`${!toggled?"/images/ReadNest2.png":"/images/miniLogo.png"}`}
                        alt="books Logo"
                        id="logo"
                        className={`${!toggled? "max-w-40 ": "max-w-14  "} block   mt-8 `} 
                        />
                ):(<>
                    <img
                        src="/images/ReadNest2.png"
                        alt="books Logo"
                        id="logo"
                        className= "mt-8 block-inline max-w-40" 
                        
                        />
                        <MenuIcon  fontSize="large" className="mt-6 ml-4 text-white " onClick={toggle} />
                    </>
                )}
                
            </div>
                
            <nav className={`flex flex-col mt-14 +
                ${toggled?"lg:items-center lg:justify-center":""}`}>
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
                to="users"
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
            <span className={`${toggled?"lg:max-w-0 lg:opacity-0":"lg:max-w-auto lg:opacity-100"}hover:text-gray-950 overflow-hidden transition-all duration-300 ease-in-out `}>{label}</span>
        
        </NavLink >
    )
}
