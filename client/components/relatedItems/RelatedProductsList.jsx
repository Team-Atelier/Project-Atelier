/* eslint-disable react/jsx-boolean-value */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import ProductCard from './ProductCard.jsx';

export default function RelatedProductsList({ relatedProducts }) {
  return (
    <>
      <h2>
        You might like...
      </h2>
      <ItemCarousel>
        {relatedProducts ? relatedProducts.map((product) => <ProductCard category={product.category} name={product.name} price={product.default_price} key={product.id} id={product.id} relatedProduct={true} />) : null}
      </ItemCarousel>
    </>
  );
}
