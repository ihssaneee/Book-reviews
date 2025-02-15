import React, { useCallback } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddIcon from "@mui/icons-material/Add";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link } from "react-router-dom";

export default function AddUserForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        picture: null,
    });
    const onDrop = (acceptedFiles) => {
        setFormData({
            ...formData,
            picture: acceptedFiles[0],
        });
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false,
    });
    // File Preview
    const filePreview = formData.picture ? (
        <div className="mt-4">
            <p>Selected File: {formData.picture.name}</p>
            <img
                src={URL.createObjectURL(formData.picture)}
                alt="Preview"
                style={{ width: "100px", height: "auto", marginTop: "10px" }}
            />
        </div>
    ) : null;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="flex flex-col   bg-white border   max-w-lg m-auto my-5 rounded-md shadow  font-Robotoroboto lg:text-base text-xs">
            <div className=" border-b m-4 py-4 flex-shrink">
                <h2 className="text-2xl font-bold">Add New User</h2>
            </div>
            <div className="flex flex-col p-4  w-full gap-1 flex-shrink ">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-lg p-2 border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-400"
                />
            </div>
            <div className="flex flex-col p-4 w-full gap-1 flex-shrink">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    className="rounded-lg  p-2 focus:ring-yellow-400 border-neutral-300 focus:outline-yellow-400 "
                />
            </div>
            <div className="flex flex-col px-4 w-full gap-1 flex-shrink">
                <label htmlFor="role">Role</label>
                <input
                    type="text"
                    name="role"
                    placeholder="Enter role"
                    value={formData.role}
                    onChange={handleChange}
                    className="rounded-lg p-2 border-neutral-300 focus:ring-yellow-400 focus:outline-yellow-400"
                />
            </div>
            <div className="flex flex-col p-4 w-full gap-1 flex-shrink">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="rounded-lg border-neutral-300  p-2 focus:ring-yellow-400 focus:outline-yellow-400"
                />
            </div>
            <div className="flex flex-col p-4  w-full gap-1  flex-shrink  ">
                <label htmlFor="picture">Profile Picture</label>
                <div
                    {...getRootProps({ className: "dropzone" })}
                    className="border-dashed border-2 border-neutral-300 p-8 cursor-pointer rounded-lg text-center"
                >
                    <input {...getInputProps({})} />
                    <FileUploadOutlinedIcon
                        fontSize="large"
                        className="text-gray-500 border  bg-neutral-200  mb-4"
                    />
                    <p className="text-sm">
                        Drag and drop some files here, or click to select files
                    </p>
                </div>
                <aside className="flex flex-wrap mt-4">{filePreview}</aside>
            </div>
            <div className=" flex  items-center justify-around ">
            
                <Link
                    type="submit"
                    className="w-24 m-4 text-base p-2 rounded-md bg-yellow-300 flex items-center justify-center gap-2 hover:bg-yellow-400"
                >
                    <AddIcon fontSize="small" />
                    Add
                    
                </Link>
                <Link to="/dashboard/users" className="w-24 m-4 rounded-md border p-2 border-red-500 text-red-500 text-base">
                        Cancel 
                </Link>
                    
            </div>
        </div>
    );
}
