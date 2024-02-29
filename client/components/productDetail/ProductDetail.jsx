import React from 'react';
import PhotoSection from './PhotoSection.jsx';
import InfoSection from './InfoSection.jsx';
import Description from './Description.jsx';
const { useState, useEffect } = React;

const ProductDetail = () => {

  return (
    <div className="product-detail">
      <div className="product-container">
        <div className="photo-section">
          <PhotoSection />
        </div>
        <div className="info-section">
          <InfoSection />
        </div>
      </div>
      <div className="description-container">
        <Description />
      </div>
    </div>
  )
}

export default ProductDetail;