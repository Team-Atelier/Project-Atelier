/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import axios from 'axios';
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

function ReviewTile({ review, handleModalImgChange, handleAPIClick }) {
  const [showFullReview, setShowFullReview] = useState(false);
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
        <ReviewBody>
          {review.body.length <= 250 && !showFullReview
            ? `${review.body.substring(0, 250)}`
            : (!showFullReview && `${review.body.substring(0, 250)}...`)}
          {showFullReview && review.body}
          {review.body.length > 250 && (
          <button
            type="button"
            onClick={(e) => {
              setShowFullReview(!showFullReview);
              if (showFullReview) { e.target.innerText = 'Show full review'; } else { e.target.innerText = 'Show less'; }
            }}
          >
            Show full review
          </button>

          )}

        </ReviewBody>
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
            <button
              type="button"
              value="helpful"
              onClick={(e) => { handleAPIClick(e, review.review_id); }}
            >
              Yes
            </button>
            (
            {review.helpfulness}
            )

          </StaticRow>
          <Right>
            <div>
              <button
                type="button"
                value="report"
                onClick={(e) => { handleAPIClick(e, review.review_id); }}
              >
                Report
              </button>
            </div>
          </Right>
        </FlexRow>
      </MainBox>
    </article>
  );
}
export default ReviewTile;
