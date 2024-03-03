/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewsList from './ReviewsList.jsx';
import PartiallyFilledBar from './PartiallyFilledBar.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';

const FlexRow = styled.section`
  display: flex;
  justify-content: space-between;
`;

const ReviewListContainer = styled.section`
  display: grid;
  width: 60%
`;

function Reviews() {
  return (
    <FlexRow>
      <RatingBreakdown />
      <ReviewListContainer>
        <ReviewsList />
      </ReviewListContainer>
    </FlexRow>
  );
}
export default Reviews;
