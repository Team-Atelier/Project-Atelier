import React from 'react';
import ProductDetail from './productDetail/ProductDetail.jsx';
import Reviews from './reviews/Reviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

const App = () => {
  return (
    <>
      <div>
        <h1>Project Atelier</h1>
      </div>
        <ProductDetail />
        <Reviews />
        <RelatedItems />
    </>
  )
}

export default App;