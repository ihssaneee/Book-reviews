import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export const StarRatingInput = ({onRatingChange}) => {
    const [rating, setRating] = useState(0);
    const [hoverRating,setHoverRating]=useState(null);
    const handleClick = (selectedRating) => {
        setRating(selectedRating);
        onRatingChange(selectedRating);
    };
    return (
        <div className="my-2">
            {[1, 2, 3, 4, 5].map((star) =>{
                
                 return(
                star<=rating?(
                    <StarIcon 
                    key={star}
                    onClick={()=>handleClick(star)}
                    fontSize="large"
                    className="text-yellow-400 cursor-pointer"
                    aria-label={`rate ${star} stars`}
                    onMouse
                    />
                ):(
                    <StarBorderOutlinedIcon 
                    key={star}
                    onClick={()=>handleClick(star)}
                    fontSize="large"
                    className="text-gray-400 cursor-pointer"
                    aria-label={`rate ${star} stars`}
                    />
                )
            )})}
        </div>
    );
};

const RenderStars = ({ rating }) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const ratingFraction = rating - fullStars;
    const hasHalfStar = ratingFraction >= 0.3 && ratingFraction < 0.7;
    const updatedFullStars = ratingFraction >= 0.7;
    const emptyStars =
        maxStars -
        (updatedFullStars ? fullStars + 1 : fullStars) -
        (hasHalfStar ? 1 : 0);
    

    return (
        <div className="">
            {Array(updatedFullStars ? fullStars + 1 : fullStars)
                .fill(null)
                .map((_, index) => (
                    <StarIcon
                        key={`full-${index}`}
                        fontSize="medium"
                        className="text-yellow-400"
                    />
                ))}
            {hasHalfStar && (
                <StarHalfIcon fontSize="medium" className="text-yellow-400" />
            )}
            {Array(emptyStars)
                .fill(null)
                .map((_, index) => (
                    <StarOutlineIcon
                        key={`empty-${index}`}
                        fontSize="medium"
                        className=""
                    />
                ))}
        </div>
    );
};
export default RenderStars;
