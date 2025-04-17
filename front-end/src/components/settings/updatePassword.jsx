import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { axiosInstance } from "../../api/axiosConfig";
import { Tooltip } from "react-tooltip";
export default function UpdatePassword() {
    const inputStyle =
        "rounded-lg p-2 border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-600 inputStyle w-full";
    const divStyle = "flex flex-col   w-full gap-1 flex-shrink w-full ";
    const { user,updatePassword } = useAuth();
   
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(null);
    const timeoutId = useRef(null);
    const [passwordVisibility, setPasswordVisibility] = useState({
        currentPassword: "password",
        newPassword: "password",
        confirmPassword: "password",
    });
    const handlePasswordVisibilityClick = (field) => {
        setPasswordVisibility({
            ...passwordVisibility,
            [field]:
                passwordVisibility[field] === "password" ? "text" : "password",
        });
    };

    const [password_confirmation, setPasswordConfirmation] = useState("");
    const handlePasswordConfirmationChange=(e)=>{
        const value=e.target.value;
        setPasswordConfirmation(value);
    }

    const handleCurrentPasswordChange = async (e) => {
        const value = e.target.value;
        setCurrentPassword(value);

        if (timeoutId.current) {
            clearTimeout(timeoutId);
        }
        if (currentPassword.length >= 4) {
            timeoutId.current = setTimeout(async () => {
                try {
                    const response = await axiosInstance.post(
                        "/validate-password",
                        {
                            password: value,
                        }
                    );
                    setIsPasswordValid(response.data.isValid);
                    console.log("validation of password was successful");
                } catch (error) {
                    console.error("validation of password failed ", error);
                    setIsPasswordValid(false);
                }
                timeoutId.current = null;
            }, 500);
        } else {
            setIsPasswordValid(null);
        }
    };
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };
    const validatePassword=()=>{
        if (password_confirmation!==newPassword){
            setError("password don't match");
            return false;
        }
        if (newPassword.length<4){
            setError('password must be at least 4 characters');
            return false;
        }
        return true;
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (!validatePassword()){
            return;
        }
        try{
            await updatePassword({
                password:newPassword,
                password_confirmation:password_confirmation,
            });
            setCurrentPassword("");
            setNewPassword("");
            setPasswordConfirmation("");
            setIsPasswordValid(null);
            setSuccess('password updated successfully');
            setError(null);
            console.log('password updated successfully')
        }
        catch(error){
            const errorMessage=error.response?.data?.message || "an unexpected error happened";
            setError(errorMessage);
            console.error('password could not be updated',error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4  font-public-sans mx-9 lg:text-base text-sm py-8">
            <div className={divStyle}>
                <label htmlFor="current-password" className="labelStyle">
                    Current Password
                </label>
                <div className="flex border rounded-md justify-between items-center focus:ring-yellow-400 focus:outline-yellow-600 inputStyle w-full">
                    <input
                        type={passwordVisibility.currentPassword}
                        autoComplete="new-password"
                        name="pwd"
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                        className="border-none w-full focus:ring-0 inputStyle dark:text-neutral-400"
                    />
                    {passwordVisibility.currentPassword==="password"?
                    <VisibilityIcon
                        fontSize="medium"
                        className="m-2 text-neutral-700 cursor-pointer dark:text-neutral-400 hover:text-neutral-800"
                        onClick={() =>
                            handlePasswordVisibilityClick("currentPassword")
                        }
                        data-tooltip-content="Show Password"
                        data-tooltip-id="myTooltip"
                        
                    />:<VisibilityOffIcon
                    fontSize="medium"
                    className="m-2 text-neutral-700 cursor-pointer dark:text-neutral-400 hover:text-neutral-800"
                    onClick={() =>
                        handlePasswordVisibilityClick("currentPassword")
                    }
                    data-tooltip-content="Show Password"
                    data-tooltip-id="myTooltip"
                    
                />}
                    <Tooltip id="myTooltip" />
                </div>
                {isPasswordValid === true ? (
                    <span className="m-2 text-green-700">
                        password is correct
                    </span>
                ) : isPasswordValid === false && currentPassword.length >= 4 ? (
                    <span className="m-2 text-red-600">
                        password is incorrect
                    </span>
                ) : (
                    ""
                )}
            </div>
            <div className={divStyle}>
                <label htmlFor="current-password" className="labelStyle">
                    New Password
                </label>
                <div className="flex border rounded-md justify-between items-center focus:ring-yellow-400 focus:outline-yellow-600 inputStyle w-full">
                    <input
                        type={passwordVisibility.newPassword}
                        autoComplete="new-password"
                        name="pwd"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        className="border-none w-full focus:ring-0 inputStyle dark:text-neutral-400"
                    />
                    <VisibilityIcon
                        fontSize="medium"
                        className="m-2 text-neutral-700 cursor-pointer dark:text-neutral-400 hover:text-neutral-800"
                        onClick={() =>
                            handlePasswordVisibilityClick("newPassword")
                        }
                         data-tooltip-content="Show Password"
                        data-tooltip-id="myTooltip"
                    />
                    <Tooltip id="myTooltip" />
                </div>
            </div>
            <div className={divStyle}>
                <label htmlFor="Confirm new password" className="labelStyle">
                    Confirm New Password
                </label>
                <div className={`${password_confirmation !== newPassword && password_confirmation.length>=4?"border-red-500 border-2":password_confirmation===newPassword&&password_confirmation.length>=4?"border-green-500 border-2":""} flex border rounded-md justify-between items-center focus:ring-yellow-400 focus:outline-yellow-600 inputStyle w-full`}>
                    <input
                        type={passwordVisibility.confirmPassword}
                        autoComplete="new-password"
                        name="pwd"
                        value={password_confirmation}
                        onChange={handlePasswordConfirmationChange}
                        className="border-none w-full focus:ring-0 inputStyle"
                    />
                    <VisibilityIcon
                        fontSize="medium"
                        className="m-2 text-neutral-700 cursor-pointer dark:text-neutral-400 hover:text-neutral-800"
                        onClick={() =>
                            handlePasswordVisibilityClick("confirmPassword")
                        }
                        onChange={handlePasswordConfirmationChange}
                         data-tooltip-content="Show Password"
                        data-tooltip-id="myTooltip"
                    />
                    <Tooltip id="myTooltip" />
                </div>
                {password_confirmation !== newPassword &&
                password_confirmation.length >= 4 ? (
                    <span className="m-2 text-red-700">
                        passwords don't match
                    </span>
                ) : (
                    password_confirmation.length >= 4 && (
                        <span className="m-2 text-green-700">
                            passwords match
                        </span>
                    )
                )}
            </div>
            {error?<span className="text-red-600 m-3">{error}</span>:success?<span className="text-green-600 m-3">{success}</span>:null}
            <div className="flex items-center justify-center my-6" >
            <button className="bg-yellow-400 w-11 h-11 p-4 px-10 rounded-lg text-base flex items-center justify-center hover:bg-yellow-300" >Done</button>
            </div>
        </form>
    );
}
