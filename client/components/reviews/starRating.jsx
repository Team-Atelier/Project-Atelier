import React from 'react';
import styled from 'styled-components';
// Idea pass a prop with number and it will fill the rating based on that.
function StarRating({ rating }) {
  return (
    <>{'★'.repeat(Math.floor(rating))}</>
  );
}

export default StarRating;
