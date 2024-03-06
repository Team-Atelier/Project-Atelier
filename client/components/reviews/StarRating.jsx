/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';
// Idea pass a prop with number and it will fill the rating based on that.

const StarStyle = styled.span`
.checked {
  color: black;
  position: relative;
  }
 .checked:after {
  bottom: 0;
  content: " ";
  position: absolute;
  background: white;
  width: ${({ percent }) => percent}%;
  height: 100%;
  right: -0.15px;
}
  `;

const Star = ({ cropAmt }) => (
  <StarStyle percent={cropAmt}>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    {/* <span className="fa fa-star-o" /> */}

    <span className="fa fa-star checked" />

  </StarStyle>
);

const StarRating = ({ rating }) => {
  const fullStarsToRender = Math.floor(rating);
  const partialStar = (1 - (rating % 1)) * 100;
  return (
    <>
      {Array(fullStarsToRender).fill(<Star cropAmt={0} />)}
      {partialStar !== 100 && <Star cropAmt={partialStar} />}
    </>
  );
};

export default StarRating;
