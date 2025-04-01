import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useAuth } from "../../contexts/AuthContext";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./dropDownMenu";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import CloseIcon from "@mui/icons-material/Close";
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useDarkMode } from "../../contexts/DarkModeContext";
import useWindowSize from "../useWindowSize";

const AdminHeader = ({ toggle }) => {
    const {darkMode,toggleDarkMode}=useDarkMode();
    console.log(useWindowSize());
    const divStyle =
        "flex items-center justify-center w-10 h-10  rounded-full bg-gray-200 dark:bg-[#1A1C23] dark:border-solid-transparent ";
    const { loading, user, logout,updateStatus } = useAuth();
    const [status,setStatus] = useState(user.status);
    const { width } = useWindowSize();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [isSearched, setIsSearched] = useState(false);

    const dropdownRef = useRef(null);
    const profileRef = useRef(null);
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
    const handleClickOutside = (e) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target) &&
            profileRef.current &&
            !profileRef.current.contains(e.target)
        ) {
            setIsVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const toggleStatus = async () => {
        const userStatus = status === "active" ? "inactive" : "active";
        try {
            await updateStatus(userStatus);
            setStatus(userStatus);
            console.log('status updated successfully');
        } catch (error) {
            console.error('status could not be updated', error);
        }
    };

    
    return (
        <div
            className={`flex lg:items-center lg:justify-center w-full h-14 border dark:border-none dark:bg-[#22242B] dark:text-white   ${
                isSearched
                    ? "justify-normal items-start"
                    : "items-center justify-between"
            }  `}
        >
            {(width <= 689 && !isSearched) || width > 689 ? (
                <>
                    <div className="flex ">
                        <ChevronLeftIcon
                            onClick={toggle}
                            fontSize="large"
                            className="mx-2 text-gray-300 cursor-pointer "
                        />
                        {width > 640 ? (
                            <div className="flex items-center px-4 bg-white dark:bg-[#1A1C23] dark:border-none border rounded-md h-auto mx-4 b ">
                                <div className="py-2">
                                    <SearchIcon
                                        fontSize="medium"
                                        className="mx-1 text-black bg-white dark:bg-[#1A1C23] dark:text-gray-200"
                                    />
                                </div>
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="p-2 text-black  focus:ring-0 border-none py-2 dark:bg-[#1A1C23]  dark:text-gray-200"
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="relative flex items-center justify-end flex-1 gap-3 ">
                        {width <= 640 ? (
                            <div className="flex relative items-center justify-center ">
                                <SearchIcon
                                    fontSize="medium"
                                    className=" text-slate-600"
                                    onClick={handleSearchClick}
                                />
                            </div>
                        ) : (
                            <></>
                        )}

                        <div className={divStyle} onClick={toggleDarkMode}>
                            {!darkMode?
                            <LightModeOutlinedIcon
                                fontSize="medium"
                                className="cursor-pointer w-1 h-1 text-black "
                                
                            />
                            :<BedtimeIcon 
                            fontSize="small"
                           
                            className="cursor-pointer w-1 h-1 text-black dark:text-gray-400  "
                            />
}
                        </div>
                        <div className={divStyle}>
                            <NotificationsNoneIcon
                                fontSize="medium"
                                className="cursor-pointer w-1 h-1 text-black dark:text-gray-400"
                            />
                        </div>
                        <div
                            className="mr-10 w-22 relative "
                            ref={profileRef}
                            
                        >
                            <div className=" flex items-center justify-center ">
                                {!loading ? (
                                    <>
                                        <img
                                            src={user.picture}
                                            alt="Profile picture"
                                            className="object-cover w-10 h-10 rounded-full cursor-pointer"
                                            onClick={handleClick}
                                        />
                                       
                                        <FiberManualRecordIcon
                                            fontSize="small"
                                            className={`my-circle-icon absolute cursor-pointer rounded-full  left-7 top-6 ${
                                                status === "active"
                                                    ? "text-green-500 stroke-white stroke-2 outline-white active"
                                                    : "text-gray-600 stroke-gray-400 stroke-[4] outline-white outline-[20]  border-6 border-gray-700 "
                                            }`}
                                           
                                              id="fiber_circle"
                                            onClick={toggleStatus}
                                        />
                                      
                                    </>
                                ) : null}
                            </div>
                        </div>
                        <div
                            ref={dropdownRef}
                            className={`absolute z-50  ${
                                !isVisible
                                    ? "hidden opacity-0"
                                    : "flex opacity-100"
                            } items-center  flex-col   h-64 top-16    bg-white rounded-lg right-5 shadow-md max-w-64   `}
                        >
                            <DropdownMenu
                                handleLogout={handleLogout}
                                isVisible={isVisible}
                            />
                        </div>
                    </div>
                </>
            ) : (
                width <= 689 && (
                    <div className="flex  items-center  w-full flex-1 p-5">
                        <input
                            type="search"
                            placeholder="Search..."
                            className="w-full border-none focus:ring-0"
                        />
                        <CloseIcon onClick={handleSearchClick} />
                    </div>
                )
            )}
        </div>
    );
};
export default AdminHeader;
