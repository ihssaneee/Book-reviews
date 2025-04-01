import React, { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import useWindowSize from "../useWindowSize";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import { Tooltip } from "react-tooltip";

export default function AdminSidebar({ toggled, toggle }) {
   
    const navigate = useNavigate();
    const { width } = useWindowSize();

    return (
        <div
            className={`top-0 left-0 h-dvh  dark:bg-[#1A1C23] dark:text-white bg-[#000035] border border-gray-500 rounded-none transition-all duration-300 ease-in-out `}
        >
            <div className="flex items-center justify-center pb-6 items ">
                {width >= 1020 ? (
                    <img
                        src={`${
                            !toggled
                                ? "/images/ReadNest2.png"
                                : "/images/miniLogo.png"
                        }`}
                        alt="books Logo"
                        id="logo"
                        className={`${
                            !toggled ? "max-w-40 " : "max-w-14  "
                        } block   mt-8 `}
                    />
                ) : (
                    <>
                        <img
                            src="/images/ReadNest2.png"
                            alt="books Logo"
                            id="logo"
                            className="mt-8 block-inline max-w-40"
                        />
                        <MenuIcon
                            fontSize="large"
                            className="mt-6 ml-4 text-white "
                            onClick={toggle}
                        />
                    </>
                )}
            </div>

            <nav
                className={`flex flex-col mt-14 +
                ${toggled ? "lg:items-center lg:justify-center" : ""}`}
            >
                <SidebarLink
                    to="dashboard"
                    label="Dashboard"
                    icon={<DashboardIcon fontSize="medium" />}
                    toggled={toggled}
                    data-tooltip-content="Dashboard"
                    data-tooltip-id="myTooltip"
                />

                <SidebarLink
                    to="books"
                    label="Books"
                    icon={<LibraryBooksIcon fontSize="medium" />}
                    toggled={toggled}
                    data-tooltip-content="Books"
                    data-tooltip-id="myTooltip"
                    data-tooltip-place="right"
                />
                <SidebarLink
                    to="users"
                    label="users"
                    icon={<PeopleIcon fontSize="medium" />}
                    toggled={toggled}
                    data-tooltip-content="Users"
                    data-tooltip-id="myTooltip"
                    data-tooltip-place="right"
                />
                <SidebarLink
                    to="genres"
                    label="genres"
                    icon={<BookIcon fontSize="medium" />}
                    toggled={toggled}
                    data-tooltip-content="Genres"
                    data-tooltip-id="myTooltip"
                    data-tooltip-place="right"
                />
                <SidebarLink
                    to="reviews"
                    label="reviews"
                    icon={<ReviewsOutlinedIcon fontSize="medium" />}
                    toggled={toggled}
                    data-tooltip-content="Reviews"
                    data-tooltip-id="myTooltip"
                    data-tooltip-place="right"
                />
                {toggled && <Tooltip id="myTooltip" />}
            </nav>
        </div>
    );
}
const SidebarLink = ({ toggled, label, to, icon,...tooltipProps }) => {
    return (
        <NavLink
            to={to}
            className="group flex items-center   font-roboto  font-medium text-xl p-2 mb-1 text-white leading-6 mx-2 hover:bg-yellow-400  rounded-md "
            {...tooltipProps}
        >
            <span className="text-[#FFDB58] mr-2 group-hover:text-gray-950  ">
                {icon}
            </span>
            <span
                className={`group-hover:text-gray-950 ${
                    toggled
                        ? "lg:max-w-0 lg:opacity-0"
                        : "lg:max-w-auto lg:opacity-100"
                }group-hover:text-gray-950 overflow-hidden g `}
            >
                {label}
            </span>
        </NavLink>
    );
};
