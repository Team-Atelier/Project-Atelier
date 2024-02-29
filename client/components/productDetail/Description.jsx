import React from 'react';
import styled from 'styled-components';
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
  list-style-type: disc;
  padding-left: 20px;
`;

const HighlightItem = styled.li`
  font-size: 16px;
`;

const Description = () => {


  return (
    <DescriptionContainer>
      <DescriptionContent>
        <ProductDescriptionHeader></ProductDescriptionHeader>
        <p></p>
      </DescriptionContent>
      <Separator />
      <DescriptionContent>
        <ProductHighlightHeader></ProductHighlightHeader>
        <HighlightList>
          <HighlightItem></HighlightItem>
        </HighlightList>
      </DescriptionContent>
    </DescriptionContainer>
  )
}

export default Description;