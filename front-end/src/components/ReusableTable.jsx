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
        <table className="max-w-full mx-4 mt-3 overflow-auto bg-white table-auto">

            <thead>
            <tr className="text-sm text-left bg-white shadow-sm font-Roboto text-zinc-500">
                    {columns.map(column=>(
                        
                            <th  key={column.key}  >
                                {column.header}
                            </th>
                       
                    ))}
            </tr>
            </thead>
                <tbody>
                    {data.length>0? data.map(item => (
                       <tr className="border-b font-Roboto" key={item.id}>
                        {columns.map(column=>(
                            <td className="py-4 pl-1 text-zinc-500" key={`${column.key}-${item.id}`} >
                                {column.key === "user" ?
                               <div className="flex items-center justify-start gap-3 ">
                                <img src={item.picture} alt='profile picture' className="object-cover w-11 h-11 " />
                                <span className="font-bold">{item.name}</span>
                               </div>:column.key === "actions"?(
                                <div className="flex gap-2 py-2 ">
                                     <div className="text-blue-900">
                                     <VisibilityOutlinedIcon
                                         data-tooltip-content="View"
                                         data-tooltip-id="myTooltip"
                                         fontSize="small"
                                     />
                                     <Tooltip id="myTooltip" />
                                 </div>
                                 <div className="text-sm text-gray-500 bg-white cursor-pointer ">
                                     <ModeEditOutlinedIcon
                                         data-tooltip-content="Edit"
                                         data-tooltip-id="myTooltip"
                                         fontSize="small"
                                         className=""
                                     />
                                     <Tooltip id="myTooltip" />
                                 </div>
                                 <div className="text-red-500 cursor-pointer hover:">
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
                    ):<tr>
                    <td colSpan='10' >
                        <div className="flex flex-col items-center justify-center p-3">
                            <img src='/images/noData.png' alt='No Data found' className="w-60 h-60"/>
                            <span className="font-Roboto">No Data Found</span>
                        </div>
                    </td>
                </tr>}
                </tbody>
            
        </table>
    )
};

export default ReusableTable;