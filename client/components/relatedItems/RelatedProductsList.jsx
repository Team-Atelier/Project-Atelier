import React from 'react';
import ItemCarousel from './ItemCarousel.jsx';

const RelatedProductsList = function ({createRelatedProductsCard}) {
  return (
    <div>
      <ItemCarousel>
        {createRelatedProductsCard()}
      </ItemCarousel>
    </div>
  );
};

export default RelatedProductsList;
