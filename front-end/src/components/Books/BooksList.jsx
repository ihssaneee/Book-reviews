import React from "react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Tooltip } from "react-tooltip";
import CloseIcon from "@mui/icons-material/Close";
import ReusableTable from "../../shared/ReusableTable";
import { useBooks } from "../../contexts/BookContext";
import { Link ,useNavigate} from "react-router-dom";

const Books = () => {
    // Custom hook to fetch books and loading state
    const { books, loading , deleteBook} = useBooks();
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

    // Filter books based on selected value and ID
    const filteredData = books.filter((book) => {
        const query = searchedValue.toLowerCase();

        // Check if any value in the user object matches the search query
        const matchesSearch = Object.values(book).some(
            (value) =>
                value != null && value.toString().toLowerCase().includes(query)
        );

        // Filter out users that don't match the search query if a search value exists
        if (searchedValue.length !== 0 && !matchesSearch) {
            return false;
        }

        // Filter out users that don't match the selected ID if one is specified
        if (selectedId !== "Choose ID" && book.id !== Number(selectedId)) {
            return false;
        }

        // Include the user if none of the conditions exclude them
        return true;
    });

    // Table columns configuration
    const columns = [
        { key: "id", header: "ID" },
        { key: "author", header: "Author" },
        { key: "title", header: "TITLE" },
        { key: "image", header: "IMAGE",associatedObject:'book' },
        { header: "Description", key: "description" },
        
        { key: "link", header: "LINK" },
        { key: "genre_id", header: "GENRE" },
        { key: "language", header: "LANGUAGE" },
        { key: "year", header: "YEAR" },

        {
            key: "actions",
            header: "ACTIONS",
            className: "pl-2 text-left",
        },
    ];

    // Handle change in selected book value
    const handleChange = (e) => {
        setSearchedValue(e.target.value);
    };

    // Handle change in selected book ID
    const handleIdChange = (e) => {
        setSelectedId(e.target.value);
    };
    const handleEdit= (id)=>{
        navigate(`edit/${id}`);
    }

    return (
        <div className="flex flex-col  w-full bg-white border dark:border-none dark:bg-[#22242B] font-public-sans">
            {/* Header section with Add button and filter toggle */}
            <div className="flex justify-between items-center">
                <div className="flex rounded-sm items-center justify-center bg-yellow-400 text-slate-50 w-32 p-2 m-4 cursor-pointer hover:bg-yellow-500 hover:text-white">
                    <AddIcon fontSize="medium" className="" />
                    <Link to="add" className="">
                        New Book
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <div
                        onClick={handleClick}
                        className="rounded-sm flex items-center justify-center bg-yellow-400 text-white w-10 h-10 cursor-pointer hover:opacity-70"
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
                         
                    <div className="flex mx-4 px-1 h-auto  shadow items-center dark:bg-[#1A1C23]   border dark:border-none rounded-md ">
                        <input
                            type="search"
                            className="border-none focus:ring-0 dark:bg-[#1A1C23] dark:text-neutral-400"
                        ></input>
                        <div className="py-2">
                        <SearchIcon className="dark:bg-[#1A1C23] dark:text-neutral-400 " fontSize="medium"/>
                        </div>
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
                        placeholder="Search Book"
                        className="focus:ring-0 focus:outline-none dark:bg-[#1A1C23] dark:border-none dark:text-neutral-400"
                    />
                </div>
                <div className="">
                    <select
                        value={selectedId}
                        onChange={handleIdChange}
                       className="focus:ring-0 focus:outline-none dark:bg-[#1A1C23] dark:border-none dark:text-neutral-400"
                    >
                        <option value="Choose ID"  >Choose ID</option>
                        {books.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.id}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Table displaying filtered genres */}
            <ReusableTable columns={columns} data={filteredData} onDelete={deleteBook} onEdit={handleEdit} />
        </div>
    );
};
export default Books;
