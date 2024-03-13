/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ReviewsList from './ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import AddReviews from './AddReviews/AddReviews.jsx';
import ModalWindowTemplate from './ModalWindowTemplate.jsx';

const FlexRow = styled.section`
  display: flex;
  height: auto;
  width: 95vw;
`;
const BlankAreaLeft = styled.div`
  width: 40%;
  height: 5vh;
`;
const BlankAreaRight = styled.div`
  width: 60%;
  height: 5vh;
`;
const ReviewListContainer = styled.section`
  display: grid;
  min-height: 541px;
  width: 60%
`;
const AddReviewButton = styled.button`
  position: relative;
  left: 9% !important;
`;

/*
const getMetadata = async () => {
  const data = await axios.get(`${url}reviews/meta`, {
    headers: { Authorization: token },
    params: {
      product_id: productId,
    },
  }).catch((err) => console.log(err));
  return data;
}; */

const ReviewFormStyle = styled.div`
background-color: white;
overflow-y: scroll;
max-height: 80vh;
width: 85vw;
`;
function ReviewModal({
  newReviewData, metadata, handleNewReviewChange, resetImages, reloadReviews, numReviewsAdded,
}) {
  return (
    <ModalWindowTemplate id="reviewsScreen">
      <ReviewFormStyle>
        <AddReviews
          newReviewData={newReviewData}
          metadata={metadata}
          handleNewReviewChange={handleNewReviewChange}
          resetImages={resetImages}
          reloadReviews={reloadReviews}
          numReviewsAdded={numReviewsAdded}
        />
      </ReviewFormStyle>
    </ModalWindowTemplate>
  );
}
function Reviews({ metadata, reloadReviews, numReviewsAdded }) {
  const [newReviewData, setNewReviewData] = useState({});
  // const [metadata, setMetadata] = useState();
  const [ratingFilter, setRatingFilter] = useState({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
  });

  useEffect(() => {
    if ((Object.keys(newReviewData)).length > 0) {
      setNewReviewData({});
    }
  }, [numReviewsAdded]);

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
  /*
  useEffect(() => {
    getMetadata()
      .then((res) => {
        setMetadata(res.data);
      });
  }, []);
*/
  const handleNewReviewChange = (e, name, value, id) => {
    if (e && e.target?.className === 'reviewimg') {
      const currentFiles = newReviewData.photos || [];
      const nextFiles = [...currentFiles, e.target.imgurl.value];
      const nextReviewData = {
        ...newReviewData,
        photos: nextFiles,
      };
      setNewReviewData(nextReviewData);
    } else if (e && e.target?.className === 'charSelect') {
      const nextCharacteristic = {
        ...newReviewData.characteristics,
        [id]: Number(e.target.value),
      };
      const nextReviewData = {
        ...newReviewData,
        characteristics: nextCharacteristic,
      };
      setNewReviewData(nextReviewData);
    } else if (e === null) {
      const nextReviewData = {
        ...newReviewData,
        [name]: value,
      };
      setNewReviewData(nextReviewData);
    } else {
      const nextReviewData = {
        ...newReviewData,
        [e.target.name]: e.target.value,
      };
      setNewReviewData(nextReviewData);
    }
  };
  const resetImages = (removeLastOnly = false) => {
    let nextData;
    if (removeLastOnly) {
      nextData = {
        ...newReviewData,
        photos: newReviewData.photos.toSpliced(newReviewData.photos.length - 1, 1),
      };
    } else {
      nextData = {
        ...newReviewData,
        photos: Array(0),
      };
    }
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
            metadata={metadata}
            ratingFilter={ratingFilter}
          />
        </ReviewListContainer>

      </FlexRow>
      <FlexRow>
        <ReviewModal
          newReviewData={newReviewData}
          metadata={metadata}
          handleNewReviewChange={handleNewReviewChange}
          resetImages={resetImages}
          reloadReviews={reloadReviews}
          numReviewsAdded={numReviewsAdded}
        />
        <BlankAreaLeft />
        <BlankAreaRight>
          {
  //* * Moved to reviews list section
            /*
          <AddReviewButton
            type="button"
            style={{ position: 'relative', left: '40%' }}
            onClick={(e) => {
              const modal = document.getElementById('reviewsScreen');
              modal.style.display = 'flex';
            }}
          >
            Add review
          </AddReviewButton>
          */
          }
        </BlankAreaRight>
      </FlexRow>

    </>
  );
}
export default Reviews;
