/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import styled from 'styled-components';
// Idea pass a prop with number and it will fill the rating based on that.
// f006 :Solid
const StarStyle = styled.span`
.fa-star:after {
  color: black;
  position: relative;
  content: "\f005"
  }
  `;

const OutlinedStar = () => (
  <span className="fa fa-star" />
);

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
    console.log(newReviewData);
    nextRating = nextRating.fill(true, 0, newReviewData.reviewRating);
    handleHover(nextRating);
  };
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/cssfont-awesome.min.css" />
      {solid && (
      <span
        className="fa fa-star"
        onClick={() => { clicked('reviewRating'); }}
        onMouseEnter={() => { handleMouseEnter(); }}
        onMouseLeave={() => { handleMouseExit(); }}

      />
      )}
      {!solid && (
      <span
        className="fa fa-star-o"
        onClick={() => { clicked('reviewRating'); }}
        onMouseEnter={() => { handleMouseEnter(); }}
        onMouseLeave={() => { handleMouseExit(); }}
      />
      )}
    </>
  );
};

const AddReviewStarRating = ({ newReviewData, handleNewReviewChange, handleHover }) => {
  const [hoverRating, setHoverRating] = useState([false, false, false, false]);
  const [ratingBlurb, setRatingBlurb] = useState('');
  const handleStarClick = (e) => {
    handleNewReviewChange(e);
  };
  const hover = (ratings) => {
    const nextRating = ratings.filter((item) => (item === true)).length;
    setRatingBlurb(nextRating);
    setHoverRating(ratings);
  };
  return (
    <>
      {ratingBlurb === 1 && <div>Poor</div>}
      {ratingBlurb === 2 && <div>Fair</div>}
      {ratingBlurb === 3 && <div>Average</div>}
      {ratingBlurb === 4 && <div>Good</div>}
      {ratingBlurb === 5 && <div>Great</div>}
      <Star solid={hoverRating[0]} rating={1} handleHover={hover} handleClick={handleNewReviewChange} newReviewData={newReviewData} />
      <Star solid={hoverRating[1]} rating={2} handleHover={hover} handleClick={handleNewReviewChange} newReviewData={newReviewData} />
      <Star solid={hoverRating[2]} rating={3} handleHover={hover} handleClick={handleNewReviewChange} newReviewData={newReviewData} />
      <Star solid={hoverRating[3]} rating={4} handleHover={hover} handleClick={handleNewReviewChange} newReviewData={newReviewData} />
      <Star solid={hoverRating[4]} rating={5} handleHover={hover} handleClick={handleNewReviewChange} newReviewData={newReviewData} />
    </>

  );
};
export default AddReviewStarRating;
