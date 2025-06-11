import React from "react";
import { useState } from "react";
import { axiosInstance } from "../api/axiosConfig";

export default function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        password_confirmation: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const validateForm = () => {
        const { name, email, password, password_confirmation } = formData;
        if (!name || !email || !password || !password_confirmation) {
            setError("All fields are required!");
            return false;
        }
        if (password !== password_confirmation) {
            setError("Passwords don't match.");
            return false;
        }
        if (password.length < 4) {
            setError("Password should be at least 4 characters.");
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return false;
        }
        try {
            const response = await axiosInstance.post("/signup", formData);
            console.log("sign up successful!", response.data);
        } catch (error) {
            console.log("error! could not sign up user!", error);
        }
    };

    return (
        <>
            <div className="flex min-h-full  flex-1 flex-col justify-center px-6 py-4 pt-8 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt=""
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-6 labelStyle text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Create Account
                    </h2>
                </div>
            </div>
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm mx-6  pb-8 ">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm/6 font-medium text-gray-900 labelStyle"
                        >
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                autoComplete="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="block loginStyle dark:bg-[#22242B] dark:border-none dark:ring-0 w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-neutral-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-gray-900 labelStyle"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                autoComplete="email"
                                onChange={handleChange}
                                className="block loginStyle dark:bg-[#22242B] dark:border-none dark:ring-0 w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-neutral-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm/6 font-medium text-gray-900 labelStyle"
                        >
                            Password
                        </label>

                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                                autoComplete="current-password"
                                className="block loginStyle dark:bg-[#22242B] dark:border-none dark:ring-0 w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-neutral-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm/6 font-medium text-gray-900 labelStyle"
                        >
                            Confirm Password
                        </label>

                        <div className="mt-2">
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                onChange={handleChange}
                                value={formData.password_confirmation}
                                required
                                autoComplete="current-password"
                                className="block loginStyle dark:bg-[#22242B] dark:border-none dark:ring-0 w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-neutral-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
