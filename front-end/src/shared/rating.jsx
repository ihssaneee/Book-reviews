import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export const StarRatingInput = ({ onRatingChange }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(null);
    const handleClick = (selectedRating) => {
        setRating(selectedRating);
        onRatingChange(selectedRating);
    };
    return (
        <div className="my-2" onMouseLeave={() => setHoverRating(null)}>
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled =
                    hoverRating != null ? star <= hoverRating : star <= rating;
                return (
                    <span
                        key={star}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        aria-label={`rate ${star} stars`}
                        className="cursor-pointer"
                    >
                        {isFilled ? (
                            <StarIcon
                                fontSize="large"
                                className="text-yellow-400 "
                               
                            />
                        ) : (
                            <StarBorderOutlinedIcon
                               
                                fontSize="large"
                                className="text-gray-400 "
                              
                            />
                        )}
                    </span>
                );
            })}
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
