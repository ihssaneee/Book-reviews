import React, { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import { Outlet } from "react-router-dom";

export default function Dashboard(){
    const [toggled,setToggled]=useState(false);
    const toggle=(e)=>{
        setToggled(e);
    }

    return (
        <div className="flex h-screen" >
            <aside className="">
                <AdminSidebar toggled={toggled} />
            </aside>
            <main className="flex-1 flex flex-col ">
                <header className={`${toggled? "ml-20": "ml-64"}`} >
                    <AdminHeader toggle={toggle}  className="fixed"/>
                </header>
                <section className={`${toggled?"ml-24":"ml-[17rem]"} mr-10`}>
                    <Outlet />
                    
                </section>
            </main>





        </div>
    )
}