/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

const { useState, useEffect } = React;

const DescriptionContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  grid-column-gap: 20px;
  margin: 0 auto;
  padding: 20px
`;

const ProductDescriptionHeader = styled.h3`
  font-size: 20px;
`;

const DescriptionContent = styled.div`
  align-self: center;
`;

const ProductHighlightHeader = styled.h3`
  font-size: 20px;
`;

const Separator = styled.div`
  width: 1px;
  height: 100%;
  background-color: #ccc;
  align-self: center;
`;

const HighlightList = styled.ul`
  list-style-type: none;
  padding-left: 20px;
`;

const HighlightItem = styled.li`
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const DotIcon = styled(FaCheck)`
  margin-right; 20px;
`;

// eslint-disable-next-line react/prop-types
function Description({ productId }) {
  const [productDescription, setProductDescription] = useState([]);
  const [productFeatures, setProductFeatures] = useState([]);

  useEffect(() => {
    axios.get(`/api/products/${productId}`)
      .then((response) => {
        setProductDescription(response.data);
        setProductFeatures(response.data.features);
      })
      .catch((err) => {
        console.error('Error retrieving product information:', err);
      });
  }, [productId]);

  return (
    <DescriptionContainer>

      <DescriptionContent>
        <ProductDescriptionHeader>{productDescription.slogan}</ProductDescriptionHeader>
        <p>{productDescription.description}</p>
      </DescriptionContent>

      <Separator />

      <DescriptionContent>
        <ProductHighlightHeader>Features:</ProductHighlightHeader>
        <HighlightList>
          {productFeatures.map((feature) => (
            <HighlightItem key={productFeatures.indexOf(feature)}>
              <DotIcon />
              {feature.feature}
              :
              {' '}
              {feature.value}
            </HighlightItem>
          ))}
        </HighlightList>
      </DescriptionContent>

    </DescriptionContainer>
  );
}

export default Description;
