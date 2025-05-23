import React, { useContext, createContext, useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosConfig";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated,setIsAuthenitcated]=useState(false);
    const [loginLoading,setLoginLoading]=useState(false);

    // Fetch the current user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/user");

                setUser(response.data.user); // Now correctly accessing 'user'
                setIsAuthenitcated(true);
               
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Login function
    const login = async (credentials) => {
        setLoginLoading(true);
        try {
            const response = await axiosInstance.post('/login', credentials);
            setUser(response.data.user);
            setIsAuthenitcated(true);
            console.log("User state updated:", response.data.user);
           
            
            return response.data.user;
        } catch (error) {
            console.error('Login failed:', error);
            
            throw error;
        }
        finally{
            setLoginLoading(false);
        }
        
    };

    // Logout function
    const logout = async () => {
        try {
            await axiosInstance.post('/logout');
            setUser(null);
            setIsAuthenitcated(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    // update user 
    const updateUser=(updatedUser)=>{
        setUser(updatedUser);
    }
    //update user status 
    const updateStatus=async(updatedStatus)=>{
        try{
            const response= await axiosInstance.put('/user/status',updatedStatus);
            setUser((prevUser)=>({...prevUser,updatedStatus }))
            console.log('staus updated successfully.');
           
        }
        catch(error){
            console.error('status could not be updated.',error);
        }

    }
    //update user password
    const updatePassword=async(updatedPassword)=>{
        try{
            await axiosInstance.put('/update-password',updatedPassword);
            console.log('password updated successfully');
        }
        catch(error){
            console.error('password could not be updated',error);
            throw error;
        }
    };
    const deleteAuthenticatedUser=async()=>{
        try{
            await axiosInstance.delete('/user/delete');
            console.log('account deleted successfully');
        }
        catch(error){
            console.error('account could not be deleted',error);
            throw error;
        }
    }

    const value = {
        user,
        loading,
        login,
        logout,
        loginLoading,
        updateUser,
        updateStatus,
        isAuthenticated,
        updatePassword,
        deleteAuthenticatedUser
    };



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;