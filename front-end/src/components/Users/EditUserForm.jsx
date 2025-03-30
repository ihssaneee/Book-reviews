import React, { useEffect } from "react";
import { useState } from "react";
import { useUsers } from "../../contexts/UserContext";
import { Link, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddIcon from "@mui/icons-material/Add";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CustomDropdown from "../../shared/custom_dropdown";
import { fetchCountries } from "../../utils/api";

const EditUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        country: "",
        role: "",
        password: "",
        password_confirmation: "",
        picture: null,
    });
    const [countries, setCountries] = useState([]);
    const onDrop = (acceptedFiles) => {
        setFormData({
            ...formData,
            picture: acceptedFiles[0],
        });
    };
    const [currentPicture, setCurrentPicture] = useState(null);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "images/*",
        multiple: false,
    });
    //file preview
    const filePreview =
        formData.picture && formData.picture instanceof File ? (
            <div className="mt-2">
                <p> Selected file: {formData.picture.name} </p>
                <img
                    src={URL.createObjectURL(formData.picture)}
                    alt="Profile picture preview"
                    className="w-24 h-auto mt-10 "
                />
            </div>
        ) : null;

    const inputStyle = "rounded-lg p-2 border-neutral-300 ";
    const divStyle = "flex flex-col w-full gap-1 p-4 flex-shrink ";
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    //extract id from the url
    const { id } = useParams();
    const { editUser, showUser } = useUsers();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedCountries = await fetchCountries();
                setCountries(fetchedCountries);

                const user = await showUser(id);
                const selectedCountry = fetchedCountries.find(
                    (country) => country.cca2 === user.country
                );
                console.log(selectedCountry, user.country);
                setFormData({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    country: selectedCountry || null,
                    gender: user.gender,
                    password: "",
                    password_confirmation: "",
                    picture: null,
                });

                setCurrentPicture(user.picture);
                console.log("user fetched successfuly");
            } catch (error) {
                console.error("user could not be fetched", error);
            }
        };
        fetchUser();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key !== "country" && formData[key]) {
            formDataToSend.append(key, formData[key]);
            }
        });
        if (formData.country){
            formDataToSend.append('country',formData.country.cca2);
        }
        // Log FormData entries
        for (let [key, value] of formDataToSend.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            await editUser(id, formDataToSend);
            console.log("User updated successfully.", formDataToSend);
            setError(null);
            setSuccess("User updated successfully.");
        } catch (error) {
            console.log("User could not be updated", error);
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred.";
            setError(errorMessage);
            setSuccess(null);
        }
    };

    return (
        <div className="flex flex-col border rounded-lg my-5 w-full lg:max-w-lg mx-auto font-Roboto    bg-white">
            <div className="border-b  m-4 py-4 flex-shrink ">
                <h2 className=" text-2xl font-bold p-2">Edit user</h2>
            </div>
            <form onSubmit={handleSubmit} className="">
                <div className={divStyle}>
                    <label htmlFor="name" className="">
                        Name
                    </label>
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputStyle}
                    />
                </div>
                <CustomDropdown
                    options={countries}
                    value={formData.country}
                    onChange={(selectedCountry) =>
                        setFormData((prevData) => ({
                            ...prevData,
                            country: selectedCountry,
                        }))
                    }
                    placeholder="Select a Country"
                    renderOption={(country) => (
                        <div className="flex items-center">
                            <img
                                src={country.flags.svg}
                                alt="flag"
                                className="w-6 h-6 mr-2"
                            />
                            {country.name.common}
                        </div>
                    )}
                />
                <div className={divStyle} >
                    <label htmlFor="gender">Gender</label>
                    <select name='gender' value={formData.gender} className={inputStyle+"cursor-pointer"} onChange={handleChange}>
                        <option value="female" >female</option>
                        <option value='male' >male</option>
                    </select>
                </div>
                <div className={divStyle}>
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={inputStyle}
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={inputStyle}
                        placeholder="Leave blank to keep current password"
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="password_confirmation">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className={inputStyle}
                        placeholder="Leave blank to keep current password"
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="picture">Profile Picture</label>
                    <img
                        src={currentPicture}
                        className="w-40 h-auto mx-auto my-4"
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="picture">Update Profile Picture</label>
                    <div
                        {...getRootProps()}
                        className="border-dashed border-2 p-8 rounded-lg text-center cursor-pointer "
                    >
                        <input {...getInputProps()} />
                        <FileUploadOutlinedIcon
                            fontSize="large"
                            className="text-gray-500 bg-neutral-200 mb-4"
                        />
                        <p className="text sm">
                            Drag and drop your picture here, or click to select
                            file
                        </p>
                    </div>
                    <aside> {filePreview} </aside>
                </div>
                {error && <span className="text-red-600 text-base m-2 ">{error}</span>}
                {success && (
                    <span className="text-green-600 text-base m-2">{success}</span>
                )}
                <div className="flex items-center justify-center">
                    <button className="w-24 m-6  text-base p-2 rounded-md bg-yellow-300 flex items-center justify-center gap-2 hover:bg-yellow-400">
                        <AddIcon fontSize="small" className="" />
                        Save
                    </button>

                    <Link
                        to="/admin/users"
                        className="w-24 m-6 rounded-md border p-2 border-red-500 text-red-500 text-base flex items-center justify-center hover:bg-red-50"
                    >
                        <CancelOutlinedIcon fontSize="small" className="" />
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
