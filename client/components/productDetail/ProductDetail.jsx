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
`;

const ProductSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 20px;
`;

function ProductDetail() {
  const [productInformation, setProductInformation] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  const apiURL = process.env.API_URL;
  const token = process.env.GITHUB_TOKEN;

  useEffect(() => {
    axios.get(`${apiURL}products/40346`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response.data);
        setProductInformation(response.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

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
        <InfoSection productId={productInformation.id} onStyleSelect={handleStyleSelect} />
      </ProductSectionContainer>
      <Description productId={productInformation.id} />
    </ProductDetailContainer>
  );
}

export default ProductDetail;
