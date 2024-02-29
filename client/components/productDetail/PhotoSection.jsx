import React from 'react';
import styled from 'styled-components';
const { useState, useEffect } = React;

const PhotoSectionContainer = styled.div`
  width: 60%;
  padding: 20px;
  background-color: #f0f0f0;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const PhotoSection = () => {

  return (
    <PhotoSectionContainer>
      <ProductImage />
    </PhotoSectionContainer>
  )
}

export default PhotoSection;