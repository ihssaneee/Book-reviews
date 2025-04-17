import React,{useState,useEffect,useRef} from 'react';
import { useUsers } from '../../contexts/UserContext';
import { axiosInstance } from '../../api/axiosConfig';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Tooltip } from 'react-tooltip';
import Modal from '../../shared/modal';
import { useAuth } from '../../contexts/AuthContext';
export default function DeleteAccount(){
    const {deleteAuthenticatedUser}=useAuth();
     const [currentPassword, setCurrentPassword] = useState("");
     const timeoutId = useRef(null);
     const [passwordVisibility,setPasswordVisibility]=useState('password');
     const [isPasswordValid,setIsPasswordValid]=useState(null);
     const [isPasswordConfirmed,setIsPasswordConfirmed]=useState(false);
     const [isOpen,setIsOpen]=useState(false);
     const togglePasswordVisibility=()=>{
        
        setPasswordVisibility(passwordVisibility==="password"?"text":"password");
     }
     const handleChange=(e)=>{
        setCurrentPassword(e.target.value);
     };
     
    
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
    return(
        <div className="flex flex-col gap-4 bg-white dark:bg-[#22242B] w-full lg:max-w-xl mx-auto font-public-sans dark:text-neutral-400 p-5" >
            <div className=' '> 
                <h2 className='labelStyle font-bold  text-2xl m-3'>Deleting Account</h2>
            </div>
            <div className=''>
                <p className=''>
                    Deleting your account will remove all of your information from our database, this cannot be undone.
                </p>
            </div>
            <div>
                <div className='mx-4 m-3 labelStyle'>
            <label htmlFor='current password' className='text-base   '>Current password</label>
            </div>
            <div className="flex border rounded-md justify-between items-center focus:ring-yellow-400  focus:outline-yellow-600 inputStyle mx-4 text-left ">
                
                                <input
                                    type={passwordVisibility}
                                    autoComplete="new-password"
                                    name="pwd"
                                    value={currentPassword}
                                    onChange={handleCurrentPasswordChange}
                                    className="border-none w-full  focus:ring-0 inputStyle dark:text-neutral-400 "
                                />
                                {passwordVisibility==="password"?
                                <VisibilityIcon
                                    fontSize="medium"
                                    className="m-2 text-neutral-700 cursor-pointer dark:text-neutral-400 hover:text-neutral-800"
                                    onClick={
                                        togglePasswordVisibility
                                    }
                                    data-tooltip-content="Show Password"
                                    data-tooltip-id="myTooltip"
                                    
                                />:<VisibilityOffIcon
                                fontSize="medium"
                                className="m-2 text-neutral-700 cursor-pointer dark:text-neutral-400 hover:text-neutral-800"
                                onClick={
                                    togglePasswordVisibility
                                }
                                data-tooltip-content="Show Password"
                                data-tooltip-id="myTooltip"
                                
                            />}
                                <Tooltip id="myTooltip" />
                            </div>
                            <div className='m-4'>
                            {isPasswordValid === true ? (
                                <span className="  text-green-600">
                                    password is correct
                                </span>
                            ) : isPasswordValid === false && currentPassword.length >= 4 ? (
                                <span className=" text-red-600">
                                    password is incorrect
                                </span>
                            ) : (
                                ""
                            )}
                            </div>
                        </div>

                        <div className='flex justify-center items-center gap-3 '>
                        {isOpen ? (
                            isPasswordValid ? (
                                <Modal setIsOpen={setIsOpen} onDelete={deleteAuthenticatedUser} />
                            ) : (
                                <div className="text-red-600">Please confirm your password</div>
                            )
                        ) : null}
                            <button className='p-3 bg-red-600 rounded-md text-neutral-100 hover:bg-red-500 ' onClick={()=>setIsOpen(true)}>
                                Delete Account
                            </button>
                       
                        </div>
                     
                        
        </div>
    )
}