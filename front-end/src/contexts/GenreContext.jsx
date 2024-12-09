import React,{useState,useEffect} from "react";
import { createContext,useContext } from "react";
import { axiosInstance } from "../api/axiosConfig";
import { useAuth } from "./AuthContext";

const GenresContext=createContext();

export const useGenres=()=>{
    return useContext(GenresContext);
};

export const GenresProvider=({children})=>{
    const[genres,setGenres]=useState([]);
    const {user}=useAuth();
    const[loading,setLoading]=useState(true);
    const fetchGenres=async()=>{
        try{
            const response=await axiosInstance.get('/genres');
            setGenres(response.data.genres);
            console.log(response.data.genres);
        }
        catch(error){
            console.error('could not fetch genres',error);
        }
        finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        if (user){
        fetchGenres();
        }
    }
    ,[user])
    const addGenre=async(newGenre)=>{
        try{
        const response= await axiosInstance.post('/genres',newGenre);
        setGenres([...genres,response.data.genre]);
        console.log('genre added successfuly!');
        }
        catch(error){
            console.error('error happened while adding the genre',error);
        }
    };
    const deleteGenre=async(genreId)=>{
        try{
            const response= await axiosInstance.delete(`/genres/${genreId}`);
            setGenres(genres.filter((genre)=>genre.id!=genreId));
            console.log('genre deleted successfuly');
        }
        catch(error){
            console.error("error happened while deleting the genre",error);

        }
    };
    const editGenre=async(genreId,updatedData)=>{
        try{
           const response= await axiosInstance.put(`/genres/${genreId}`,updatedData);
            setGenres(genres.map((genre)=>genreId===genreId?response.data.genre:genre));
            console.log('gerne updated successfuly!');
        }
        catch(error){
            console.error('error happened while updating the genre.',error);
        }

    };
    
    

    
    const value={
        genres,
        loading,
        fetchGenres,
        addGenre,
        deleteGenre,
        editGenre,

    };



    return(
        <GenresContext.Provider value={value}>
            {children}
        </GenresContext.Provider>

    )
}
export default {GenresProvider}

