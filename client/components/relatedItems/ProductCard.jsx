import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: solid;
  text-align: left;
  width: 200px;
  position: relative;
`
// To-do: Add a more description button name
const ActionButton = styled.button`
  position: absolute;
  right: 0px;
`

const ProductCard = () => (
  <Card>
    <ActionButton>Action</ActionButton>
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
  </Card>
)

export default ProductCard;