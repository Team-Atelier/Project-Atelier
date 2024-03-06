/* eslint-disable react/jsx-boolean-value */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import ProductCard from './ProductCard.jsx';
import CompareProductsModal from './CompareProductsModal.jsx';

export default function RelatedProductsList({ relatedProducts }) {
  const modal = document.getElementById('modal');
  const handleModalOpen = () => {
    modal.style.display = 'block';
  };

  const handleModalClose = () => {
    modal.style.display = 'none';
  };
  return (
    <>
      <h2>
        You might like...
      </h2>
      <ItemCarousel>
        <CompareProductsModal handleModalClose={handleModalClose} />
        {relatedProducts ? relatedProducts.map((product) => <ProductCard category={product.category} name={product.name} price={product.default_price} key={product.id} id={product.id} relatedProduct={true} handleModalOpen={handleModalOpen} />) : null}
      </ItemCarousel>
    </>
  );
}
