/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React, {
  useState, useEffect, useLayoutEffect, useRef, createRef,
} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewTile from './ReviewTile.jsx';
import ModalWindowTemplate from './ModalWindowTemplate.jsx';

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
/*
const StyledButton = styled.button`
  background-color: #FFFFFF;
  border: 1px solid #222222;
  border-radius: 8px;
  box-sizing: border-box;
  color: #222222;
  cursor: pointer;
  display: inline-block;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
  outline: none;
  padding: 13px 23px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow .2s,-ms-transform .1s,-webkit-transform .1s,transform .1s;
  user-select: none;
  -webkit-user-select: none;
  width: auto;

&:focus-visible {
  box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
  transition: box-shadow .2s;
}

&:active {
  background-color: #F7F7F7;
  border-color: #000000;
  transform: scale(.96);
}

&:disabled {
  border-color: #DDDDDD;
  color: #DDDDDD;
  cursor: not-allowed;
  opacity: 1;
}
`;
*/

const StyledButton = styled.button`
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;

&:hover, focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

&:hover {
  transform: translateY(-1px);
}

&:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
`;

function ImageModal({ src }) {
  return (
    <ModalWindowTemplate id="fullReviewImage">
      <ModalImage src={src} />
    </ModalWindowTemplate>
  );
}

function ReviewsList({ ratingFilter, metadata }) {
  const [relevantReviews, setRelevantReviews] = useState([]);
  const [newestReviews, setNewestReviews] = useState([]);
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const [currentSort, setCurrentSort] = useState('relevant');
  const [currentLength, setCurrentLength] = useState();
  // Increases as "show more reviews clicked"
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [modalImg, setModalImg] = useState();
  const [markedAsHelpful, setMarkedAsHelpful] = useState({});
  const reviewsEnd = useRef(null);

  const scrollToBottom = () => {
    reviewsEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    if (visibleReviews !== 2) {
      scrollToBottom();
    }
  }, [visibleReviews]);

  useEffect(() => {
    if (Object.keys(markedAsHelpful) > 0) {
      scrollToBottom();
    }
  }, [markedAsHelpful]);

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

  useLayoutEffect(() => {
    if (metadata?.ratings) {
      setVisibleReviews(2);
      refresh(metadata?.ratings);
    }
  }, [metadata?.ratings]);

  useLayoutEffect(() => {
    setVisibleReviews(2);
  }, [ratingFilter]);

  const handleAPIClick = async (e, reviewID) => {
    if (e.target.value !== 'helpful' && e.target.value !== 'report') {
      throw new Error('Unknown API call');
    }

    let response;
    try {
      response = await axios.put(`/api/reviews/${reviewID}/${e.target.value}`, {});
      await refresh();
      if (e.target.value === 'helpful') {
        const nextMarkedAsHelpful = {
          ...markedAsHelpful,
          [reviewID]: true,
        };
        setMarkedAsHelpful(nextMarkedAsHelpful);
        setTimeout(alert('Successful!'), 0);
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
            id={review.review_id}
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
    useLayoutEffect(() => {
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
      </div>
      )}
      <ReviewBox>
        {relevantReviews.length !== 0 && currentSort === 'relevant'
        && <FormatReviews reviewsArray={relevantReviews} markedAsHelpful={markedAsHelpful} />}
        {relevantReviews.length !== 0 && currentSort === 'helpful'
        && <FormatReviews reviewsArray={helpfulReviews} markedAsHelpful={markedAsHelpful} />}
        {relevantReviews.length !== 0 && currentSort === 'newest'
        && <FormatReviews reviewsArray={newestReviews} markedAsHelpful={markedAsHelpful} />}
        <div ref={reviewsEnd} />
      </ReviewBox>

      <div>
        {(!twoReviewsOrLess()) && <StyledButton type="button" value="morereviews" onClick={(e) => { loadMoreReviews(e); }}>More reviews</StyledButton>}
        <StyledButton
          type="button"
          onClick={(e) => {
            const modal = document.getElementById('reviewsScreen');
            modal.style.display = 'flex';
          }}
        >
          Add review
        </StyledButton>

      </div>
    </>

  );
}
export default ReviewsList;
