import React,{useState,useEffect} from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
export const CustomDropdown= ({label,value,placeholder,options})=>{
    const [isDropdownOpen,setIsDropdownOpen]=useState(false);
    const handleSelect=(option)=>{
        onChange(option);
        setIsDropdownOpen(false);
    }


    return (
        <div className='relative w-full'>
            <label >{label}</label>
            <div>
                <button 
                onClick={setIsDropdownOpen(!isDropdownOpen)}
                className=''
                >
                    {value?(
                    renderOption(value)
                ):
                (
                    placeholder || "select an option"
                )}

                </button>
                 <span> <KeyboardArrowDownOutlinedIcon fontSize="medium" className=" text-gray-500" /> </span>
            </div>
            {isDropdownOpen &&(
                <div className="">
                    {options.map((option)=>(
                        <div 
                        key={option.id || options.cca2}
                        onClick={handleSelect(option)}
                        className=""
                        >
                            {renderOption(option)}
                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}