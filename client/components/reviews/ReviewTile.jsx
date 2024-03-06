/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import styled from 'styled-components';
import { format, compareAsc } from 'date-fns';
import StarRating from './StarRating.jsx';

const Summary = styled.h2`
  margin: 0px;
  font-family: Helvetica, Sans-Serif;
  font-size: 1.5em;
  text-align: left;
  color: #BF4F74;
  word-wrap:break-word;
`;

const FlexRow = styled.div`
  word-wrap: break-word;
  display: flex;
  justify-content: space-between;
  background: white;
`;
const ImageRow = styled(FlexRow)`
justify-content: left;
`;

const ReviewBody = styled.div`
  word-wrap: break-word;
  justify-content: space-between;
  background: white;
`;

const StaticRow = styled.section`
  white-space:pre;
  display: flex;
  justify-content: start;
  background: white;


`;
const Image = styled.img`
  width:  100px;
  height: 100px;
  object-fit: cover;
  padding: 5px
`;

const MainBox = styled.section`
  padding-left: 0em;
  padding-right: 0em;
  margin-left: 0em;
  margin-right: 0em;
  background: white;
  border-bottom: .125rem solid
`;

const ResponseBox = styled.section`
  display: grid;
  padding-right: 80%;
  background: grey !important;
`;

const Right = styled.section`
display: inline-block;
`;
/*
const Modal = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;
const ModalContent = styled.div`
background-color:
margin: 15% auto;
padding: 20px;
border: 1px solid #888;
width: 80%;
`;
const ModalImage = styled.img`
width:  600px;
height: 600px;
object-fit: cover;
padding: 5px
`;
*/
/*
    let review = {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    }c
*/

function ReviewTile({ review , modalImg, handleModalImgChange}) {
  const modal = document.getElementById('fullReviewImage');
  const date = new Date(review.date);

  return (
    <article className="reviewTile">
      <MainBox>
        <FlexRow>
          <div className="left"><StarRating rating={review.rating} /></div>
          <Right>
            <aside>
              {false && 'Verified Purchaser'}
              {review.reviewer_name}
              {' '}
              {format(date, 'MMMM dd, y')}
            </aside>
          </Right>
        </FlexRow>

        <FlexRow><Summary>{review.summary}</Summary></FlexRow>
        <br />
        <ReviewBody>{review.body}</ReviewBody>
        {review.recommend && (
        <>
          <br />
          <FlexRow>✓ I recommend this product</FlexRow>
          <ImageRow>
            {review.photos.map((img) => (
              <Image
                key={img.id}
                src={img.url}
                onClick={(e) => {
                  handleModalImgChange(e);
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ))}
          </ImageRow>
        </>
        )}
        <br />
        {review.response && (
        <>
          <FlexRow>
            <ResponseBox>
              Response:
              <br />
              {' '}
              {review.response}
            </ResponseBox>
          </FlexRow>
          <br />
        </>
        )}

        <FlexRow>
          <StaticRow>
            <div>Was this review helpful?  </div>
            {' '}
            <div>
              <u onClick={() => { alert('Placeholder'); }}>Yes </u>
              (
              {review.helpfulness}
              )
            </div>
          </StaticRow>
          <Right>
            <div><u onClick={() => { alert('Placeholder'); }}> Report </u></div>
          </Right>
        </FlexRow>
      </MainBox>
    </article>
  );
}

export default ReviewTile;
