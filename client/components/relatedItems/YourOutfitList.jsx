/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import AddToOutfitCard from './AddToOutfitCard.jsx';

export default function YourOutfitList({ thisProductID, addToOutfit }) {
  return (
    <>
      <h2>
        Build an ensemble
      </h2>
      <ItemCarousel>
        <AddToOutfitCard addToOutfit={addToOutfit} thisProductID={thisProductID} />
      </ItemCarousel>
    </>
  );
}
