/* eslint-disable import/extensions */
import React from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import ProductCard from './ProductCard.jsx';

const YourOutfitList = function () {
  return (
    <div>
      <ItemCarousel>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ItemCarousel>
    </div>
  );
};

export default YourOutfitList;
