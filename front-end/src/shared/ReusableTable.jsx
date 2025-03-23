import React from "react";
import { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Tooltip } from "react-tooltip";
import Pagination from "./Pagination";
import { useScrollTrigger } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import RenderStars from "./rating";

// Extract action buttons to a separate component
const ActionButtons = ({ itemId, onShow, onEdit, onDelete }) => (
  <div className="flex gap-2 py-2">
    <div className="text-blue-900">
      <VisibilityOutlinedIcon
        data-tooltip-content="View"
        data-tooltip-id="myTooltip"
        fontSize="small"
        aria-hidden="false"
        onClick={() => onShow(itemId)}
      />
    </div>
    <div className="text-sm text-gray-500 bg-white cursor-pointer">
      <ModeEditOutlinedIcon
        data-tooltip-content="Edit"
        data-tooltip-id="myTooltip"
        fontSize="small"
        aria-hidden="false"
        onClick={() => onEdit(itemId)}
      />
    </div>
    <div className="text-red-500 cursor-pointer">
      <DeleteOutlineOutlinedIcon
        data-tooltip-content="delete"
        data-tooltip-id="myTooltip"
        fontSize="small"
        aria-hidden="false"
        onClick={() => onDelete(itemId)}
      />
    </div>
  </div>
);

// Extract cell rendering logic to a function
const renderCellContent = (column, item, onShow, onEdit, onDelete) => {
  if (column.key === "user") {
    return (
      <div className="flex items-center justify-start gap-3 flex-wrap">
        <img src={item.picture} alt="profile picture" className="object-cover w-11 h-11 rounded-full" />
        <span className="font-bold">{item.name}</span>
      </div>
    );
  } else if (column.key === "actions") {
    return <ActionButtons itemId={item.id} onShow={onShow} onEdit={onEdit} onDelete={onDelete} />;
  } 
  else if(column.key==="rating"){
    return <div className="flex items-center justify-cente gap-0.5 rounded-md border w-14 p-1 bg-slate-100">
      <StarIcon fontSize="small" className="text-yellow-400" /><span className="font-semibold text-black">{item.rating}</span>
    </div>
  }
  else if(column.key==="user_name"){
    return <div className="">
          {item.user?.name}
    </div>
  }
  else if(column.key==="book_name"){
    return <div className="">
          {item.book?.title}
    </div>
  }
  else {
    return item[column.key];
  }
};

const ReusableTable = ({ columns, data, onDelete, onEdit, onShow ,pageSize=10}) => {
  const hasData = Array.isArray(data) && data.length > 0;
  // state for current page
  const [currentPage, setCurrentPage] = useState(1);
  // calculate total data
  const totalPages = hasData ? Math.ceil(data.length / pageSize) : 0;
  // calculate paginated data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = hasData ? data.slice(startIndex, endIndex) : [];


  return (
    <>
    <table className="w-full overflow-x-auto table mx-4 mt-3 bg-white table-fixed">
      <thead>
        <tr className="text-sm text-left bg-white shadow-sm font-Roboto text-zinc-500 ">
          {columns.map(column => (
            <th
              key={column.key}
              className={
                column.key === "actions"
                  ? "max-w-none overflow-visible text-clip whitespace-normal"
                  : "max-w-14 table-cell overflow-hidden text-ellipsis whitespace-nowrap"
              }
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {hasData ? (
          paginatedData.map(item => (
            <tr className="border-b font-Roboto text-sm" key={item.id}>
              {columns.map(column => (
                <td
                  className={column.key=== "actions"?"py-2 text-zinc-500 max-w-none table-cell overflow-visible text-clip whitespace-normal":"py-3 text-zinc-500 max-w-14 table-cell overflow-hidden text-ellipsis whitespace-nowrap"}
                  key={`${column.key}-${item.id}`}
                >
                  {renderCellContent(column, item, onShow, onEdit, onDelete)}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10">
              <div className="flex flex-col items-center justify-center p-3">
                <img src="/images/noData.png" alt="No Data found" className="w-60 h-60" />
                <span className="font-Roboto">No Data Found</span>
              </div>
            </td>
          </tr>
        )}
      </tbody>
      <Tooltip id="myTooltip" />
    </table>
    {/*pagination controls*/}
    {hasData&&<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} pageSize={pageSize} dataLength={data.length}/>}
    </>
  );
};

export default ReusableTable;