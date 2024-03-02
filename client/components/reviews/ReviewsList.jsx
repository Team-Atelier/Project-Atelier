/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewTile from './ReviewTile.jsx';

const url = process.env.API_URL;
const token = process.env.GITHUB_TOKEN;

const ReviewBox = styled.div`
overflow-y: auto;
max-height: 500px;
background: transparent;
`;

function ReviewsList() {
  const [relevantReviews, setRelevantReviews] = useState([]);
  const [newestReviews, setNewestReviews] = useState([]);
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const [currentSort, setCurrentSort] = useState('relevant');
  const [visibleReviews, setVisibleReviews] = useState(2);

  const getNumberOfReviews = async () => {
    const data = await axios.get(`${url}reviews/meta`, {
      headers: { Authorization: token },
      params: {
        product_id: 40348,
      },
    });
    const result = Object.values(data.data.ratings).map((item) => Number(item));
    const sum = result.reduce((accumulator, currentValue) => accumulator + currentValue);
    return sum;
  };

  const getReviews = (count = 100, sort = 'relevant') => axios.get(`${url}reviews`, {
    headers: { Authorization: token },
    params: {
      product_id: 40348,
      count,
      sort,
    },
  });

  useEffect(() => {
    getNumberOfReviews()
      .then((numReviews) => Promise.all([getReviews(numReviews, 'relevant'), getReviews(numReviews, 'helpful'), getReviews(numReviews, 'newest')]))
      .then((data) => {
        const [relevant, helpful, newest] = data;
        setRelevantReviews(relevant.data.results);
        setNewestReviews(newest.data.results);
        setHelpfulReviews(helpful.data.results);
      });
  }, []);

  const setSort = (e) => {
    setVisibleReviews(2);
    const method = e.target.value;
    setCurrentSort(method);
  };
  const loadMoreReviews = () => {
    setVisibleReviews(visibleReviews + 2);
  };
  return (
    <>
      <div>
        Sort by:
        {'  '}
        <select value={currentSort} onChange={(e) => { setSort(e); }}>
          <option value="relevant">Relevant</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <ReviewBox>
        {currentSort === 'relevant' && relevantReviews
          .toSpliced(visibleReviews, relevantReviews.length)
          .map((item) => <ReviewTile key={item.review_id} review={item} />)}

        {currentSort === 'helpful' && helpfulReviews
          .toSpliced(visibleReviews, relevantReviews.length)
          .map((item) => <ReviewTile key={item.review_id} review={item} />)}

        {currentSort === 'newest' && newestReviews
          .toSpliced(visibleReviews, relevantReviews.length)
          .map((item) => <ReviewTile key={item.review_id} review={item} />)}
      </ReviewBox>
      <button type="button" onClick={(e) => { loadMoreReviews(e); }}>More reviews</button>

    </>
  );
}
export default ReviewsList;
