/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';

const Star = ({
  solid, rating, handleClick, handleHover, newReviewData,
}) => {
  const clicked = (review) => {
    handleClick(null, review, rating);
  };
  const handleMouseEnter = () => {
    // fill(value, start, end)
    let nextRating = [false, false, false, false, false];
    nextRating = nextRating.fill(true, 0, rating);
    handleHover(nextRating);
  };
  const handleMouseExit = () => {
    // fill(value, start, end)
    let nextRating = [false, false, false, false, false];
    if (newReviewData.rating === undefined) {
      handleHover(nextRating);
      return;
    }
    nextRating = nextRating.fill(true, 0, newReviewData.rating);
    handleHover(nextRating);
  };
  return (
    <div data-testid={`rsr${rating}`} className={`rsr${rating}`}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/cssfont-awesome.min.css" />
      {solid && (
      <span
        className="fa fa-star"
        onClick={() => { clicked('rating'); }}
        onMouseEnter={() => { handleMouseEnter(); }}
        onMouseLeave={() => { handleMouseExit(); }}
      />
      )}
      {!solid && (
      <span
        className="fa fa-star-o"
        onClick={() => { clicked('rating'); }}
        onMouseEnter={() => { handleMouseEnter(); }}
        onMouseLeave={() => { handleMouseExit(); }}
      />
      )}
    </div>
  );
};

const AddReviewStarRating = ({ newReviewData, handleNewReviewChange, numReviewsAdded }) => {
  const [hoverRating, setHoverRating] = useState([false, false, false, false]);
  const [ratingBlurb, setRatingBlurb] = useState('');
  useEffect(() => {
    setHoverRating([false, false, false, false]);
    setRatingBlurb('');
  }, [numReviewsAdded]);
  const hover = (ratings) => {
    const nextRating = ratings.filter((item) => (item === true)).length;
    setRatingBlurb(nextRating);
    setHoverRating(ratings);
  };
  const getRatingBlurb = () => {
    if (ratingBlurb === 1) {
      return 'Poor';
    }
    if (ratingBlurb === 2) {
      return 'Fair';
    }
    if (ratingBlurb === 3) {
      return 'Average';
    }
    if (ratingBlurb === 4) {
      return 'Good';
    }
    if (ratingBlurb === 5) {
      return 'Great';
    }
    return '';
  };
  return (
    <>
      <div data-testid="rating-blurb">{getRatingBlurb()}</div>
      <div style={{ display: 'flex' }}>
        <Star solid={hoverRating[0]} rating={1} handleHover={hover} handleClick={handleNewReviewChange} newReviewData={newReviewData} />
        <Star solid={hoverRating[1]} rating={2} handleHover={hover} handleClick={handleNewReviewChange} newReviewData={newReviewData} />
        <Star solid={hoverRating[2]} rating={3} handleHover={hover} handleClick={handleNewReviewChange} newReviewData={newReviewData} />
        <Star solid={hoverRating[3]} rating={4} handleHover={hover} handleClick={handleNewReviewChange} newReviewData={newReviewData} />
        <Star solid={hoverRating[4]} rating={5} handleHover={hover} handleClick={handleNewReviewChange} newReviewData={newReviewData} />
      </div>
    </>

  );
};
export default AddReviewStarRating;
