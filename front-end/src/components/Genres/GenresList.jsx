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
const Genres = () => {
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

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        
        
    };
    const handleIdChange=(e)=>{
        setSelectedId(e.target.value);
    }


    return (
        <div className="flex flex-col border mt-4 ">
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
                        className="focus:outline-none focus:ring-0 focus:border-gray-500 font-Roboto "
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
                    <select value={selectedId} onChange={handleIdChange} className="focus:border-gray-700 focus:ring-0 font-Roboto ">
                        <option value="Choose ID">Choose ID</option>
                        {genres.map(genre=>(
                            <option key={genre.id} value={genre.id}>{genre.id}</option>
                        )

                        )}
                    </select>
                </div>
            </div>
            <table className="border  table-auto max-w-full">
                <thead>
                    <tr className="text-left border bg-[#F3F6F9] font-Roboto  text-sm shadow-sm">
                        <th scope="col" className="pl-2 py-   bg-[#EEF1F4] ">
                            ID
                        </th>
                        <th className=" pl-2  text-left ">Name</th>
                        <th className="pl-2   p-2 text-left  bg-[#EEF1F4]">
                            
                            Description
                        </th>
                        <th className=" pl-2  text-left  ">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <RotatingLines
                                visible={true}
                                height="96"
                                width="96"
                                color="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                            />
                        </tr>
                    ) : (
                        filteredData.map((genre) => (
                            <tr className="border font-Roboto  " key={genre.id}>
                                <td className=" pl-2  py-4 bg-[#FBFBFB]">
                                    {genre.id}
                                </td>
                                <td className=" pl-2 py-4">{genre.name}</td>
                                <td className=" pl-2 py-4 bg-[#FBFBFB] ">
                                    {genre.description}
                                </td>
                                <td className=" flex items-center justify-center py-4 gap-2  ">
                                    <div className="text-blue-900">
                                        <VisibilityOutlinedIcon
                                            data-tooltip-content="View"
                                            data-tooltip-id="myTooltip"
                                            fontSize="small"
                                        />
                                        <Tooltip id="myTooltip" />
                                    </div>
                                    <div className=" text-sm  bg-white text-gray-500 cursor-pointer ">
                                        <ModeEditOutlinedIcon
                                            data-tooltip-content="Edit"
                                            data-tooltip-id="myTooltip"
                                            fontSize="small"
                                            className=""
                                        />
                                        <Tooltip id="myTooltip" />
                                    </div>
                                    <div className="  text-red-500 cursor-pointer   hover: hover:  ">
                                        <DeleteOutlineOutlinedIcon
                                            data-tooltip-content="delete"
                                            data-tooltip-id="myTooltip"
                                            fontSize="small"
                                        />
                                        <Tooltip id="myTooltip" />
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default Genres;
