import React from "react";
import { useState } from "react";
import { useGenres } from "../../contexts/GenreContext";
import { RotatingLines } from 'react-loader-spinner';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';


const Genres=()=>{
    const {genres,loading}=useGenres();


    return(
        <div className="flex flex-col border mt-4 ">
            <div className="flex justify-between items-center">
                <div className="flex border items-center justify-center bg-yellow-400 text-slate-50 w-32 p-2 m-4 cursor-pointer hover:bg-yellow-500 hover:text-white ">
                    <AddIcon fontSize="medium" className="" />
                    <a className="">New Genre</a>
                </div>
                <div className="flex items-center justify-center">
                    <div className="border flex items-center justify-center bg-yellow-400 text-white w-10 h-10 cursor-pointer hover:opacity-70">
                        <FilterAltIcon fontSize="large" className=" m-1 p-1.5" />
                    </div>
                    <div className="flex rounded shadow items-center justify-center border m-4">
                        <input type="search" className="border-none  focus:ring-0" ></input>
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <table className="border  table-auto max-w-full">
                <thead>
                    <tr className="text-left border bg-[#F3F6F9] font-Roboto  text-sm shadow-sm ">
                        <th scope="col" className="pl-2 py-   bg-[#EEF1F4] ">ID</th>
                        <th className=" pl-2  text-left ">Name</th>
                        <th className="pl-2   p-2 text-left  bg-[#EEF1F4]"> Description</th>
                        <th className=" pl-2  text-left  ">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading?
                    
                    <tr  >
                <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            
                />
            </tr>:(
                   genres.map((genre)=>(
                    <tr className="border font-Roboto " key={genre.id}>
                        <td className=" pl-2 py-2  bg-[#FBFBFB]">{genre.id}</td>
                        <td className=" pl-2">{genre.name}</td>
                        <td className=" pl-2 bg-[#FBFBFB] ">{genre.description}</td>
                        <td className="text-center flex   gap-3">
                            <div className="flex  border rounded-md items-center justify-center text-sm bg-white text-amber-500 hover:text-white hover:bg-amber-500  w-20 m-2 ">
                                <EditIcon fontSize="small" className="" />
                                <button className=" mx-1">Edit</button>
                            </div>
                            <div className="flex border rounded-md items-center justify-center text-sm text-red-500 bg-white p-2 hover:text-white hover:bg-red-500  w-20 m-2 ">
                                <DeleteIcon fontSize="small" />
                                <button className="mx-1">delete</button>
                            </div>
                        </td>
                    </tr>
               
                    
                        ))
                        
                    )} 

                </tbody>
            </table>
        </div>
    )
}
export default Genres;