/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import ExperienceTable from './ExperienceTable.jsx';
import AddReviewStarRating from './AddReviewStarRating.jsx';

function AddReviews({ newReviewData, handleNewReviewChange }) {
  return (
    <>
      <AddReviewStarRating newReviewData={newReviewData} handleNewReviewChange={handleNewReviewChange} />
      <ExperienceTable
        newReviewData={newReviewData}
        handleNewReviewChange={handleNewReviewChange}
      />
    </>
  );
}

export default AddReviews;
