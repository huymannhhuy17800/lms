import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'; // Import full, empty, and half stars

const StarRatingDisplay = ({ rating, ratingCount, enrolled }: { rating: number, ratingCount?: number, enrolled?: number }) => {
    // Ensure the rating is within a valid range (e.g., 0 to 5)
    const safeRating = Math.max(0, Math.min(rating));
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex gap-2 items-center" aria-label={`Rating ${safeRating}`}>
            <span className='text-[#ffd900] font-bold text-[15px]'>{safeRating.toFixed(1)}</span>
            <div className="flex items-center gap-0.5">
                {/* Display full stars */}
                {[...Array(fullStars)].map((_, index) => (
                    <FaStar key={`full-${index}`} color="#ffd900" size={12} alignmentBaseline='auto' /> // Use a golden color for filled stars
                ))}
                {/* Display half star if applicable */}
                {hasHalfStar && <FaStarHalfAlt key="half" color="#ffd900" size={12} />}
                {/* Display empty stars */}
                {[...Array(emptyStars)].map((_, index) => (
                    <FaRegStar key={`empty-${index}`} color="#ffd90073" size={12} /> // Use a lighter color for empty stars
                ))}
            </div>
            <span className='underline cursor-pointer'>{`(${ratingCount} ratings)`}</span>
            <span className=''>{enrolled && enrolled > 0 ? `${enrolled} enrolled` : '0 enrolled'}</span>

        </div>
    );
};

export default StarRatingDisplay;
