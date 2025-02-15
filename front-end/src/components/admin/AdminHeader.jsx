import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../contexts/AuthContext";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./dropDownMenu";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import CloseIcon from '@mui/icons-material/Close';

import  useWindowSize  from "../useWindowSize";

const AdminHeader = ({ toggle }) => {
    
    console.log(useWindowSize());
    const { loading, user, logout } = useAuth();
    const {width}=useWindowSize();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [isSearched, setIsSearched] = useState(false);
    const handleSearchClick = () => {
        setIsSearched(!isSearched);
       
    };
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("could not log out.", error);
        }
    };

    return (
        
       <div className={`flex lg:items-center lg:justify-center w-full ${isSearched ? "justify-normal items-start":"items-center justify-between"}  `}>
        {(width <= 689 &&  !isSearched) || (width>689)?  (
            <>
            <div className="flex ">
                <ChevronLeftIcon
                    onClick={toggle}
                    fontSize="large"
                    className="mx-2 text-gray-600 cursor-pointer "
                />
                {width>640?
                    
                    (
                    <div className="flex items-center px-4  bg-slate-100 border rounded-md h-auto mx-4 b ">
                        <div className="py-2">
                            <SearchIcon
                                fontSize="medium"
                                className="mx-1 text-slate-600 "
                            />
                    </div>
                    <input
                        type="search"
                        placeholder="Search..."
                        className="p-2 bg-slate-100  focus:ring-0 border-none py-2"
                    />
                    </div>
                    ):<></>
                    }
            
            </div>
            <div className="relative flex items-center justify-end flex-1 gap-3 ">
                    {width<=640?(
                        <div className="flex relative items-center justify-center ">
                        <SearchIcon
                            fontSize="medium"
                            className=" text-slate-600"
                            onClick={handleSearchClick}
                        />
                        </div>
                    ):<></>}
                   
                
                    <div className="flex items-center justify-center bg-white   hover:bg-opacity-35">
                        <LightModeOutlinedIcon
                            fontSize="large"
                            className="text-[#878A99] cursor-pointer   p-2 "
                        />
                    </div>
                    <div className="flex items-center justify-center bg-white  hover:bg-opacity-35">
                        <NotificationsNoneIcon
                            fontSize="large"
                            className="text-[#878A99] cursor-pointer p-1.5"
                        />
                    </div>
                    <div
                        className="mr-10 cursor-pointer w-22 "
                        onClick={handleClick}
                    >
                            <div className="h-[5rem] flex items-center justify-center ">
                                {!loading ? (
                                    <img
                                        src={user.picture}
                                        alt="Profile picture"
                                        className="object-cover w-8 h-auto rounded-full"
                                    />
                                ) : null}
                            </div>
                   
                    </div>
                   < div
                       
                        className={`absolute z-10  ${
                            isVisible ? "hidden opacity-0" : "flex opacity-100"
                        } items-center   gap-6 flex-col   h-64 top-16   bg-white rounded-lg right-5 shadow-md max-w-64 p-4  `}
                    >
                        <DropdownMenu
                            handleLogout={handleLogout}
                            isVisible={isVisible}
                        />
                    </div>
            </div></>):width<=689 &&(
                <div className="flex  items-center  w-full flex-1 p-5">
                    <input type="search" placeholder="Search..." className="w-full border-none focus:ring-0"/>
                    <CloseIcon onClick={handleSearchClick} />
                </div>
            )}
        </div>
    )

}
export default AdminHeader;
