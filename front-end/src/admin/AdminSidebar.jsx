import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';





export default function AdminSidebar() {
  
  return (
    
      <div className="fixed top-0 left-0 h-screen w-64 bg-[#000035] border rounded-none ">
        <div className="pb-6">
          <img src="/images/yellow.png" alt="books Logo" id="logo"  className="block m-auto w-52  "/>
        </div>
        <nav className="flex flex-col   ">
              <div className="group">
              <a href="#" className="flex items-center  font-roboto  font-medium text-xl p-2 mb-1 text-white leading-6 mx-2 hover:bg-[#FFD700] hover:text-gray-950 rounded-md"  >
                  <DashboardIcon fontSize='large'  className="text-[#FFDB58] mr-2  group-hover:text-gray-950 p-1 "/> Dashboard
              </a>
              </div>
              <div className="group">
              <a href="#" className="flex items-center font-roboto  font-medium text-xl p-2 mb-1 text-white leading-6 mx-2 hover:bg-[#FFD700] hover:text-gray-950 rounded-md"  >
              <LibraryBooksIcon fontSize='large' className="text-[#FFDB58] mr-2   group-hover:text-gray-950" /> 
              Books
              </a>
              </div>
              <div className=" group">
              <a href="#" className="flex items-center font-roboto  font-medium text-xl p-2 mb-1 text-white leading-6 mx-2 hover:bg-[#FFD700] hover:text-gray-950 transition duration-75 rounded-md"  >
              <BookIcon fontSize='large' className="text-[#FFDB58] mr-2  group-hover:text-gray-950 tra" /> Genres
              </a>
              </div>
              <div className=" group">
              <a href="#" className="flex items-center font-roboto  font-medium text-xl p-2 mb-1 text-white leading-6 mx-2 hover:bg-[#FFD700] hover:text-gray-950 transition duration-75 rounded-md"  >
              <PeopleIcon fontSize='large' className="text-[#FFDB58] mr-2  group-hover:text-gray-950 tra" /> Users
              </a>
              </div>
              
              </nav>
            </div>
        
   
  );
}
