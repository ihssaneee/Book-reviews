import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../contexts/AuthContext";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./dropDownMenu";



const AdminHeader = () => {
   const {loading,user,logout}=useAuth();
   const navigate=useNavigate();
  const [isVisible,setIsVisible]=useState(true);
  const handleClick=()=>{
    setIsVisible(!isVisible);
    
  }
  const handleLogout=async()=>{
    try{
            await logout();
            navigate('/login');
    }
    catch(error){
        console.error('could not log out.',error);
    }
  }
  

    return (
        <div className="flex flex-1 ml-64 h-[5rem] border items-center shadow justify-between ">
            <div className="flex">
                <ChevronLeftIcon
                    fontSize="large"
                    className="cursor-pointer text-gray-600 mx-2 "
                />
                <div className="flex items-center rounded-sm border bg-[#F3F3F9] h-9 px-4">
                    <SearchIcon fontSize="small" className="mx-1" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="p-1 bg-[#F3F3F9] border-none focus:ring-0"
                    />
                </div>
            </div>
            <div className="flex  flex-1 justify-end  items-stretch gap-6  ">
                <div className="flex items-center">
                <ModeNightOutlinedIcon
                 fontSize="medium"
                    className="text-[#878A99] cursor-pointer"
                />
                </div>
                <div className="flex items-center">
                <NotificationsNoneIcon
                    fontSize="medium"
                    className="text-[#878A99] cursor-pointer"
                />
                </div>
                <div className=" relative  w-22 mr-10 cursor-pointer " onClick={handleClick}>
                    <div className="  h-[5rem] flex items-center justify-center ">
                        <AccountCircleIcon
                            fontSize="medium"
                            className="text-[#878A99] cursor-pointer"
                        />
                        <span className="p-3 ">
                         {!loading?(user.name):
                        (<></>)}</span>
                   </div>
                   <DropdownMenu handleLogout={handleLogout} isVisible={isVisible} />
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
