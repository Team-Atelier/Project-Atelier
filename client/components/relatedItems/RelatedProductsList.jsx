/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import ItemCarousel from './ItemCarousel.jsx';

function RelatedProductsList({ createRelatedProductsCard }) {
  return (
    <ItemCarousel>
      {createRelatedProductsCard()}
    </ItemCarousel>
  );
}

export default RelatedProductsList;
