import React from "react";
import { useState } from "react";
import { useGenres } from "../../contexts/GenreContext";
import { RotatingLines } from "react-loader-spinner";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Tooltip } from "react-tooltip";
import CloseIcon from "@mui/icons-material/Close";
import ReusableTable from "../ReusableTable";

/**
 * Genres component that displays a list of genres with filtering options.
 *
 * @component
 * @example
 * return (
 *   <Genres />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * This component fetches and displays a list of genres. It includes options to filter the genres by name and ID.
 * It also provides a search input and buttons to add a new genre, filter genres, and perform actions on each genre.
 *
 * @function
 * @name Genres
 *
 * @hook
 * @name useGenres
 * @description Custom hook to fetch genres data.
 *
 * @state {boolean} isVisible - State to toggle the visibility of the filter options.
 * @state {string} selectedValue - State to store the selected genre name for filtering.
 * @state {string} selectedId - State to store the selected genre ID for filtering.
 *
 * @function
 * @name handleClick
 * @description Toggles the visibility of the filter options.
 *
 * @function
 * @name handleChange
 * @description Updates the selected genre name for filtering.
 * @param {Object} e - The event object.
 *
 * @function
 * @name handleIdChange
 * @description Updates the selected genre ID for filtering.
 * @param {Object} e - The event object.
 *
 * @constant
 * @name filteredData
 * @description Filters the genres based on the selected name and ID.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Users = () => {
    const { genres, loading } = useGenres();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Choose Genre");
    const [selectedId,setSelectedId]=useState("Choose ID");
    const handleClick = () => {
        setIsVisible(!isVisible);
    };
    const filteredData =genres.filter(genre=>{
           if (selectedValue !== "Choose Genre" && genre.name !== selectedValue){
                return false;
           }
           if (selectedId!="Choose ID" && genre.id!=selectedId){
            return false;
           }
           return true;  
    })
    const columns=[
        {key:'id',header:"ID",className:"pl-2 py-   bg-[#EEF1F4] "},
        {key:'name',header:"NAME",className:"pl-2  text-left "},
        {key:'description', header:"DESCRIPTION",className:"pl-2 py-   bg-[#EEF1F4]"},
        {
            key:"actions",
            header:"ACTIONS",
            className:" pl-2  text-left  ",
            
        }
    ];
    
       

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        
        
    };
    const handleIdChange=(e)=>{
        setSelectedId(e.target.value);
    }


    return (
        <div className="flex flex-col bg-white border mt-4 ">
            <div className="flex justify-between items-center">
                <div className="flex border items-center justify-center bg-yellow-400 text-slate-50 w-32 p-2 m-4 cursor-pointer hover:bg-yellow-500 hover:text-white ">
                    <AddIcon fontSize="medium" className="" />
                    <a className="">New Genre</a>
                </div>
                <div className="flex items-center justify-center">
                    <div
                        onClick={handleClick}
                        className="border flex items-center justify-center bg-yellow-400 text-white w-10 h-10 cursor-pointer hover:opacity-70"
                    >
                        {!isVisible ? (
                            <FilterAltIcon
                                fontSize="large"
                                className=" m-1 p-1.5"
                            />
                        ) : (
                            <CloseIcon
                                fontSize="large"
                                className=" m-1 p-1.5"
                            />
                        )}
                    </div>
                    <div className="flex rounded shadow items-center justify-center border m-4">
                        <input
                            type="search"
                            className="border-none  focus:ring-0"
                        ></input>
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <div
                className={`overflow-hidden flex m-3 gap-4 transition-max-height duration-300 ease-in-out  ${
                    isVisible ? "max-h-16" : "max-h-0  "
                }`}
            >
                <div className="">
                    <select
                        className=" focus:ring-0 focus:border-zinc-300 border-zinc-300 rounded text-zinc-500  font-Roboto "
                        value={selectedValue}
                        onChange={handleChange}
                    >
                        <option value="Choose Genre">Choose Genre</option>
                        {genres.map((genre) => (
                            <option  key={genre.id} value={genre.name}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className=" ">
                    <select value={selectedId} onChange={handleIdChange} className="focus:ring-0 focus:border-zinc-300 border-zinc-300 rounded text-zinc-500 font-Roboto ">
                        <option value="Choose ID">Choose ID</option>
                        {genres.map(genre=>(
                            <option key={genre.id} value={genre.id}>{genre.id}</option>
                        )

                        )}
                    </select>
                </div>
            </div>
            <ReusableTable columns={columns} data={filteredData} />
            
        </div>
    );
};
export default Users;
