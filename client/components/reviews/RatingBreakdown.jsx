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
  max-height: 200px;
`;

function RatingBreakdown({ metadata }) {
  return (

    <RatingCard>
      <div>
        Rating: 3.5
        <StarRating rating={3.5} />
      </div>
      Ratings and reviews:
      <RatingRow>
        5 stars
        <PartiallyFilledBar percentage={0} />
      </RatingRow>
      <RatingRow>
        4 stars
        <PartiallyFilledBar percentage={0} />
      </RatingRow>
      <RatingRow>
        3 stars
        <PartiallyFilledBar percentage={50} />
      </RatingRow>
      <RatingRow>
        2 stars
        <PartiallyFilledBar percentage={75} />
      </RatingRow>
      <RatingRow>
        1 stars
        <PartiallyFilledBar percentage={100} />
      </RatingRow>
      <CharacteristicRating />
    </RatingCard>

  );
}
export default RatingBreakdown;
