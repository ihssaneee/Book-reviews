import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
export default function Dashboard(){
    return (
        <div className="flex " >
            <AdminSidebar/>
            <div className="flex-1">
                <AdminHeader/>
            </div>





        </div>
    )
}