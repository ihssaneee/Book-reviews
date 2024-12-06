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

const AdminHeader = ({ toggle }) => {
    const { loading, user, logout } = useAuth();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [istoggled, setIsToglled] = useState(false);
    const handleToggleClick = () => {
        setIsToglled(!istoggled);
        toggle(istoggled);
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
        <div
            className={`flex flex-1  h-[5rem] border bg-white items-center  justify-between `}
        >
            <div className="flex">
                <ChevronLeftIcon
                    onClick={handleToggleClick}
                    fontSize="large"
                    className="cursor-pointer  text-gray-600 mx-2 "
                />
                <div className="flex items-center rounded-sm border bg-white h-9 px-4">
                    <SearchIcon
                        fontSize="small"
                        className="mx-1 text-slate-600"
                    />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="p-1 bg-white border-none focus:ring-0"
                    />
                </div>
            </div>
            <div className="flex relative  flex-1 justify-end  items-center  gap-3  ">
                    <div className="flex justify-center items-center h-11 w-11 bg-white border rounded-full hover:bg-opacity-35">
                        <ModeNightOutlinedIcon
                            fontSize="large"
                            className="text-[#878A99] cursor-pointer   p-2 "
                        />
                    </div>
                    <div className="flex items-center justify-center border rounded-full w-11 h-11 bg-white hover:bg-opacity-35">
                        <NotificationsNoneIcon
                            fontSize="large"
                            className="text-[#878A99] cursor-pointer p-1.5"
                        />
                    </div>
                    <div
                        className=" w-22 mr-10 cursor-pointer"
                        onClick={handleClick}
                    >
                            <div className="h-[5rem] flex items-center justify-center ">
                                {!loading ? (
                                    <img
                                        src={user.picture}
                                        alt="Profile picture"
                                        className="w-10 h-10 rounded-full object-cover"
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
            </div>
        </div>
    );
};

export default AdminHeader;
