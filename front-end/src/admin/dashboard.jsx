import React, { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import { Outlet } from "react-router-dom";

export default function Dashboard(){
    const [toggled,setToggled]=useState(false);
    const toggle=()=>{
        setToggled(!toggled);
    }

    return (
        <div className="flex h-screen" >
            <aside className={`fixed inset-0 z-30 max-h-screen ${toggled? "translate-x-0 w-64 ": "-translate-x-64 w-0"} lg:translate-x-0  ${toggled? "lg:w-20" : "lg:w-64" } transition-all duration-300 ease-in-out `}>
                <AdminSidebar toggle={toggle} toggled={toggled} />
            </aside>
            {toggled && (
                <div className="fixed inset-0 z-20 bg-black opacity-25 z- backdrop-blur-sm lg:hidden " onClick={toggle}>
                    
                </div>
            )
                
            }
           
            <main className="flex-1 flex max-h-screen   flex-col  bg-[#F4F4F4]  ">
                <header className={` ml-0   lg:ml-64 h-auto border bg-white  ${toggled? "lg:ml-marginLeft" : "lg:ml-64" }  `} >
                    <AdminHeader toggle={toggle}  className="w-full "/>
                </header>
                <section className={`${toggled?"lg:ml-24":"lg:ml-[17rem] mr-3 ml-3 "} 
                flex-1  `}>
                    <Outlet  />
                    
                </section>
            </main>
            





        </div>
    )
}