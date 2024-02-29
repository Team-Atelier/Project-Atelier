import React from 'react';
import ProductCard from './ProductCard.jsx';
import ItemCarousel from './ItemCarousel.jsx';

const RelatedProductsList = () => (
  <div>
    {/* This will eventually be a function that renders RelatedProductCard child components based on the API call */}
    <ProductCard />
  </div>
)

export default RelatedProductsList;