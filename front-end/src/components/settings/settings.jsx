import React,{useState} from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUsers } from "../../contexts/UserContext";
import {Link} from 'react-router-dom';
import PersonalDetails from "./personalDetails";
import UpdatePassword from "./updatePassword";
import DeleteAccount from "./deleteAccount";

export default function Settings(){
    
        const [activeTab,setActiveTab]=useState('personal-details');
        const [formData,setFormData]=useState({

        });
        const {user}=useAuth();
        const {editUser}=useUsers();
        const handleChange=(e)=>{
            const {name,value}=e.target;
           setFormData(prev=>{
            return {
                ...prev,
                [name]:value
            }
           })
        }
       

        return(
            <div className="bg-white dark:bg-[#22242B] w-full lg:max-w-xl mx-auto font-public-sans dark:text-neutral-400 flex flex-col " >
                {/* <div className=" border-b dark:border-b-neutral-700 labelStyle">
                    <h2 className="text-2xl " >Edit Profile</h2>
                </div> */}
                
                    <ul className="flex gap-6 dark:text-neutral-400  border-b border-b-neutral-400 text-base font-public-sans " >
                        <li className={`${activeTab==="personal-details"&&"border-b border-yellow-600   text-yellow-600 "} p-4 mx-2 `} onClick={()=>setActiveTab('personal-details')}  ><Link to="" className="" >Personal Details </Link></li>
                        <li className={`${activeTab==="update-password"&&"border-b border-yellow-600  text-yellow-600 "} p-4 mx-2`} onClick={()=>setActiveTab('update-password')} ><Link to="" on >Update Password </Link></li>
                        <li className={`${activeTab==="delete-account"&&"border-b border-yellow-600   text-yellow-600 "} p-4 mx-2 `} onClick={()=>setActiveTab('delete-account')}><Link to="" >Delete Account </Link></li>
                    </ul>
                    <div className="w-full"  >
                        {activeTab==='personal-details'&&<div className="">
                            <PersonalDetails />
                        </div>}
                        {activeTab==='update-password'&&<div className="">
                            <UpdatePassword/>
                        </div>}
                        {activeTab==='delete-account'&&<div className="">
                            <DeleteAccount/>
                        </div>}
                    </div>

              
               
            </div>
        )
}