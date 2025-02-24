import React from "react";
import { useState } from "react";
import { useGenres } from "../../contexts/GenreContext";
import { Oval } from "react-loader-spinner";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Tooltip } from "react-tooltip";
import CloseIcon from "@mui/icons-material/Close";
import ReusableTable from "../ReusableTable";
import { useUsers } from "../../contexts/UserContext";
import { Link,useNavigate } from "react-router-dom";

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
/**
 * Users component renders a list of genres with filtering options.
 *
 * @component
 * @example
 * return (
 *   <Users />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @section State
 * @description Manages the component's state including visibility of filters, selected genre, and selected ID.
 *
 * @section Handlers
 * @description Contains event handlers for toggling filter visibility, changing selected genre, and changing selected ID.
 *
 * @section Filtering
 * @description Filters the genres based on selected genre name and ID.
 *
 * @section Columns
 * @description Defines the columns for the reusable table displaying the genres.
 *
 * @section Render
 * @description Renders the component including the filter options, search input, and the table of genres.
 */
/**
 * Users component that displays a list of genres with filtering options.
 *
 * @component
 * @example
 * return (
 *   <Users />
 * )
 */
const Users = () => {
    // Custom hook to fetch genres and loading state
    const { users, loading, deleteUser, editUser } = useUsers();
    const navigate=useNavigate();

    // State to manage visibility of the filter section
    const [isVisible, setIsVisible] = useState(false);

    // State to manage selected genre value
    const [searchedValue, setSearchedValue] = useState("");

    // State to manage selected genre ID
    const [selectedId, setSelectedId] = useState("Choose ID");

    // Toggle visibility of the filter section
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    // Filter genres based on selected value and ID
    const filteredData = users.filter((user) => {
        const query = searchedValue.toLowerCase();

        // Check if any value in the user object matches the search query
        const matchesSearch = Object.values(user).some(
            (value) =>
                value != null && value.toString().toLowerCase().includes(query)
        );

        // Filter out users that don't match the search query if a search value exists
        if (searchedValue.length !== 0 && !matchesSearch) {
            return false;
        }

        // Filter out users that don't match the selected ID if one is specified
        if (selectedId !== "Choose ID" && user.id !== Number(selectedId)) {
            return false;
        }

        // Include the user if none of the conditions exclude them
        return true;
    });

    // Table columns configuration
    const columns = [
        { key: "id", header: "ID", className: "pl-2 py- bg-[#EEF1F4]" },
        { key: "user", header: "USER", className: "pr- text-left" },
        { key: "email", header: "EMAIL", className: "pl-2 py- bg-[#EEF1F4]" },
        { key: "role", header: "ROLE" },

        {
            key: "actions",
            header: "ACTIONS",
            className: "pl-2 text-left",
        },
    ];

    // Handle change in selected genre value
    const handleChange = (e) => {
        setSearchedValue(e.target.value);
    };

    // Handle change in selected genre ID
    const handleIdChange = (e) => {
        setSelectedId(e.target.value);
    };
    const handleEdit= (id)=>{
        navigate(`edit/${id}`)
    }

    return (
        <div className="flex overflow-auto flex-col bg-white border mt-4">
            {/* Header section with Add button and filter toggle */}
            <div className="flex justify-between items-center">
                <div className="flex border items-center justify-center bg-yellow-400 text-slate-50 w-32 p-2 m-4 cursor-pointer hover:bg-yellow-500 hover:text-white">
                    <AddIcon fontSize="medium" className="" />
                    <Link to="add" className="">
                        New User
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <div
                        onClick={handleClick}
                        className="border flex items-center justify-center bg-yellow-400 text-white w-10 h-10 cursor-pointer hover:opacity-70"
                    >
                        {!isVisible ? (
                            <FilterAltIcon
                                fontSize="large"
                                className="m-1 p-1.5"
                            />
                        ) : (
                            <CloseIcon fontSize="large" className="m-1 p-1.5" />
                        )}
                    </div>
                    <div className="flex rounded shadow items-center justify-center border m-4">
                        <input
                            type="search"
                            className="border-none focus:ring-0"
                        ></input>
                        <SearchIcon />
                    </div>
                </div>
            </div>
            {/* Filter section */}
            <div
                className={`overflow-hidden flex m-3 gap-4 transition-max-height duration-300 ease-in-out ${
                    isVisible ? "max-h-16" : "max-h-0"
                }`}
            >
                <div className="">
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Search User"
                    />
                </div>
                <div className="">
                    <select
                        value={selectedId}
                        onChange={handleIdChange}
                        className="focus:ring-0 focus:border-zinc-300 border-zinc-300 rounded text-zinc-500 font-Roboto"
                    >
                        <option value="Choose ID">Choose ID</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.id}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Oval
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                        color="#FBDB5B"
                        secondaryColor="#FBDB5B"
                    />
                </div>
            ) : (
                <ReusableTable columns={columns} data={filteredData} onDelete={deleteUser} onEdit={handleEdit} />
            )}
        </div>
    );
};
export default Users;
