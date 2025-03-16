import React, { useEffect } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useUsers } from "../../contexts/UserContext";
import axios from "axios";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

export default function AddUserForm() {
    const { addUser } = useUsers();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender:"",
        phone_number:"",
        address:"",
        country:"",
        role: "",
        password: "",
        password_confirmation: "",
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
  accept: {
    'image/*': []  // ✅ This is the required format for v14.x
  },
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
    const validateForm = () => {
        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.role.trim() ||
            !formData.password.trim() ||
            !formData.password_confirmation.trim()
        ) {
            setError("All fields are required.");
            return false;
        }
        setError(null);
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const formDataToSend= new FormData();
            formDataToSend.append('name',formData.name);
            formDataToSend.append('email',formData.email);
            formDataToSend.append('role',formData.role);
            formDataToSend.append('password',formData.password);
            formDataToSend.append('country',formData.country);
            formDataToSend.append('gender',formData.gender);
            formDataToSend.append('password_confirmation',formData.password_confirmation);
            if (formData.picture){
                formDataToSend.append("picture",formData.picture)
            }
           
            await addUser(formDataToSend);
            setFormData({
                name: "",
                email: "",
                role: "",
                gender:"",
                country:"",
                password: "",
                password_confirmation: "",
                picture: null,
            });
            setError(null);
            setSuccess("User added successfuly!");
        } catch (error) {
            console.error("could not add user !", error);
            const errorMessage =
                error.response?.data?.message || "an unexpected error occured";
            setError(errorMessage);
            setSuccess(null);
        }
    };
    // State to hold the list of countries
    const [countries, setCountries] = useState([]);

    // State to manage the visibility of the custom dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // State to manage the visibility of the custom dropdown
   // Handle country selection
   const handleCountrySelect = (current_country) => {
    setFormData((prevData) => ({
        ...prevData,
        country: current_country.cca2, // Update the country code in the form data
    }));
    setIsDropdownOpen(false); // Close the dropdown after selection
};
    //helper function to get the selected country 
    const getSelectedCountry=()=>{
        return formData.country?countries.find((country)=>country.cca2===formData.country):null;
    }
    const fetchCountries = async () => {
        try {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            const sortedCountries = response.data.sort((a,b)=>{
               return a.name.common.localeCompare(b.name.common);
            })
            setCountries(sortedCountries);
        } catch (error) {
            console.error('an error happened.', error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        console.log("countries fetched successfully", countries);
    }, [countries]);
    return (
        <div className="flex flex-col   bg-white border   max-w-lg m-auto my-5 rounded-md shadow  font-Inter lg:text-base text-sm">
            <div className=" border-b m-4 py-4 flex-shrink">
                <h2 className="text-2xl font-bold">Add New User</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col p-4   w-full gap-1 flex-shrink ">
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
                <div className=" relative p-4 w-full   text-base  ">
                <label htmlFor="country" className=" text-gray-700">Country</label>
                     < div   className="mt-1  w-full border border-gray-300 rounded-md p-3  cursor-pointer flex items-center justify-between" onClick={() => setIsDropdownOpen(!isDropdownOpen)} >
                    
                    <button
                        type="button"
                        
                        className="flex"
                    >
                        {formData.country ? (
                            <>
                                <img
                                    src={getSelectedCountry().flags.svg}
                                    alt="Flag"
                                    className="w-6 h-6 mr-2"
                                />
                                {getSelectedCountry().name.common}
                            </>
                        ) : (
                            'Select a Country'
                        )}
                         
                        
                        </button>
                        <span> <KeyboardArrowDownOutlinedIcon fontSize="medium" className=" text-gray-500" /> </span>
                        </div>
                         {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute    lg:w-[478px] w-full  bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                            {countries.map((current_country) => (
                                <div
                                    key={current_country.cca2}
                                    onClick={() => handleCountrySelect(current_country)}
                                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <img src={current_country.flags.svg} alt={`${current_country.name.common} flag`} className="w-6 h-6 mr-2" />
                                    {current_country.name.common}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-col px-4 my-2 w-full flex-shrink">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="rounded-lg p-3 my-2 border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-400">
                        <option value="" >Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>                    
                </select>
                </div>
                <div className="flex flex-col px-4 w-full my-2 gap-1 flex-shrink">
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
                <div className="flex flex-col p-4 w-full gap-1 flex-shrink">
                    <label htmlFor="password-confirmation">
                        Confirm Passwrod
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="rounded-lg border-neutral-300 p-2 focus:ring-yellow-400 focus:outline-yellow-400"
                    />
                </div>
                <div className="flex flex-col p-4  w-full gap-1  flex-shrink  ">
                    <label htmlFor="picture">Profile Picture</label>
                    <div
                        {...getRootProps()}
                        className="border-dashed border-2 border-neutral-300 p-8 cursor-pointer rounded-lg text-center"
                    >
                        <input {...getInputProps({})} type="file" />
                        <FileUploadOutlinedIcon
                            fontSize="large"
                            className="text-gray-500 border  bg-neutral-200  mb-4"
                        />
                        <p className="text-sm">
                            Drag and drop some files here, or click to select
                            files
                        </p>
                    </div>
                    <aside className="flex flex-wrap mt-4">{filePreview}</aside>
                </div>
                {error && (
                    <span className="text-red-600 text-lg m-4">{error}</span>
                )}
                {success && (
                    <span className="text-green-600 text-lg ">{success}</span>
                )}
                <div className=" flex  items-center justify-center ">
                    <button
                        type="submit"
                        onSubmit={handleSubmit}
                        className="w-24 m-6  text-base p-2 rounded-md bg-yellow-300 flex items-center justify-center gap-2 hover:bg-yellow-400"
                    >
                        <AddIcon fontSize="small" />
                        Add
                    </button>
                    <Link
                        to="/dashboard/users"
                        className="w-24 m-6 rounded-md border p-2 border-red-500 text-red-500 text-base flex items-center justify-center hover:bg-red-50"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
