import React,{useRef} from "react";
import { useAuth } from "../../contexts/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import { useUsers } from "../../contexts/UserContext";

export default function UserProfile() {

    const {user,updateUser}=useAuth();
    const {editUser}=useUsers();
    const fileInputRef=useRef(null);
    const handleClick= ()=>{
        fileInputRef.current.click();
    }
    const handleFileChange= async(e)=>{
        const file=e.target.files[0];
        if (file)
            {
            try{
                const formDataToSend= new FormData();
                formDataToSend.append('picture',file);
               const response =await editUser(user.id,formDataToSend);
                console.log('profile picture updated successfully.',response.picture);

                updateUser({...user,picture:response.picture});

            }
            catch(error){
                console.error('error updating profile picture:',error);
                
            }
        }
    }


    return (
        <div className="bg-white font-Roboto">
            <div className="relative">

                <img src="/images/default_cover.webp" className="w-screen h-56 border object-cover" />
                <div className="absolute top-44 left-6">

                    <img src={user.picture} className="w-40 h-40  rounded-full object-cover border-4"/>
                    <button 
                    onClick={handleClick}
                    className="absolute bottom-6 left-32  bg-gray-200 rounded-full hover:bg-opacity-85">
                        <EditIcon fontSize="large" className="p-2 " />
                    </button>
                    <input type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden" />
                </div>
                <span className=" absolute left-48 top-64 text-4xl font-bold">{user.name}</span>
                <span className="absolute right-0 lg:m-4  lg:top-72 top-80  text-sm font-light" >Joined in {user.created_at}</span>
            </div>
               
           
        </div>
    )
}