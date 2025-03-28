import React, { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    const [toggled, setToggled] = useState(false);
    const toggle = () => {
        setToggled(!toggled);
    };

    return (
        <div className=" ">
            <aside className={`fixed inset-0 z-30 max-h-screen ${toggled ? "translate-x-0 w-64 " : "-translate-x-64 w-0"} lg:translate-x-0  ${toggled ? "lg:w-20" : "lg:w-64"} transition-all duration-300 ease-in-out`}>
                <AdminSidebar toggle={toggle} toggled={toggled} />
            </aside>
            {toggled && (
                <div className="fixed inset-0 z-20 bg-black opacity-25 backdrop-blur-sm lg:hidden" onClick={toggle}></div>
            )}
            <main className=" m-0 bg-[#F4F4F4] min-h-screen">
                <header className={`ml-0 lg:ml-64 h-auto border fixed top-0 z-10 left-0 right-0 bg-white ${toggled ? "lg:ml-marginLeft" : "lg:ml-64"}`}>
                    <AdminHeader toggle={toggle} className="w-full " />
                </header>
                <section className={` ${toggled ? "lg:ml-24" : "lg:ml-[17rem] mr-3 ml-3"} mt-24  `}>
                    <Outlet />
                </section>
            </main>
        </div>
    );
}