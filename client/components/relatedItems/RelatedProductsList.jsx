import React from 'react';
import ProductCard from './RelatedProductCard.jsx'

const RelatedProductsList = () => (
  <div>
    {/* This will eventually be a function that renders RelatedProductCard child components based on the API call */}
    <ProductCard />
  </div>
)

export default RelatedProductsList;