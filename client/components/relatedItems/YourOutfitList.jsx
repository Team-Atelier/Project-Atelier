/* eslint-disable import/extensions */
import React, { useState } from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import ProductCard from './ProductCard.jsx';

const YourOutfitList = function () {
  const [isOutfitList, setIsOutfitList] = useState(true);

  return (
    <div>
      <ItemCarousel>
        <ProductCard isOutfitList={isOutfitList} />
      </ItemCarousel>
    </div>
  );
};

export default YourOutfitList;
