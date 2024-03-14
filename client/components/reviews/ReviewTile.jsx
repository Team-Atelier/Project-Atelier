/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import StarRating from './StarRating.jsx';

const Summary = styled.h2`
  margin: 0px;
  font-family: Mate;
  font-size: 1.5em;
  text-align: left;
  color: #007aa5;
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
  font-size: 12px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  height: 1rem;
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
&:disabled {
  background-color: #e3e3e3;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: none;
  color: rgba(0, 0, 0, 0.65);
  transform: none;
  cursor: not-allowed;
}
}
`;

function ReviewTile({
  review, handleModalImgChange, handleAPIClick, markedAsHelpful, ref, id,
}) {
  const [showFullReview, setShowFullReview] = useState(false);
  const date = new Date(review.date);
  return (
    <article id={id} className="reviewTile">
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
        <ReviewBody>
          {review.body.length <= 250 && !showFullReview
            ? `${review.body.substring(0, 250)}`
            : (!showFullReview && `${review.body.substring(0, 250)}...`)}
          {showFullReview && review.body}
          {review.body.length > 250 && (
          <StyledButton
            type="button"
            onClick={(e) => {
              setShowFullReview(!showFullReview);
              if (showFullReview) { e.target.innerText = 'Show full review'; } else { e.target.innerText = 'Show less'; }
            }}
          >
            Show full review
          </StyledButton>
          )}
        </ReviewBody>
        {review.recommend && (
        <>
          <br />
          <FlexRow>✓ I recommend this product</FlexRow>
        </>
        )}
        <br />
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
            <div>Was this review helpful? </div>
            {' '}
            <StyledButton
              type="button"
              value="helpful"
              disabled={markedAsHelpful?.[review.review_id]}
              onClick={(e) => {
                handleAPIClick(e, review.review_id)
                  .then((res) => {
                    const helpfulAlreadyClicked = res;
                    e.target.disabled = helpfulAlreadyClicked;
                    //  ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    const lastLoc = document.getElementById(review.review_id);
                    lastLoc.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    alert('successful');
                  });
              }}
            >
              Yes
            </StyledButton>
            (
            {review.helpfulness}
            )
          </StaticRow>
          <Right>
            <div>
              <StyledButton
                type="button"
                value="report"
                onClick={(e) => { handleAPIClick(e, review.review_id); }}
              >
                Report
              </StyledButton>
            </div>
          </Right>
        </FlexRow>
      </MainBox>
    </article>
  );
}
export default ReviewTile;
