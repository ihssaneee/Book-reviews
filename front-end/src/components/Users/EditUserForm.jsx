import React, { useEffect } from "react";
import { useState } from "react";
import { useUsers } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddIcon from "@mui/icons-material/Add";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";


const EditUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
        picture: null,
    });
    const onDrop= (acceptedFiles)=>{
        setFormData({
            ...formData,
            picture:acceptedFiles[0]
        })
    };
    const {getRootProps,getInputProps,isDragActive}= useDropzone({
        onDrop,
        accept:"images/*",
        multiple:false,
    })

    const inputStyle= "rounded-lg p-2 border-neutral-300 ";
    const divStyle="flex flex-col w-full gap-1 p-4 flex-shrink ";
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    //extract id from the url
    const { id } = useParams();
    const { EditUser, showUser } = useUsers();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    useEffect(()=>{
        const fetchUser= async() =>{
            try{
                const user= await showUser(id);
                setFormData({
                    name:user.name,
                    email:user.email,
                    role:user.role,
                    picture:user.picture
                    

                });
                console.log('user fetched successfuly');

            }
            catch(error){
                console.error('user could not be fetched',error)
            }
        };
        fetchUser();
    },[id])

    const handleSubmit = () => {};
    return (
        <div className="flex flex-col border rounded-lg my-24  max-w-md mx-auto font-Roboto    bg-white">
            <div className="border-b  m-4 py-4 flex-shrink ">
                <h2 className=" text-2xl font-bold p-2">Edit user</h2>
            </div>
            <form onSubmit={handleSubmit} className="">
                <div className={divStyle}>
                    <label htmlFor="name" className="">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputStyle}
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className={inputStyle}
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="role">Role</label>
                    <input 
                    type="text"
                    name='role'
                    value={formData.role}
                    onChange={handleChange}
                    className={inputStyle}
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password"
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Leave blank to keep current password"
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="password_confirmation">Confirm Password</label>
                    <input 
                    type="password"
                    name='password_confirmation'
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Leave blank to keep current password"
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="picture">Profile Picture</label>
                    <img src={formData.picture} className="w-40 h-auto mx-auto my-4" />
                </div>
            </form>
        </div>
    );
};

export default EditUser;
