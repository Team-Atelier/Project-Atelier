import React from 'react';
import ProductDetail from './ProductDetail.jsx';
import Reviews from './Reviews.jsx';
import RelatedItems from './RelatedItems.jsx';

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