import React,{useState} from "react";
import { RotatingLines } from "react-loader-spinner";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Tooltip } from "react-tooltip";
import CloseIcon from "@mui/icons-material/Close";

const ReusableTable = ({columns, data}) => {


    return(
        <table className="table-auto bg-white max-w-full mx-4 mt-3">

            <thead>
            <tr className="text-left  bg-white font-Roboto text-zinc-500  text-sm shadow-sm">
                    {columns.map(column=>(
                        
                            <th  key={column.key}  >
                                {column.header}
                            </th>
                       
                    ))}
            </tr>
            </thead>
                <tbody>
                    {data.map(item=>(
                       <tr className=" font-Roboto border-b  " key={item.id}>
                        {columns.map(column=>(
                            <td className=" pl-1  py-4 text-zinc-500" key={`${column.key}-${item.id}`} >
                                {column.key==="user"?
                               <div className="flex items-center justify-start gap-2 ">
                                <img src={item.picture} alt='profile picture' className="w-10 h-10 object-cover " />
                                <span className="font-bold">{item.name}</span>
                               </div>:column.key==="actions"?(
                                <div className=" flex  gap-2 py-2">
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
                                 </div>
                                ):
                                item[column.key]}
                            </td>
                        ))}
                       </tr>
                    )
                    )}
                </tbody>
            
        </table>
    )
};

export default ReusableTable;