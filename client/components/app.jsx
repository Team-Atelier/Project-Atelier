/* eslint-disable import/extensions */
import React from 'react';
import ProductDetail from './productDetail/ProductDetail.jsx';
import Reviews from './reviews/Reviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

function App() {
  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div>
        <h1>Project Atelier</h1>
      </div>
      <ProductDetail scrollToReviews={scrollToReviews} />
      <RelatedItems />
      <div id="reviews-section">
        <Reviews />
      </div>
    </>
  );
}

export default App;
