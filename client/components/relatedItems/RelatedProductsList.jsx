/* eslint-disable react/jsx-boolean-value */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ItemCarousel from './ItemCarousel.jsx';
import ProductCard from './ProductCard.jsx';
import CompareProductsModal from './CompareProductsModal.jsx';

export default function RelatedProductsList({ relatedProducts, thisProduct }) {
  const [showModal, setShowModal] = useState(false);
  const [comparisonProduct, setComparisonProduct] = useState({});

  const handleModalOpen = (productInfo) => {
    setShowModal(!showModal);
    setComparisonProduct(productInfo);
  };

  const handleModalClose = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <h2>
        You might like...
      </h2>
      {showModal ? <CompareProductsModal handleModalClose={handleModalClose} comparisonProduct={comparisonProduct} thisProduct={thisProduct} /> : null}
      <ItemCarousel>
        {relatedProducts ? relatedProducts.map((product) => <ProductCard comparisonProduct={product} category={product.category} name={product.name} price={product.default_price} key={product.id} id={product.id} relatedProduct={true} handleModalOpen={handleModalOpen} />) : null}
      </ItemCarousel>
    </>
  );
}
