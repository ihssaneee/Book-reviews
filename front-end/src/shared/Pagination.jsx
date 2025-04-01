import React from "react";
import { useState } from "react";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

export default function Pagination({ currentPage, totalPages, onPageChange,pageSize,dataLength }) {
    const val = 1;

    return (
        <div className="flex items-center  justify-between mx-8 my-4 text-sm font-Inter">
            <div className="text-gray-500">
                Showing {currentPage} to {pageSize} of {dataLength} entries
            </div>
            <div className="flex gap-2">
                {/*previous button */}
                <button
                    className="border py-2 px-3 rounded-md bg-neutral-200 disabled:text-gray-500 dark:bg-[#1A1C23] dark:border-[#1A1C23]"
                    onClick={() =>
                        onPageChange((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                >
                    <ArrowBackIosNewOutlinedIcon sx={{
                        width:"12px",
                        height:"12px",

                    }} />
                </button>
                {Array.from({ length: totalPages },(_, index) => index + 1).map((pageNumber) => (
                    <button
                        onClick={() => onPageChange(pageNumber)}
                        className={` ${pageNumber===currentPage && "bg-yellow-600  text-white"}  border flex items-center justify-center w-[38px] py-2 px-4 rounded-full bg-neutral-200`}
                    >
                        {pageNumber}
                    </button>
                ))}
                {/*next buttons */}
                <button
                    className="border py-2 w-9 px-3 rounded-md bg-neutral-200 disabled:text-gray-500 dark:bg-[#1A1C23] dark:border-[#1A1C23] "
                    onClick={() =>
                        onPageChange((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                    <ArrowForwardIosOutlinedIcon sx={{
                        width:"12px",
                        height:"12px",

                    }} />
                </button>
            </div>
           
        </div>
    );
}
