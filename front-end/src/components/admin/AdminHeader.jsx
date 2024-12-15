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
    // const [istoggled, setIsToglled] = useState(false);
    // const handleToggleClick = () => {
    //     setIsToglled(!istoggled);
    //     toggle(istoggled);
    // };
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
       <div className="flex items-center justify-between w-full ">
            <div className="flex ">
                <ChevronLeftIcon
                    onClick={toggle}
                    fontSize="large"
                    className="mx-2 text-gray-600 cursor-pointer "
                />
                <div className="flex items-center px-4 bg-white border rounded-sm h-9">
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
            <div className="relative flex items-center justify-end flex-1 gap-3 ">
                    <div className="flex items-center justify-center bg-white border rounded-full h-11 w-11 hover:bg-opacity-35">
                        <ModeNightOutlinedIcon
                            fontSize="large"
                            className="text-[#878A99] cursor-pointer   p-2 "
                        />
                    </div>
                    <div className="flex items-center justify-center bg-white border rounded-full w-11 h-11 hover:bg-opacity-35">
                        <NotificationsNoneIcon
                            fontSize="large"
                            className="text-[#878A99] cursor-pointer p-1.5"
                        />
                    </div>
                    <div
                        className="mr-10 cursor-pointer w-22"
                        onClick={handleClick}
                    >
                            <div className="h-[5rem] flex items-center justify-center ">
                                {!loading ? (
                                    <img
                                        src={user.picture}
                                        alt="Profile picture"
                                        className="object-cover w-10 h-10 rounded-full"
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
    )

}
export default AdminHeader;
