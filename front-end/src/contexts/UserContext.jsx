import React,{useState,useEffect} from "react";
import { useContext,createContext } from "react";
import { axiosInstance } from "../api/axiosConfig";
import { useAuth } from "./AuthContext";


const UsersContext=createContext();

export const useUsers=() =>{
    return useContext(UsersContext);
}
export const UsersProvider=({children})=>{
    const {user}=useAuth();
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
        if (user){
        fetchUsers();
        }
    }, [user]);
    const addUser=async(newUser) =>{
        try{
            const response=await axiosInstance.post('/users',newUser);
            setUsers((prevUsers)=>[...prevUsers,response.data.user]);
            console.log('user added successfuly');
        }
        catch(error){
            console.error('could not add user');
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
    const editUser=async (userId,updatedData)=>{
        try{
        const response= await axiosInstance.put(`/users/${userId}`,updatedData);
        setUsers(users.map((user)=>
            user.id===userId?response.data.user:user));
        console.log('user updated successfully');
    }
        catch(error){
            console.error('could not update user');
        }
    }
    const values={
        users,
        loading,
       fetchUsers,
       addUser,
       editUser,
       deleteUser,

    }
    return(
        <UsersContext.Provider value={values}>
            {children}
        </UsersContext.Provider>
    )
}
