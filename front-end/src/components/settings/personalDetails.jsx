import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUsers } from "../../contexts/UserContext";
import CustomDropdown from "../../shared/custom_dropdown";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../utils/api";

export default function PersonalDetails() {
    const inputStyle =
        "rounded-lg p-2 border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-600 inputStyle w-full";
    const divStyle = "flex flex-col   w-full gap-1 flex-shrink w-full ";
    const { data, isLoading, error: queryError, isError } = useQuery({
        queryKey: ["countries"],
        queryFn: fetchCountries,
    });
    const { user } = useAuth();
    const [error,setError]= useState(null);
    const [success,setSuccess]= useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        gender: "",
        phone_number: "",
        country: "",
        address: "",
    });
    useEffect(() => {
        if (user && data) {
            setFormData({
                name: user.name,
                email: user.email,
                role: user.role,
                gender: user.gender,
                phone_number: user.phone_number,
                country: data.find((country) => country.cca2 === user.country),
                address: user.address,
            });
        }
    }, [user, data, isLoading]);

    const { editUser } = useUsers();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Filter out empty fields from formData
            const filteredData = new FormData();
            Object.entries(formData).forEach(([key,value])=>{
                if (key==="country" && value){
                    filteredData.append('country',formData[key].cca2);
                }else if(value){
                    filteredData.append(key,value);
                }

            })
          

            await editUser(user.id, filteredData);
            setSuccess('Data updated successfully');
            setError(null);
        } catch (error) {
            console.error('Data could not be updated');
            const errorMessage = error.response?.data?.message || "An unexpected error happened.";
            setError(errorMessage);
            setSuccess(null);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 flex flex-col gap-4  font-public-sans mx-9 lg:text-base text-sm"
        >
            <div className={divStyle}>
                <label htmlFor="name" className="labelStyle">
                    Name
                </label>
                <input
                    type="text"
                    name=""
                    value={formData.name}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>

            <div className={divStyle}>
                <label htmlFor="email" className="labelStyle">
                    Email
                </label>
                <input
                    type="text"
                    name=""
                    value={formData.email}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>

            <div className={divStyle}>
                <CustomDropdown
                    options={data && data}
                    style=" relative rounded-md  "
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
            </div>

            <div className={divStyle}>
                <label htmlFor="phone number" className="labelStyle">
                    Phone Number
                </label>
                <div className="flex items-center gap-2 border inputStyle px-2 ">
                    {console.log(formData.country)}
                    <span className="flex justify-center items-center gap-1 ">
                        <img
                            src={formData.country?.flags?.svg}
                            className="w-6 h-6"
                        />
                        {formData.country?.idd?.root +
                            formData.country?.idd?.suffixes}
                    </span>
                    <input
                        type="text"
                        name=""
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="border-none focus:ring-0 dark:bg-[#1A1C23] w-full"
                    />
                </div>
            </div>

            <div className={divStyle}>
                <label htmlFor="address" className="labelStyle">
                    Address
                </label>
                <input
                    type="text"
                    name=""
                    value={formData.address}
                    onChange={handleChange}
                    className={inputStyle}
                />
            </div>

            <div className={divStyle}>
                <div className={divStyle}>
                    <label htmlFor="gender" className="labelStyle">
                        Gender
                    </label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={inputStyle}
                    >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>
                {error&&<span className="text-red-600 m-2 text-base">{error}</span>}
                {success&&<span className="text-green-600 m-2 text-base">{success}</span>}
                <div className="flex items-center justify-center my-4 text-base" >
                    <button className="px-6 py-3 bg-yellow-500 text-neutral-800 rounded-md hover:bg-yellow-400" >Save</button>
                </div>
            </div>

        </form>
    );
}
