/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import ExperienceTable from './ExperienceTable.jsx';

function AddReviews({ newReviewData, handleNewReviewChange }) {
  return (
    <ExperienceTable
      newReviewData={newReviewData}
      handleNewReviewChange={handleNewReviewChange}
    />
  );
}

export default AddReviews;
