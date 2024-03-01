import React from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import ProductCard from './ProductCard.jsx';

const YourOutfitList = () => (
  <div>
    <ItemCarousel>
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </ItemCarousel>
  </div>
)

export default YourOutfitList;