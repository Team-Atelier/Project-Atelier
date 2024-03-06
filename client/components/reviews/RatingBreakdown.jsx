/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewsList from './ReviewsList.jsx';
import PartiallyFilledBar from './PartiallyFilledBar.jsx';
import StarRating from './StarRating.jsx';
import CharacteristicRating from './CharacteristicRating.jsx';

const RatingRow = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%
`;

const RatingCard = styled.section`
  display: grid;
  width: 40%;
`;

/*
{
    "product_id": "40348",
    "ratings": {
        "1": "32",
        "2": "13",
        "3": "100",
        "4": "51",
        "5": "92"
    },
    "recommended": {
        "false": "47",
        "true": "241"
    },
    "characteristics": {
        "Size": {
            "id": 135232,
            "value": "2.8893280632411067"
        },
        "Width": {
            "id": 135233,
            "value": "2.9036697247706422"
        },
        "Comfort": {
            "id": 135234,
            "value": "3.1441860465116279"
        },
        "Quality": {
            "id": 135235,
            "value": "3.2710280373831776"
        }
    }
}
*/
// test this.
const scaleRatings = (ratings) => {
  const result = {};
  let sum = 0;
  Object.keys(ratings)?.forEach((key) => {
    sum += Number(ratings[key]);
  });
  Object.keys(ratings).forEach((key) => {
    result[key] = (Number(ratings[key]) / sum);
  });
  return result;
};
const computeAverage = (ratings) => {
  let result = 0;
  Object?.keys(ratings)?.forEach((key) => {
    result += Number(key) * Number(ratings[key]);
  });
  return result;
};

function RatingBreakdown({ metadata }) {
  const rec = Number(metadata?.recommended?.true);
  const noRec = Number(metadata?.recommended?.false);
  const percentRecommend = 100 * (rec / (rec + noRec));
  const rate = metadata?.ratings && scaleRatings(metadata.ratings);
  let average = metadata?.ratings && computeAverage(rate);
  average = Math.round(average * 10) / 10;
  return (

    <RatingCard>
      Ratings and reviews:
      <div>
        Rating:
        {' '}
        {average}
        <StarRating rating={average || 0} />
      </div>
      <div>
        {Math.round(percentRecommend)}
        % of reviewers recommend this product
      </div>
      <RatingRow>
        5 stars
        <PartiallyFilledBar percentage={rate?.[5] * 100 || 100} />
      </RatingRow>
      <RatingRow>
        4 stars
        <PartiallyFilledBar percentage={rate?.[4] * 100 || 100} />
      </RatingRow>
      <RatingRow>
        3 stars
        <PartiallyFilledBar percentage={rate?.[3] * 100 || 100} />
      </RatingRow>
      <RatingRow>
        2 stars
        <PartiallyFilledBar percentage={rate?.[2] * 100 || 100} />
      </RatingRow>
      <RatingRow>
        1 stars
        <PartiallyFilledBar percentage={rate?.[1] * 100 || 100} />
      </RatingRow>
      {metadata?.characteristics && Object.keys(metadata?.characteristics).map((key) => (
        <CharacteristicRating
          key={metadata.characteristics[key].id}
          characteristic={key}
          rating={metadata.characteristics[key].value}
        />
      ))}
    </RatingCard>

  );
}
export default RatingBreakdown;
