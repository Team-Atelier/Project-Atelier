/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import AddToOutfitCard from './AddToOutfitCard.jsx';

export default function YourOutfitList({ thisProductID }) {
  const [outfitList, setOutfitList] = useState([]);

  useEffect(() => {
    localStorage.setItem('outfitList', JSON.stringify(outfitList));
  }, [outfitList]);

  return (
    <>
      <h2>
        Build an ensemble
      </h2>
      <ItemCarousel>
        <AddToOutfitCard outfitList={outfitList} setOutfitList={setOutfitList} thisProductID={thisProductID} />
      </ItemCarousel>
    </>
  );
}
