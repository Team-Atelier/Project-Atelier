import React from 'react';

const ProductCard = () => (
  <div className="relatedProductCard" style={{border: 'solid', width: "150px"}}>
    <p>Product Category</p>
    <h3>Product Name</h3>
    <img
      src="https://images.unsplash.com/photo-1628148061873-13b9340f763b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      width="100px"
      height="160px"
      alt="close up of very bushy sheep face"
    />
    <p>Price</p>
    <p>Star Rating: </p>
  </div>
)

export default ProductCard;