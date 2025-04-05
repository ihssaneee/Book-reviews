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
        <div className="lg:max-w-lg w-full  mx-auto bg-white dark:border-none dark:bg-[#22242B]  shadow-sm rounded-lg  py-8  font-public-sans">
                      <div className=" border-b dark:border-b-neutral-500 p-3 flex-shrink w-full">
                <h2 className="text-2xl font-bold labelStyle">Add New Review</h2>
            </div>
                    <form onSubmit={handleSubmit} className="flex flex-col p-8">
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="block mb-2 labelStyle">
                                User Name
                            </label>
                           <select name="user_id" value={formData.user_id} onChange={handleChange} className=   "inputStyle rounded-lg p-2 border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-400">
                                <option value="" >Select User</option>
                                {users.map((user)=>(
                                    <option key={user.id} value={user.id} >{user.name}</option>
                                ))}
                           </select>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="description" className="block mb-2 labelStyle">
                                Book
                            </label>
                            <select name="book_id" value={formData.book_id} onChange={handleChange} className=   " inputStyle cursor-pointer rounded-lg p-2 border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-400" >
                                <option value="" >Select a book</option>
                                {books.map((book)=>(
                                    <option key={book.id} value={book.id} >{book.title}</option>
                                ))}
                            </select>
                           
                        </div>
                        <div className="flex flex-col mb-4 gap-1">
                            <label htmlFor="review text" className="labelStyle" >What did you think ?</label>
                        <textarea
                         name="review_text"
                         value={formData.review_text}
                         onChange={handleChange}
                         rows={5}
                         placeholder="Enter your review (optional)"
                         className=   "rounded-lg p-2 inputStyle border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-400"
                         />
                         </div>
                         <div className="flex flex-col mb-4 ">
                            <label htmlFor="rating" className="labelStyle">User rating</label>
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
                                className="flex w-28 my-4  items-center justify-center gap-1 text-white bg-yellow-500 hover:bg-white hover:text-yellow-600 hover:border-yellow-600 rounded-md p-2"
                            >
                                <AddIcon fontSize="small" />
                                Add
                            </button>
                            <Link
                                to="/admin/genres"
                               className="w-24 m-6 rounded-md border p-2 border-red-500 text-red-500 text-base flex items-center justify-center hover:bg-red-50 hover:text-neutral-700"
                            >
                                
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
    )
}