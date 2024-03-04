/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewsList from './ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import AddReview from './AddReviews/AddReviews.jsx';

const FlexRow = styled.section`
  display: flex;
  justify-content: space-between;
`;
const ReviewListContainer = styled.section`
  display: grid;
  width: 60%
`;

function Reviews() {
  const [newReviewData, setNewReviewData] = useState({});

  const handleNewReviewChange = (e) => {
    const nextReviewData = {
      ...newReviewData,
      [e.target.name]: e.target.value,
    };
    setNewReviewData(nextReviewData);
  };

  return (
    <>
      <FlexRow>
        <RatingBreakdown />
        <ReviewListContainer>
          <ReviewsList />
        </ReviewListContainer>
      </FlexRow>
      <AddReview newReviewData={newReviewData} handleNewReviewChange={handleNewReviewChange} />
    </>
  );
}
export default Reviews;
