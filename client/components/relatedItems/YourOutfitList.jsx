/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import ProductCard from './ProductCard.jsx';

const YourOutfitList = function YourOutfitList({ thisProductID }) {
  const [isOutfitList] = useState(true);
  const [outfitList, setOutfitList] = useState([]);

  useEffect(() => {
    localStorage.setItem('outfitList', JSON.stringify(outfitList));
  }, [outfitList]);

  return (
    <div>
      <ItemCarousel>
        <ProductCard isOutfitList={isOutfitList} setOutfitList={setOutfitList} outfitList={outfitList} thisProductID={thisProductID} />
      </ItemCarousel>
    </div>
  );
};

export default YourOutfitList;
