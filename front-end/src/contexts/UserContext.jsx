import React,{useState,useEffect} from "react";
import { useContext,createContext } from "react";
import { axiosInstance } from "../api/axiosConfig";
import { useAuth } from "./AuthContext";


const UsersContext=createContext();

export const useUsers=() =>{
    return useContext(UsersContext);
}
export const UsersProvider=({children})=>{
    const {isAuthenticated}=useAuth();
    const [users,setUsers]=useState([]);
    const[loading,setLoading]=useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/users');
            setUsers(response.data.users);
            console.log('data fetched successfuly',users)
        } catch (error) {
            console.error("error couldn't fetch users!", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated){
        fetchUsers();
        }
        
    }, [isAuthenticated]);
    const addUser=async(newUser) =>{
        try{
            const response=await axiosInstance.post('/users',newUser);
            setUsers((prevUsers)=>[...prevUsers,response.data.user]);
            console.log('user added successfuly');
        }
        catch(error){
            console.error('could not add user',error);
            throw error;
        }
    }
    const deleteUser=async(userId) =>{
        try{
        await axiosInstance.delete(`/users/${userId}`);
        setUsers(users.filter((user)=>user.id!== userId));
        console.log('user deleted successfully.');
    }
        catch(error){
            console.error('user could not be deleted!',error);
        }

    
}
    const editUser=async (userId,formData)=>{
        console.log(userId);
        try{
            const response = await axiosInstance.post(`/users/${userId}?_method=PUT`, formData);
        setUsers(prevUsers =>
            prevUsers.map(user => user.id === userId ? response.data.user : user)
        );
        fetchUsers();
        
        console.log('user updated successfully');
        return response.data.user;
        
    }
        catch(error){
            console.error('could not update user',error);
            throw error;
        }

    }
    const showUser= async (userId)=>{
        try{
            const response= await axiosInstance.get(`users/${userId}`);
            console.log("user fetched successfuly.");
            return response.data.user
        }
        catch(error){
            console.error("user could not be fetched",error);
            throw error;
        }
    }
    const values={
        users,
        loading,
       fetchUsers,
       addUser,
       editUser,
       deleteUser,
       showUser,

    }
    return(
        <UsersContext.Provider value={values}>
            {children}
        </UsersContext.Provider>
    )
}
