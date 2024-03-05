/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import ProductCard from './ProductCard.jsx';

function RelatedProductsList({ relatedProducts }) {
  return (
    <ItemCarousel>
      {relatedProducts ? relatedProducts.map((product) => <ProductCard category={product.category} name={product.name} price={product.default_price} key={product.id} id={product.id} />) : null}
    </ItemCarousel>
  );
}

export default RelatedProductsList;
