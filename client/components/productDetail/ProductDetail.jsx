/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PhotoSection from './PhotoSection.jsx';
import InfoSection from './InfoSection.jsx';
import Description from './Description.jsx';

const { useState, useEffect } = React;

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: mate;
`;

const ProductSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 1.25em;
`;

function ProductDetail({
  currentProductID, scrollToReviews, scaleRatings, computeAverage,
}) {
  const [productInformation, setProductInformation] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${currentProductID}`)
      .then((response) => {
        setProductInformation(response.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, [currentProductID]);

  if (!productInformation) {
    return <div>Loading...</div>;
  }

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId);
  };

  return (
    <ProductDetailContainer>
      <ProductSectionContainer>
        <PhotoSection productId={productInformation.id} selectedStyle={selectedStyle} />
        <InfoSection
          productId={productInformation.id}
          onStyleSelect={handleStyleSelect}
          scrollToReviews={scrollToReviews}
          scaleRatings={scaleRatings}
          computeAverage={computeAverage}
        />
      </ProductSectionContainer>
      <Description productId={productInformation.id} />
    </ProductDetailContainer>
  );
}

export default ProductDetail;
