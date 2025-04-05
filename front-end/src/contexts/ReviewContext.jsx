import React,{useState,useEffect, Children} from "react";
import { createContext,useContext } from "react";
import { axiosInstance } from "../api/axiosConfig";
import { useAuth } from "./AuthContext";

const ReviewsContext=createContext();

export const useReviews= ()=>{
    return useContext(ReviewsContext);
}
export const ReviewsProvider=({children})=>{
    const {isAuthenticated}=useAuth();
    const [reviews,setReviews]=useState([]);
    const [loading,setLoading]=useState(false);

    const fetchReviews=async()=>{
        try{
            setLoading(true);
            const response= await axiosInstance.get("/reviews");
            setReviews(response.data.reviews);
            console.log('reviews fetched successfully.');
        }
        catch(error){
            console.error("An error happened while fetching reviews. ",error);
            throw error;
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if (isAuthenticated){
            fetchReviews();
        }
    },[isAuthenticated]);
    
    const addReview=async(newReview)=>{
        try{
            const response= await axiosInstance.post("/reviews",newReview);
            setReviews((prev)=>[...prev,response.data.review]);
            console.log("review added successfully.");
        }
        catch(error){
            console.error('could not add the review',error);
            throw error;
        }
    }

    const deleteReview=async(id)=>{
        try{
            await axiosInstance.delete(`/reviews/${id}`);
            setReviews(reviews.filter((review)=>review.id!=id));
            console.log('review deleted successfully.')
        }
        catch(error){
            console.error("could not delete the review",error);
            throw error;
        }

    }
    //show review
    const showReview=async(id)=>{
        try{
           const response=await axiosInstance.get(`/reviews/${id}`);
            console.log('review fetched successfully.');
            return response.data.review;
        }
        catch(error){
            console.error('could not fetch review',error);
            throw error;
        }
    }
    const values={
        reviews,
        addReview,
        loading,
        deleteReview,
        showReview,
    }
    return (
        <ReviewsContext.Provider value={values} >
            {children}
        </ReviewsContext.Provider>
    )
}