/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewsList from './ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import AddReviews from './AddReviews/AddReviews.jsx';

const url = process.env.API_URL;
const token = process.env.GITHUB_TOKEN;
const productId = 40346;
// og: 40346
const FlexRow = styled.section`
  display: flex;
  justify-content: space-between;
  height: auto;
`;
const ReviewListContainer = styled.section`
  display: grid;
  min-height: 541px;
  width: 60%
`;

const getMetadata = async () => {
  const data = await axios.get(`${url}reviews/meta`, {
    headers: { Authorization: token },
    params: {
      product_id: productId,
    },
  }).catch((err) => console.log(err));
  return data;
};

function Reviews() {
  const [newReviewData, setNewReviewData] = useState({});
  const [metadata, setMetadata] = useState();
  const [ratingFilter, setRatingFilter] = useState({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
  });

  const handleRatingFilterClick = (star, reset = false) => {
    if (reset) {
      setRatingFilter({
        5: false,
        4: false,
        3: false,
        2: false,
        1: false,
      });
      return;
    }
    const nextRatingFilter = {
      ...ratingFilter,
      [star]: !ratingFilter[star],
    };
    console.log(nextRatingFilter);
    setRatingFilter(nextRatingFilter);
  };

  useEffect(() => {
    getMetadata()
      .then((res) => {
        setMetadata(res.data);
      });
  }, []);

  const handleNewReviewChange = (e, name, value, id) => {
    if (e && e.target?.className === 'reviewimg') {
      const currentFiles = newReviewData.photos || [];
      const nextFiles = [...currentFiles, e.target.imgurl.value];
      const nextReviewData = {
        ...newReviewData,
        photos: nextFiles,
      };
      console.log(nextReviewData);
      setNewReviewData(nextReviewData);
    } else if (e && e.target?.className === 'charSelect') {
      const nextCharacteristic = {
        ...newReviewData.characteristics,
        [id]: e.target.value,
        [e.target.name]: e.target.value,
      };
      const nextReviewData = {
        ...newReviewData,
        characteristics: nextCharacteristic,
      };
      console.log(nextReviewData);
      setNewReviewData(nextReviewData);
    } else if (e === null) {
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
    const nextData = {
      ...newReviewData,
      photos: Array(0),
    };
    console.log(nextData);
    setNewReviewData(nextData);
  };
  return (
    <>
      <FlexRow>
        <RatingBreakdown
          metadata={metadata}
          ratingFilter={ratingFilter}
          handleRatingFilterClick={handleRatingFilterClick}
        />
        <ReviewListContainer>
          <ReviewsList
            productId={productId}
            ratingFilter={ratingFilter}
          />
        </ReviewListContainer>
      </FlexRow>
      <div>
        <AddReviews
          newReviewData={newReviewData}
          metadata={metadata}
          handleNewReviewChange={handleNewReviewChange}
          resetImages={resetImages}
        />
      </div>
    </>
  );
}
export default Reviews;
