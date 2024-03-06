/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import AddToOutfitCard from './AddToOutfitCard.jsx';
import ProductCard from './ProductCard.jsx';

export default function YourOutfitList({
  thisProductID, addToOutfit, storedOutfit, outfitInfo,
}) {
  return (
    <>
      <h2>
        Build an ensemble
      </h2>
      <ItemCarousel>
        <AddToOutfitCard addToOutfit={addToOutfit} thisProductID={thisProductID} />
        {storedOutfit
          ? outfitInfo.map((product) => <ProductCard category={product.category} name={product.name} price={product.default_price} key={product.id} id={product.id} />) : null}
      </ItemCarousel>
    </>
  );
}
