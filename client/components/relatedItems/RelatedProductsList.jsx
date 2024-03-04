/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import ItemCarousel from './ItemCarousel.jsx';

function RelatedProductsList({ createRelatedProductsCard }) {
  return (
    <div>
      <ItemCarousel>
        {createRelatedProductsCard()}
      </ItemCarousel>
    </div>
  );
}

export default RelatedProductsList;
