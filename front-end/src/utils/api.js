import React,{useState,useEffect} from 'react';
import {axiosInstance} from "../api/axiosConfig"
import axios from 'axios';


//fetch countries 
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
};
//fetch user growth data
export const userGrowthData=async()=>{
    
    try{
        const response= await axiosInstance.get('/dashoard/user-growth');
        console.log('user growth data fetched successfully.');
        return response.data.userGrowthData;

    }
    catch(error){
        console.error('user growth data could not be fetched.',error);
        throw error;

    }
};
//popular books data
export const popularBooksData=async()=>{
    try{
        const response= await axiosInstance.get('/dashboard/popular-books-data');
        console.log('popular books data fetched successfully.');
        return response.data.popularBooksCount;
    }
    catch(error){
        console.error('could not fetch popular books data.',error);
        throw error;
    }
};