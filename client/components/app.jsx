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
      <div><ProductDetail /></div>
      <div><RelatedItems /></div>
      <div><Reviews /></div>
    </>
  );
}

export default App;
