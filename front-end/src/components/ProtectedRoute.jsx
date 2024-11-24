import React from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { RotatingLines } from 'react-loader-spinner'

const ProtectedRoute=({children})=>{
    const {user,loading}=useAuth();

    if (loading){
        return (
            <div className="flex items-center justify-center min-h-screen" >
                <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            
                />
            </div>
        );
    }
    if (!user){
        return <Navigate to='/login' replace />
    }
    return children;

}
export default ProtectedRoute;