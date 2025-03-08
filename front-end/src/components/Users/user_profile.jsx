import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import EditIcon from "@mui/icons-material/Edit";

export default function UserProfile() {

    const {user}=useAuth();




    return (
        <div className="bg-white font-Roboto">
            <div className="relative">

                <img src="/images/default_cover.webp" className="w-screen h-56 border object-cover" />
                <img src={user.picture} className="w-40 h-40 absolute top-44 left-6 rounded-full object-cover "/>
                <span className=" absolute left-48 top-64 text-4xl font-bold">{user.name}</span>
                <span className="absolute right-0 lg:m-4  lg:top-72 top-80  text-sm font-light" >Joined in {user.created_at}</span>
            </div>
               
           
        </div>
    )
}