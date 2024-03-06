import React from 'react';
import ProductDetail from './productDetail/ProductDetail.jsx';
import Reviews from './reviews/Reviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

function App() {
  return (
    <>
      <div>
        <h1>Project Atelier</h1>
      </div>
        <ProductDetail />
        <RelatedItems />
        <Reviews />
    </>
  );
}

export default App;
