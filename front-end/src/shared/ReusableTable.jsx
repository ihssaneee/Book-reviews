import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Tooltip } from "react-tooltip";
import Pagination from "./Pagination";
import StarIcon from "@mui/icons-material/Star";
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
        <div className="text-sm text-gray-500  cursor-pointer">
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
                <img
                    src={item.picture}
                    alt="profile picture"
                    className="object-cover w-11 h-11 rounded-full"
                />
                <span className="font-bold">{item.name}</span>
            </div>
        );
    } else if (column.key === "actions") {
        return (
            <ActionButtons
                itemId={item.id}
                onShow={onShow}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );
    } else if (column.key === "rating") {
        return (
            <div className="flex items-center justify-cente gap-0.5 rounded-md border  w-14 p-1 bg-slate-100">
                <StarIcon fontSize="small" className="text-yellow-400" />
                <span className="font-semibold text-black">{item.rating}</span>
            </div>
        );
    } else if (column.key === "user_name") {
        return <div>{item.user?.name}</div>;
    } else if (column.key === "book_name") {
        return <div>{item.book?.title}</div>;
    } else if (column.key === "description") {
        return (
            <div className="max-w-64 overflow-hidden text-ellipsis">
                {item.description}
            </div>
        );

    } else if(column.key==='image' && column.associatedObject==="book"){
      return (
        <div className="" >
          <img src={item.image} className="w-10 h-11 rounded-sm object-cover" />
        </div>
      )
    }
    else if(column.key==='link'){
      return (
        <div className="underline text-sky-900 max-w-32 overflow-clip text-ellipsis" >
          <a href={item.link}  >{item.link}</a>
        </div>
      )
    }
     else {
        return item[column.key];
    }
};

const ReusableTable = ({
    columns,
    data,
    onDelete,
    onEdit,
    onShow,
    pageSize = 10,
}) => {
    const hasData = Array.isArray(data) && data.length > 0;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = hasData ? Math.ceil(data.length / pageSize) : 0;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = hasData ? data.slice(startIndex, endIndex) : [];

    return (
        <div className="overflow-x-auto table-scrollbar  dark:bg-[#22242B] dark:text-white dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 ">
          <table className="min-w-full  mt-3  bg-white table-auto font-public-sans  dark:bg-[#22242B] dark:text-white">
                <thead>
                    <tr className="text-sm text-left dark:bg-[#22242B] bg-white shadow-sm text-zinc-500 border dark:border-gray-600 py-3   dark:text-white">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={
                                    column.key === "actions"
                                        ? "font-medium"
                                        : "font-medium py-3 px-3"
                                }
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hasData ? (
                        paginatedData.map((item) => (
                            <tr className="border-b dark:border-b-gray-600 text-sm" key={item.id}>
                                {columns.map((column) => (
                                    <td
                                        className={
                                            column.key === "actions"
                                                ? "py-2 text-zinc-500 px-3"
                                                : "py-3 text-zinc-500 whitespace-nowrap px-3"
                                        }
                                        key={`${column.key}-${item.id}`}
                                    >
                                        {renderCellContent(
                                            column,
                                            item,
                                            onShow,
                                            onEdit,
                                            onDelete
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">
                                <div className="flex flex-col items-center justify-center py-8">
                                    <img
                                        src="/images/noData.png"
                                        alt="No Data found"
                                        className="w-60 h-60"
                                    />
                                    <span>No Data Found</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
                <Tooltip id="myTooltip" />
            </table>
            {hasData && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    pageSize={pageSize}
                    dataLength={data.length}
                />
            )}
        </div>
    );
};

export default ReusableTable;
