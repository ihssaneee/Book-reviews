import React, { useState } from "react";
import { useReviews } from "../../contexts/ReviewContext";
import { useUsers } from "../../contexts/UserContext";
import { useBooks } from "../../contexts/BookContext";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { StarRatingInput } from "../../shared/rating";


export default function AddReviewForm(){
    const [formData,setFormData]=useState({
        user_id:"",
        book_id:"",
        review_text:"",
        rating:"",
    });
    //error state
    const [error,setError]=useState(null);
    //success state
    const [success,setSuccess]=useState(null);
    //list of all users
    const {users}=useUsers();
    //list of all books
    const {books}=useBooks();
    //handle data change
    const handleChange=(e)=>{
        const {name, value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    //validate form data
    const validateForm=()=>{
        if (!formData.book_id.trim() && !formData.rating.trim() && !formData.user_id.trim() ){
            setError("all fields are required.");
            return false;
            
        }
        return true;
    }
    
    const {addReview}=useReviews();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (!validateForm()){
            return;
        }
        try{
            await addReview(formData);
            setFormData({
                book_id:"",
                user_id:"",
                review_text:"",
                rating:"",
            });
            setError(null);
            console.log('Review added successfully.');
            setSuccess("Review added successfully.");
        }
        catch(error){
            console.error('review could not be added',error);
            const errorMessage=error.response?.data?.message | "an unexpected error happened!";
            setError(errorMessage);
            setSuccess(null);

        }
    }




    return(
        <div className="max-w-md  mx-auto bg-white shadow-sm rounded-lg px-8 py-8 m-8 font-Roboto">
                    <h2 className="text-2xl mb-4">Add a New Review</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="block mb-2">
                                User Name
                            </label>
                           <select name="user_id" value={formData.user_id} onChange={handleChange} className=   "rounded-lg p-2 border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-400">
                                <option value="" >Select User</option>
                                {users.map((user)=>(
                                    <option key={user.id} value={user.id} >{user.name}</option>
                                ))}
                           </select>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="description" className="block mb-2">
                                Description
                            </label>
                            <select name="book_id" value={formData.book_id} onChange={handleChange} className=   "rounded-lg p-2 border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-400" >
                                <option value="" >Select a book</option>
                                {books.map((book)=>(
                                    <option key={book.id} value={book.id} >{book.title}</option>
                                ))}
                            </select>
                           
                        </div>
                        <div className="flex flex-col mb-4">
                        <textarea
                         name="review_text"
                         value={formData.review_text}
                         onChange={handleChange}
                         rows={5}
                         placeholder="Enter your review (optional)"
                         className=   "rounded-lg p-2 border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-400"
                         />
                         </div>
                         <div className="flex flex-col mb-4 ">
                            <label htmlFor="rating">User rating</label>
                    <StarRatingInput
                        onRatingChange={(rating) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                rating: rating.toString(),
                            }))
                        }
                      
                    />
                </div>
                        {error && <span className="text-red-500 mb-4">{error}</span>}
                        {success && (
                            <span className="text-green-500 mb-4">{success}</span>
                        )}
                        <div className="flex items-center  gap-14 justify-center mx-16">
                            <button
                                type="submit"
                                className="flex w-28 my-4  items-center justify-center gap-1 text-white bg-yellow-500 hover:bg-white hover:text-yellow-600 hover:border-yellow-600 border rounded-md p-2"
                            >
                                <AddIcon fontSize="small" />
                                Add
                            </button>
                            <Link
                                to="/dashboard/genres"
                                className="flex items-center max-w-28 justify-center gap-1 bg-blue-950  hover:border-blue-950 hover:ring-0 hover:outline-none hover:text-blue-950 hover:bg-white text-white px-4 py-2 rounded-md border  "
                            >
                                
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
    )
}