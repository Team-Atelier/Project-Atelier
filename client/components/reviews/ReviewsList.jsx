/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewTile from './ReviewTile.jsx';

const url = process.env.API_URL;
const token = process.env.GITHUB_TOKEN;

const ReviewBox = styled.div`
overflow-y: auto;
max-height: 541px;
background: transparent;
`;

const ModalBackground = styled.div`
  display: none;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;
const ModalWindow = styled.div`
  position: fixed;
  left: 25%;
  top: 6.25%;
`;
const ModalContent = styled.div`
background-color:
margin: 15% auto;
padding: 0px;
border: 5px solid white;
`;
const ModalImage = styled.img`
width:  600px;
height: 600px;
object-fit: cover;
padding: 0px
`;
const CloseButton = styled.span`
background-color: white;
padding: 20px;
padding-top: 5px;
`;

function ImageModal({ src }) {
  const modal = document.getElementById('fullReviewImage');
  return (
    <ModalBackground id="fullReviewImage" className="modal">

      <ModalWindow>
      <CloseButton className="close" onClick={() => { modal.style.display = 'none'; }}>CLOSE (&times;)</CloseButton>
      <ModalContent className="modal-content">
        <ModalImage src={src} />
      </ModalContent>
      </ModalWindow>

    </ModalBackground>
  );
}



function ReviewsList({productId}) {
  const [relevantReviews, setRelevantReviews] = useState([]);
  const [newestReviews, setNewestReviews] = useState([]);
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const [currentSort, setCurrentSort] = useState('relevant');
  const [visibleReviews, setVisibleReviews] = useState(2);

  const [modalImg, setModalImg] = useState();

  const handleModalImgChange = (e)=>{
    const modal = document.getElementById('fullReviewImage');
    modal.style.display = 'block';
    setModalImg(e.target.src);
  }
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

  const getReviews = (count = 100, sort = 'relevant') => axios.get(`${url}reviews`, {
    headers: { Authorization: token },
    params: {
      product_id: productId,
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
      <ImageModal src={modalImg} />

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
          .map((item) => <ReviewTile key={item.review_id} review={item} modalImg={modalImg} handleModalImgChange={handleModalImgChange}/>)}

        {currentSort === 'helpful' && helpfulReviews
          .toSpliced(visibleReviews, relevantReviews.length)
          .map((item) => <ReviewTile key={item.review_id} review={item}  modalImg={modalImg} handleModalImgChange={handleModalImgChange}/>)}

        {currentSort === 'newest' && newestReviews
          .toSpliced(visibleReviews, relevantReviews.length)
          .map((item) => <ReviewTile key={item.review_id} review={item}  modalImg={modalImg} handleModalImgChange={handleModalImgChange}/>)}
      </ReviewBox>
      <button type="button" onClick={(e) => { loadMoreReviews(e); }}>More reviews</button>

    </>
  );
}
export default ReviewsList;
