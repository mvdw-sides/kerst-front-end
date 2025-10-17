import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating = 0, onRatingChange, readOnly = false, size = 'medium' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (newRating) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (newRating) => {
    if (!readOnly) {
      setHoverRating(newRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  const getStarClass = (starIndex) => {
    const currentRating = hoverRating || rating;
    if (starIndex <= currentRating) {
      return 'star filled';
    }
    return 'star';
  };

  return (
    <div className={`star-rating ${size} ${readOnly ? 'read-only' : ''}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={getStarClass(star)}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
      {!readOnly && (
        <span className="rating-label">
          {rating === 0 ? 'Select rating' : `${rating} star${rating > 1 ? 's' : ''}`}
        </span>
      )}
    </div>
  );
};

export default StarRating;
