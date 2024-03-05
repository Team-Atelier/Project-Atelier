/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import ProductCard from './ProductCard.jsx';

const YourOutfitList = function YourOutfitList({ thisProductID }) {
  const [isOutfitList] = useState(true);
  const [outfitList, setOutfitList] = useState([]);

  return (
    <div>
      <ItemCarousel>
        <ProductCard isOutfitList={isOutfitList} setOutfitList={setOutfitList} outfitList={outfitList} thisProductID={thisProductID} />
      </ItemCarousel>
    </div>
  );
};

export default YourOutfitList;
