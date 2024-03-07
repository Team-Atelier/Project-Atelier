/* eslint-disable no-unused-expressions */
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

function RatingRowElement({
  parentID, star, rate, handleRatingFilterClick,
}) {
  const [selected, setSelected] = useState(false);
  const highlightColor = 'lightgreen';
  const selectedColor = 'green';
  return (
    <RatingRow
      id={parentID}
      onClick={(e) => {
        setSelected(!selected);
        handleRatingFilterClick(star);
        if (!selected) { document.getElementById(parentID).style.background = selectedColor; } else { document.getElementById(parentID).style.background = highlightColor; }
      }}
      onMouseEnter={(e) => {
        if (!selected) { document.getElementById(parentID).style.background = highlightColor; }
      }}
      onMouseLeave={(e) => {
        !selected
          ? e.target.style.background = 'transparent'
          : document.getElementById(parentID).style.background = selectedColor;
      }}
    >
      {star}
      {' '}
      star
      <PartiallyFilledBar percentage={rate?.[star] * 100 || 100} />
    </RatingRow>
  );
}

function RatingBreakdown({ metadata, handleRatingFilterClick, children }) {
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

      <RatingRowElement parentID="five-star" star={5} rate={rate} handleRatingFilterClick={handleRatingFilterClick} />
      <RatingRowElement parentID="four-star" star={4} rate={rate} handleRatingFilterClick={handleRatingFilterClick} />
      <RatingRowElement parentID="three-star" star={3} rate={rate} handleRatingFilterClick={handleRatingFilterClick} />
      <RatingRowElement parentID="two-star" star={2} rate={rate} handleRatingFilterClick={handleRatingFilterClick} />
      <RatingRowElement parentID="one-star" star={1} rate={rate} handleRatingFilterClick={handleRatingFilterClick} />

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
