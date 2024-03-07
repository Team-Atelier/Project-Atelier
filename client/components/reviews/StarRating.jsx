/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';

const StarStyle = styled.span`
  .filled {
    color: black;
    position: relative;
    }
   .filled:after {
    bottom: 0;
    content: " ";
    position: absolute;
    background: white;
    width: ${({ percent }) => percent}%;
    height: 100%;
    right: -0.15px;
  }
    `;

const StarPosition = styled.div`
width: 100%;
height: 100%;
z-index: 1;
`;
const StarPosition2 = styled.div`
position: absolute;

`;

const Container = styled.div`
position: relative;
display: inline-flex;
flex-direction: row;
`;

const Star = ({ cropAmt }) => (
  <>
    {(cropAmt === 0) && (
    <StarStyle percent={cropAmt}>
      <Container>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <StarPosition>
          <span className="fa fa-star filled" />
        </StarPosition>
      </Container>
    </StarStyle>
    )}
    {(cropAmt !== 0) && (
    <StarStyle percent={cropAmt}>
      <Container>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <StarPosition>
          <span className="fa fa-star-o" />
        </StarPosition>

        <StarPosition2>
          <StarPosition>
            <span className="fa fa-star filled" />
          </StarPosition>
        </StarPosition2>

      </Container>
    </StarStyle>
    )}
  </>
);
const StarRating = ({ rating }) => {
  const fullStarsToRender = Math.floor(rating);
  const partialStar = (1 - (rating % 1)) * 100;
  const remainingEmptyStars = Math.floor(5 - rating);
  return (
    <>
      {Array(fullStarsToRender).fill(<Star cropAmt={0} />)}
      {partialStar !== 100 && <Star cropAmt={partialStar} />}
      {remainingEmptyStars >= 1 && Array(remainingEmptyStars).fill(<Star cropAmt={100} />)}
    </>
  );
};

/*
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
*/
export default StarRating;
