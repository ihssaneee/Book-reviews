import React,{useState} from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUsers } from '../../contexts/UserContext';
import CustomDropdown from '../../shared/custom_dropdown';
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from '../../utils/api';


export default function PersonalDetails(){
    const inputStyle ="rounded-lg p-2 border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-600 inputStyle w-full";
    const divStyle = "flex flex-col   w-full gap-1 flex-shrink w-full ";
    const {user}=useAuth();
    const {data,isLoading,error,isError}=useQuery({
        queryKey:['countries'],
        queryFn:fetchCountries,
    })
     const [formData,setFormData]=useState({
            name:user?.name,
            email:user?.email,
            role:user?.role,
            gender:user?.gender,
            phone_number:user?.phone_number,
            country:data?data.find(country=>country.cca2===user.country&&country):"",
            address:user?.address,

            });
   
            
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
            const handleSubmit=async()=>{
    
            }
    


    return(
       
            <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 text-sm font-public-sans ">
                   <div className='flex lg:flex-row flex-col gap-6 '>
                        <div className={divStyle}>
                                <label htmlFor="name" className="labelStyle">Name</label>
                                <input type="text" name="" value={formData.name} onChange={handleChange} className={inputStyle} />
                        </div>
                        
                        <div className={divStyle}>
                                <label htmlFor="email" className="labelStyle">Email</label>
                                <input type="text" name="" value={formData.email} onChange={handleChange} className={inputStyle} />
                        </div>
                   </div>
                   <div className='flex lg:flex-row flex-col gap-4 '>
                        <div className={divStyle}>
                                <CustomDropdown
                                                    options={data&&data}
                                                    className="w-full"
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
                                <label htmlFor="gender" className="labelStyle">Gender</label>
                                <select name='gender' value={formData.gender} onChange={handleChange} className='inputStyle'>
                                    <option value='female' >Female</option>
                                    <option value="male">Male</option>
                                </select>
                        </div>
                   </div>
                   <div className='flex lg:flex-row flex-col gap-6 '>
                        <div className={divStyle}>
                                <label htmlFor="address" className="labelStyle">Address</label>
                                <input type="text" name="" value={formData.address} onChange={handleChange} className={inputStyle} />
                        </div>
                        
                        <div className={divStyle}>
                                <label htmlFor="phone number" className="labelStyle">Phone Number</label>
                                <input type="text" name="" value={formData.phone_number} onChange={handleChange} className={inputStyle} />
                        </div>
                   </div>
            </form>
            
    )
}