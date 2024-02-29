import React from 'react';
import styled from 'styled-components';
import StarRating from './starRating.jsx'
import { format, compareAsc } from "date-fns";

const Title = styled.h1`
  margin: 0px;
  font-family: Helvetica, Sans-Serif;
  font-size: 1.5em;
  text-align: left;
  color: #BF4F74;
`;

const FlexRow = styled.section`
  display: flex;
  justify-content: space-between;
  background: papayawhip;
`;

const MainBox = styled.section`
  padding-left: 0em;
  padding-right: 0em;
  margin-left: 0em;
  margin-right: 0em;
  background: papayawhip;
  border-bottom: .25rem solid
`;

const ResponseBox = styled.section`
  display: grid;
  padding-right: 80%;
  max-width: 150em;
  background: grey !important;
`;

const Right = styled.section`
display: inline-block;
`
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



const ReviewTile = ({review})=>{
  const date = new Date(review.date);
  return (
    <article className = "reviewTile">
      <MainBox>
      <FlexRow>
      <div className = "left"><StarRating rating = {review.rating}/></div>
      <Right><aside>(Verified Purchaser) {review.reviewer_name}  {format(date, 'MMMM dd, y')}</aside></Right>
      </FlexRow>
      <FlexRow><Title>Review title</Title></FlexRow>
      <FlexRow><b>{review.summary}</b></FlexRow>
      <br/>
      <FlexRow>{review.body}</FlexRow>
      {review.recommend && <><br/>
      <FlexRow>✓ I recommend this product</FlexRow></>}
      <br/>
      {review.response && <><FlexRow><ResponseBox>Response: <br/> {review.response}</ResponseBox></FlexRow>
      <br/></>}
      <FlexRow>Was this review helpful? (Yes 10) | Report</FlexRow>


      </MainBox>
    </article>
  )
}

export default ReviewTile;