import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import Genres from "../components/Genres/GenresList";
import { Outlet } from "react-router-dom";

export default function Dashboard(){
    return (
        <div className="flex h-screen" >
            <aside className="fixed top-0 left-0 h-screen w-64 bg-[#000035] border rounded-none ">
                <AdminSidebar/>
            </aside>
            <main className="flex-1 flex flex-col">
                <header >
                    <AdminHeader className="fixed"/>
                </header>
                <section className="ml-64">
                    <Outlet />
                    
                </section>
            </main>





        </div>
    )
}