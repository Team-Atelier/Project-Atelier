/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BsStarFill } from 'react-icons/bs';
import { TfiClose } from 'react-icons/tfi';

const Card = styled.div`
  border: solid;
  text-align: center;
  min-width: 33.33%;
  min-height: 100%;
  position: relative;
`;
// To-do: Add a more description button name
const ActionButton = styled.button`
  position: absolute;
  right: 0px;
`;

const ProductImage = styled.img`
  max-height: 50%;
  max-width: 50%;
`;

// eslint-disable-next-line object-curly-newline
export default function ProductCard({ category, name, id, relatedProduct, handleModalOpen, comparisonProduct, removeFromOutfit, handleProductChange }) {
  const apiURL = process.env.API_URL;
  const token = process.env.GITHUB_TOKEN;
  const [productPhoto, setProductPhoto] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');

  // FUNCTION FOR RENDERING PHOTOS
  useEffect(() => {
    if (id !== undefined) {
      axios.get(`${apiURL}products/${id}/styles`, {
        headers: { Authorization: token },
      })
        .then((results) => {
          const styles = results.data.results;
          const defaultStyle = styles.filter((product) => product['default?'] === true)[0] || styles[0];
          setProductPhoto(defaultStyle.photos[0].url);
          setSalePrice(defaultStyle.sale_price);
          setOriginalPrice(defaultStyle.original_price);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <Card onClick={() => handleProductChange(id)}>
      {relatedProduct ? <ActionButton onClick={() => handleModalOpen(comparisonProduct)}><BsStarFill /></ActionButton> : <ActionButton onClick={() => removeFromOutfit(id)}><TfiClose /></ActionButton> }
      <p>{category}</p>
      <h3>{name}</h3>
      <ProductImage
        src={productPhoto}
        alt=""
      />
      {salePrice ? (
        <>
          <p style={{ color: 'red' }}>
            $
            {salePrice}
          </p>
          <s>
            $
            {originalPrice}
          </s>
        </>
      ) : (
        <p>
          $
          {originalPrice}
        </p>
      )}
      <p>Star Rating: </p>
    </Card>
  );
}
