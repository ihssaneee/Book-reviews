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

/**
 * AdminHeader component renders the header for the admin panel.
 * It includes features such as dark mode toggle, search functionality, 
 * user profile dropdown, and status toggle for the user.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.toggle - Function to toggle the sidebar visibility.
 *
 * @returns {JSX.Element} The rendered AdminHeader component.
 */
const AdminHeader = ({ toggle }) => {
    // Dark mode context
    const { darkMode, toggleDarkMode } = useDarkMode();

    // Auth context
    const { loading, user, logout, updateStatus } = useAuth();

    // State for user status
    const [status, setStatus] = useState(user.status);

    // Window size hook
    const { width } = useWindowSize();

    // Navigation hook
    const navigate = useNavigate();

    // State for dropdown visibility
    const [isVisible, setIsVisible] = useState(false);

    // State for search bar visibility
    const [isSearched, setIsSearched] = useState(false);

    // Refs for dropdown and profile
    const dropdownRef = useRef(null);
    const profileRef = useRef(null);

    // CSS class for icon containers
    const divStyle =
        "flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-[#1A1C23] dark:border-solid-transparent";

    // Toggles the search bar visibility
    const handleSearchClick = () => {
        setIsSearched(!isSearched);
    };

    // Toggles the dropdown visibility
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    // Handles user logout
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("could not log out.", error);
        }
    };

    // Closes the dropdown if clicked outside
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

    // Adds event listener for clicks outside the dropdown
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Toggles the user's status (active/inactive)
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
            className={`flex lg:items-center lg:justify-center w-full h-14 border dark:border-none dark:bg-[#22242B] dark:text-white ${
                isSearched
                    ? "justify-normal items-start"
                    : "items-center justify-between"
            }`}
        >
            {/* Render the header content based on screen width */}
            {(width <= 689 && !isSearched) || width > 689 ? (
                <>
                    {/* Sidebar toggle and search bar */}
                    <div className="flex">
                        <ChevronLeftIcon
                            onClick={toggle}
                            fontSize="large"
                            className="mx-2 text-gray-700 cursor-pointer dark:text-neutral-400 "
                        />
                        {width > 640 ? (
                            <div className="flex items-center px-4 bg-white dark:bg-[#1A1C23] dark:border-none border rounded-md h-auto mx-4">
                                <div className="py-2">
                                    <SearchIcon
                                        fontSize="medium"
                                        className="mx-1 text-black bg-white dark:bg-[#1A1C23] dark:text-gray-200"
                                    />
                                </div>
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="p-2 text-black focus:ring-0 border-none py-2 dark:bg-[#1A1C23] dark:text-gray-200"
                                />
                            </div>
                        ) : null}
                    </div>

                    {/* Icons and profile section */}
                    <div className="relative flex items-center justify-end flex-1 gap-3">
                        {/* Search icon for small screens */}
                        {width <= 640 ? (
                            <div className={divStyle}>
                                <SearchIcon
                                    fontSize="medium"
                                    className="text-slate-600 dark:text-neutral-400 cursor-pointer"
                                    onClick={handleSearchClick}
                                />
                            </div>
                        ) : null}

                        {/* Dark mode toggle */}
                        <div className={divStyle} onClick={toggleDarkMode}>
                            {!darkMode ? (
                                <LightModeOutlinedIcon
                                    fontSize="medium"
                                    className="cursor-pointer w-1 h-1 text-black"
                                />
                            ) : (
                                <BedtimeIcon
                                    fontSize="small"
                                    className="cursor-pointer w-1 h-1 text-black dark:text-gray-400"
                                />
                            )}
                        </div>

                        {/* Notifications icon */}
                        <div className={divStyle}>
                            <NotificationsNoneIcon
                                fontSize="medium"
                                className="cursor-pointer w-1 h-1 text-black dark:text-gray-400"
                            />
                        </div>

                        {/* Profile picture and status */}
                        <div
                            className="mr-10 w-22 relative"
                            ref={profileRef}
                        >
                            <div className="flex items-center justify-center">
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
                                            className={`my-circle-icon absolute cursor-pointer rounded-full left-7 top-6 ${
                                                status === "active"
                                                    ? "text-green-500 stroke-white stroke-[2] outline-white active"
                                                    : "text-gray-600 stroke-gray-400 stroke-[4] outline-white border-gray-700 dark:stroke-[#22242B]"
                                            }`}
                                            id="fiber_circle"
                                            onClick={toggleStatus}
                                        />
                                    </>
                                ) : null}
                            </div>
                        </div>

                        {/* Dropdown menu */}
                        <div
                            ref={dropdownRef}
                            className={`absolute z-50 ${
                                !isVisible
                                    ? "hidden opacity-0"
                                    : "flex opacity-100"
                            } items-center flex-col h-64 top-16 border dark:border-neutral-800 bg-white rounded-lg right-5 shadow-md max-w-64 dark:bg-[#1A1C23] text-neutral`}
                        >
                            <DropdownMenu
                                handleLogout={handleLogout}
                                isVisible={isVisible}
                            />
                        </div>
                    </div>
                </>
            ) : (
                // Search bar for small screens
                width <= 689 && (
                    <div className="flex items-center w-full flex-1 p-3 inputStyle ">
                        <input
                            type="search"
                            placeholder="Search..."
                            className="w-full border-none focus:ring-0 inputStyle"
                        />
                        <CloseIcon onClick={handleSearchClick} className="cursor-pointer" />
                    </div>
                )
            )}
        </div>
    );
};

export default AdminHeader;
