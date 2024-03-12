/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewTile from './ReviewTile.jsx';
import ModalWindowTemplate from './ModalWindowTemplate.jsx';

const url = process.env.API_URL;
const token = process.env.GITHUB_TOKEN;

const ReviewBox = styled.div`
overflow-y: auto;
max-height: 541px;
background: transparent;
`;

const ModalImage = styled.img`
width:  600px;
height: 600px;
object-fit: cover;
padding: 0px
`;

function ImageModal({ src }) {
  return (
    <ModalWindowTemplate id="fullReviewImage">
      <ModalImage src={src} />
    </ModalWindowTemplate>
  );
}

function ReviewsList({ productId, ratingFilter, metadata }) {
  const [relevantReviews, setRelevantReviews] = useState([]);
  const [newestReviews, setNewestReviews] = useState([]);
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const [currentSort, setCurrentSort] = useState('relevant');
  const [currentLength, setCurrentLength] = useState();
  // Increases as "show more reviews clicked"
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [modalImg, setModalImg] = useState();
  const [markedAsHelpful, setMarkedAsHelpful] = useState({});

  /*
  const getNumberOfReviews = async () => {
    const data = await axios.get(`${url}reviews/meta`, {
      headers: { Authorization: token },
      params: {
        product_id: productId,
      },
    });
    const result = Object.values(data.data.ratings).map((item) => Number(item));
    const sum = result.reduce((accumulator, currentValue) => accumulator + currentValue);
    return sum;
  };
  */

  const getReviews = (count = 1000, sort = 'relevant') => axios.get('/api/reviews', {
    params: {
      product_id: metadata?.product_id,
      count,
      sort,
    },
  });

  const refresh = async (meta = metadata?.ratings) => {
    const convertData = Object.values(meta).map((item) => Number(item));
    let numReviewsToLoad = convertData.reduce((total, value) => total + value);
    numReviewsToLoad = numReviewsToLoad || 100;
    Promise.all([getReviews(numReviewsToLoad, 'relevant'), getReviews(numReviewsToLoad, 'helpful'), getReviews(numReviewsToLoad, 'newest')])
      .then((data) => {
        const [relevant, helpful, newest] = data;
        setRelevantReviews(relevant.data.results);
        setNewestReviews(newest.data.results);
        setHelpfulReviews(helpful.data.results);
      });
  };

  useEffect(() => {
    if (metadata?.ratings) {
      setVisibleReviews(2);
      refresh(metadata?.ratings);
    }
  }, [metadata?.ratings]);

  useEffect(() => {
    setVisibleReviews(2);
  }, [ratingFilter]);

  const handleAPIClick = async (e, reviewID) => {
    if (e.target.value !== 'helpful' && e.target.value !== 'report') {
      throw new Error('Unknown API call');
    }

    let response;
    try {
      response = await axios.put(`/api/reviews/${reviewID}/${e.target.value}`, {}, {
        headers: { Authorization: token },
      });
      await refresh();
      if (e.target.value === 'helpful') {
        const nextMarkedAsHelpful = {
          ...markedAsHelpful,
          [reviewID]: true,
        };
        setMarkedAsHelpful(nextMarkedAsHelpful);
        return nextMarkedAsHelpful;
      }
    } catch (err) {
      return err;
    }
    return response;
  };

  const handleModalImgChange = (e) => {
    const modal = document.getElementById('fullReviewImage');
    modal.style.display = 'block';
    setModalImg(e.target.src);
  };

  const FormatReviews = ({ reviewsArray, markedAsHelpful }) => {
    const allDeselected = Object.values(ratingFilter).every((value) => (value === false));
    const results = (reviewsArray.reduce((filteredList, review) => {
      if (ratingFilter?.[review.rating] || allDeselected) {
        const nextReview = (
          <ReviewTile
            key={review.review_id}
            review={review}
            handleModalImgChange={handleModalImgChange}
            handleAPIClick={handleAPIClick}
            markedAsHelpful={markedAsHelpful}
          />
        );
        return [...filteredList, nextReview];
      }
      return [...filteredList];
    }, [])
      .toSpliced(visibleReviews, relevantReviews.length)
    );
    useEffect(() => {
      setCurrentLength(results.length);
    });
    return results;
  };

  const setSort = (e) => {
    setVisibleReviews(2);
    const method = e.target.value;
    setCurrentSort(method);
  };
  const loadMoreReviews = () => {
    setVisibleReviews(visibleReviews + 2);
  };

  const twoReviewsOrLess = () => {
    if (currentLength === undefined) {
      return true;
    }
    if (relevantReviews.length <= 2) {
      return true;
    }
    if ((visibleReviews) > currentLength) {
      // Never reaches this part;
      return true;
    }

    return false;
  };
  return (

    <>
      {relevantReviews.length !== 0
      && (
      <div>
        <ImageModal src={modalImg} />
        Sort by:
        {'  '}
        <select value={currentSort} onChange={(e) => { setSort(e); }}>
          <option value="relevant">Relevant</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      )}
      {relevantReviews.length === 0 && (
      <div>
        <h2>Be the first to review this product!</h2>
        <button
          type="button"
          style={{ position: 'relative', left: '40%' }}
          onClick={(e) => {
            const modal = document.getElementById('reviewsScreen');
            modal.style.display = 'flex';
          }}
        >
          Add your review today!
        </button>
      </div>
      )}
      <ReviewBox>
        {relevantReviews.length !== 0 && currentSort === 'relevant'
        && <FormatReviews reviewsArray={relevantReviews} markedAsHelpful={markedAsHelpful} />}
        {relevantReviews.length !== 0 && currentSort === 'helpful'
        && <FormatReviews reviewsArray={helpfulReviews} markedAsHelpful={markedAsHelpful} />}
        {relevantReviews.length !== 0 && currentSort === 'newest'
        && <FormatReviews reviewsArray={newestReviews} markedAsHelpful={markedAsHelpful} />}
      </ReviewBox>

      <div>
        {(!twoReviewsOrLess()) && <button type="button" value="morereviews" onClick={(e) => { loadMoreReviews(e); console.log(!twoReviewsOrLess()); }}>More reviews</button>}
      </div>
    </>

  );
}
export default ReviewsList;
