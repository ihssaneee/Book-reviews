import React,{useState,useEffect} from "react";
import { createContext,useContext } from "react";
import { axiosInstance } from "../api/axiosConfig";

const GenresContext=createContext();

export const useGenres=()=>{
    return useContext(GenresContext);
};

export const GenresProvider=({children})=>{
    const[genres,setGenres]=useState([]);
    const[loading,setLoading]=useState(true);
    const fetchGenres=async()=>{
        try{
            const response=await axiosInstance.get('/genres');
            setGenres(response.data.genres);
        }
        catch(error){
            console.error('could not fetch genres',error);
        }
        finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchGenres();
    }
    ,[])
    const addGenre=async({newGenre})=>{
        try{
        const response= await axiosInstance.post('/genres',newGenre);
        setGenres(response.data.genres)
        console.log('genre added successfuly!');
        }
        catch(error){
            console.error('error happened while adding the genre',error);
        }
    };
    const deleteGenre=async(genreId)=>{
        try{
            await axiosInstance.delete('/genres',genreId);
            console.log('genre deleted successfuly');
        }
        catch(error){
            console.error("error happened while deleting the genre");

        }
    };
    const editGenre=async({updatedData,genreId})=>{
        try{
            await axiosInstance.put('/genres',{
                genreId,
                updatedData
            });
            console.log('gerne updated successfuly!');
        }
        catch(error){
            console.error('error happened while updating the genre.');
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

