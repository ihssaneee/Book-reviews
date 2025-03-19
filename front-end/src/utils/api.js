import React,{useState,useEffect} from 'react';
import axios from 'axios';

export const fetchCountries=async()=>{
    try{
        const response= await axios.get("https://restcountries.com/v3.1/all");
        console.log("countries fetched successfly.");
        return response.data.sort((a,b)=>{
            a.name.common.localeCompare(b.name.common);
        
        })
    
    }
    catch(error){
        console.error('could not fetch countries.',error);
        throw error;
    }
}