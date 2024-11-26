import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import { NavLink,useNavigate } from "react-router-dom";





export default function AdminSidebar() {
  const navigate=useNavigate();
  const baseLinkClasses="flex items-center font-roboto  font-medium text-xl p-2 mb-1 text-white leading-6 mx-2 hover:bg-[#FFD700] hover:text-gray-950 transition duration-75 rounded-md "
  return (
    
     <>
        <div className="pb-6">
          <img src="/images/yellow.png" alt="books Logo" id="logo"  className="block m-auto w-52  "/>
        </div>
        <nav className="flex flex-col   ">
              <div className="group">
              <NavLink to='dashboard' className="flex items-center  font-roboto  font-medium text-xl p-2 mb-1 text-white leading-6 mx-2 hover:bg-[#FFD700] hover:text-gray-950 rounded-md"  >
                  <DashboardIcon fontSize='large'  className="text-[#FFDB58] mr-2  group-hover:text-gray-950 p-1 "/> Dashboard
              </NavLink>
              </div>
              <div className="group">
              <NavLink to='books' className="flex items-center font-roboto  font-medium text-xl p-2 mb-1 text-white leading-6 mx-2 hover:bg-[#FFD700] hover:text-gray-950 rounded-md"  >
              <LibraryBooksIcon fontSize='large' className="text-[#FFDB58] mr-2   group-hover:text-gray-950 group-focus:text-gray-950"  /> 
              Books
              </NavLink>
              </div>
              <div className=" group">
              <NavLink to="genres" className={({isActive})=>
                  `flex items-center font-roboto  font-medium text-xl p-2 mb-1 text-white leading-6 mx-2 hover:bg-[#FFD700] hover:text-gray-950 transition duration-75 rounded-md   ${
                    isActive? "bg-yellow-300 text-gray-950" : ""
                  }`
              }  >
              <BookIcon fontSize='large' className="text-[#FFDB58] mr-2  group-hover:text-gray-950"  /> Genres
              </NavLink>
              </div>
              <div className=" group">
              <NavLink to="users" className={({isActive})=>`${baseLinkClasses} ${isActive?"bg-yellow-300 text-gray-950" : ""} `  }  >
              <PeopleIcon fontSize='large' className="text-[#FFDB58] mr-2  group-hover:text-gray-950 tra" /> Users
              </NavLink>
              </div>
              
              </nav>
           
      </>
   
  );
}
