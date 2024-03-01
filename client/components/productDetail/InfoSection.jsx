import React from 'react';
import styled from 'styled-components';
const { useState, useEffect } = React;

const InfoSectionContainer = styled.div`
  width: 40%;
  padding: 20px;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  color: #007bff;
`;


const InfoSection = () => {


  return (

    <InfoSectionContainer>
      <ProductTitle></ProductTitle>
      <ProductPrice></ProductPrice>
    </InfoSectionContainer>
  )
}

export default InfoSection;