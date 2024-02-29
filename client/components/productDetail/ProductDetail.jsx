import React from 'react';
import PhotoSection from './PhotoSection.jsx';
import InfoSection from './InfoSection.jsx';
import Description from './Description.jsx';
import styled from 'styled-components';
const { useState, useEffect } = React;

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 20px;
`;

const ProductDetail = () => {

  return (
    <ProductDetailContainer>
      <ProductSectionContainer>
        <PhotoSection />
        <InfoSection />
      </ProductSectionContainer>
      <Description />
    </ProductDetailContainer>
  )
}

export default ProductDetail;