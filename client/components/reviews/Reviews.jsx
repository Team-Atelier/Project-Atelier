/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewsList from './ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import AddReviews from './AddReviews/AddReviews.jsx';

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
  const handleNewReviewChange = (e, name, value) => {
    if (e && e.target.name === 'images') {
      const currentFiles = newReviewData[e.target.name] || [];
      const nextFiles = [...currentFiles, URL.createObjectURL(e.target.files[0])];
      const nextReviewData = {
        ...newReviewData,
        [e.target.name]: nextFiles,
      };
      console.log(nextReviewData);
      setNewReviewData(nextReviewData);
      console.log('image');
    } else if (e === null) {
      console.log('goes here');
      const nextReviewData = {
        ...newReviewData,
        [name]: value,
      };
      console.log(nextReviewData);
      setNewReviewData(nextReviewData);
    } else {
      const nextReviewData = {
        ...newReviewData,
        [e.target.name]: e.target.value,
      };
      console.log(nextReviewData);
      setNewReviewData(nextReviewData);
    }
  };

  const resetImages = () => {
    newReviewData.images.forEach((item) => {
      URL.revokeObjectURL(item);
    });
    const nextData = {
      ...newReviewData,
      images: Array(0),
    };
    console.log(nextData);
    setNewReviewData(nextData);
  };

  const handleRatingClick = (reviewRating) => {
    const nextReviewData = {
      ...newReviewData,
      reviewRating,
    };
    console.log(nextReviewData);
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
      <AddReviews newReviewData={newReviewData} handleNewReviewChange={handleNewReviewChange} resetImages={resetImages} />
    </>
  );
}
export default Reviews;
