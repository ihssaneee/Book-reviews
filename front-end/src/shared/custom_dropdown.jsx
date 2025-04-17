// src/components/shared/CustomDropdown.jsx

import React, { useState } from "react";

const CustomDropdown = ({ options, value, onChange, placeholder, renderOption,style=null }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Handle option selection
    const handleSelect = (option) => {
        onChange(option); // Pass the selected option to the parent
        console.log(option);
        setIsDropdownOpen(false); // Close the dropdown
    };

    return (
        <div className={style}>
            <label htmlFor="country" className="labelStyle">country</label>
            {/* Dropdown Button */}
            <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full border p-2 rounded-md flex focus:ring-yellow-500 outline-2 focus:ring-2 focus:outline-yellow-500 items-center justify-between inputStyle"
            >
                {value ? (
                    renderOption(value) // Customize how the selected value is displayed
                ) : (
                    placeholder || "Select an Option"
                )}
                <span>{isDropdownOpen ? "▲" : "▼"}</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute inputStyle  w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {options&&options.map((option) => (
                        <div
                            key={option.id || option.cca2} // Use a unique key for each option
                            onClick={() => handleSelect(option)}
                            className="flex items-center p-2 cursor-pointer"
                        >
                            {renderOption(option)} {/* Customize how each option is displayed */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;