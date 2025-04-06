import React, { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import { useUsers } from "../../contexts/UserContext";

export default function UserProfile() {
    const { user, updateUser } = useAuth();
    const { editUser } = useUsers();
    const fileInputRef = useRef(null);
    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append("picture", file);
                const response = await editUser(user.id, formDataToSend);
                console.log(
                    "profile picture updated successfully.",
                    response.picture
                );

                updateUser({ ...user, picture: response.picture });
            } catch (error) {
                console.error("error updating profile picture:", error);
            }
        }
    };

    return (
        <div className=" font-public-sans h-full  mx-5  ">
            <div className="relative min-h-[350px] bg-white dark:bg-[#22242B]  dark:text-neutral-400 ">
                <div className="">
                    <img
                        src="/images/default_cover.webp"
                        className="w-screen h-56  object-cover"
                    />
                    <div className="absolute top-44 left-6">
                        <img
                            src={user.picture}
                            className="w-40 h-40  rounded-full object-cover border-4  dark:border-[#1A1C23]"
                        />
                        <button
                            onClick={handleClick}
                            className="absolute bottom-6 left-32  bg-gray-200 rounded-full hover:bg-opacity-85 dark:bg-[#1A1C23]  dark:text-neutral-400"
                        >
                            <EditIcon fontSize="large" className="p-2 " />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                </div>
                    <span className=" absolute left-48 top-64 text-4xl font-bold ">
                        {user.name}
                    </span>
                    <span className="absolute right-0 mx-4  lg:top-72 top-80  text-sm font-light">
                        Joined in {user.created_at}
                    </span>
                </div>
            </div>
        
            <div className="relative block pb-1  bg-white mt-8 font-public-sans h-auto dark:bg-[#22242B] labelStyle dark:border-neutral-800 dark:border ">
                    <div className="border-b dark:border-neutral-800 p-4 font-medium dark:bg-[#22242B]">
                        <h5 className="labelStyle ">General Info</h5>
                    </div>
           
                <table className="border inputStyle  table-auto w-full text-sm text-slate-600 font-medium   ">
                    <tbody>
                        <tr className= "">
                            <td className="px-6 ">Name</td>
                            <td className="p-2">-</td>
                            <td className="text-left">{user.name}</td>
                        </tr>
                        <tr className="dark:bg-[#22242B]" >
                        <td className="px-6 ">Email</td>
                            <td className="p-2">-</td>
                            <td className="text-left">{user.email}</td>
                        </tr>
                        <tr className="" >
                        <td className="px-6">Gender</td>
                            <td className="p-2">-</td>
                            <td className="text-left">{user.gender}</td>
                        </tr>
                        
                        <tr className="dark:bg-[#22242B]" >
                        <td className="px-6">phone number</td>
                            <td className="p-2">-</td>
                            <td className="text-left">{user.phone_number}</td>
                        </tr>
                        <tr className="" >
                        <td className="px-6">Country</td>
                            <td className="p-2">-</td>
                            <td className="text-left">{user.country}</td>
                        </tr>
                        <tr className="dark:bg-[#22242B]" >
                        <td className="px-6">Reviews Count</td>
                            <td className="p-2">-</td>
                            <td className="text-left">{user.reviews_count}</td>
                        </tr>
                        <tr className="" >
                        <td className="px-6">books read</td>
                            <td className="p-2">-</td>
                            <td className="text-left">{user.books_read_count}</td>
                        </tr>
                       
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}
