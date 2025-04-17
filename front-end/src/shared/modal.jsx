import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
export default function Modal({ setIsOpen,onDelete }) {
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(null);
    const navigate=useNavigate();
    const handleClick=async()=>{
        try{
            await onDelete();
            console.log('account deleted successfully');
            setError(null)
            setSuccess('your account has been deleted successfully.');
            setTimeout(()=>{
                navigate('/login');

            },2000)
        }
        catch(error){
            console.error('could not delete account');
            const errorMessage=error.response?.data?.message || "an unexpected error happened";
            setError(errorMessage);
            setSuccess(null);
        }
    }
    return createPortal(
        <div className="fixed inset-0 z-[10] font-public-sans ">
            <div className="absolute inset-0 bg-black opacity-25 "></div>
            <div className="relative bg-white  w-72 h-auto m-auto z-[6]  p-4 rounded-lg shadow-lg flex flex-col top-32 left-32">
                <div className="pt-4 ">
                <p className="">
                    Are you sure you want to delete your account ?
                </p>
                </div>
                {error && (
                    <div className="text-red-600 text-center mt-2">
                        {error}
                    </div>
                )}
              {success&&
                    <div className="flex  text-green-600 text-center mt-2">
                       <CheckCircleOutlinedIcon fontSize="medium" /> {success}
                    </div>
}
                <div className=" flex justify-center items-center m-3 gap-3">
                    <button className="p-2 px-3  rounded-md bg-red-600 text-neutral-100 hover:bg-red-500" onClick={handleClick}>Delete</button>
                    <button className="p-2 px-3 rounded-md  " onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>
                </div>
            </div>
            
        </div>, document.body
    );
}
