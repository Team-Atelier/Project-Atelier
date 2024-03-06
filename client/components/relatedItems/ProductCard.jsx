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
export default function ProductCard({ category, name, price, id, relatedProduct }) {
  const apiURL = process.env.API_URL;
  const token = process.env.GITHUB_TOKEN;
  const [productPhoto, setProductPhoto] = useState('');

  // FUNCTION FOR RENDERING PHOTOS
  useEffect(() => {
    if (id !== undefined) {
      axios.get(`${apiURL}products/${id}/styles`, {
        headers: { Authorization: token },
      })
        .then((results) => {
          const styles = results.data.results;
          setProductPhoto(styles[0].photos[0].url);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <Card>
      {relatedProduct ? <ActionButton><BsStarFill /></ActionButton> : <ActionButton><TfiClose /></ActionButton> }
      <p>{category}</p>
      <h3>{name}</h3>
      <ProductImage
        src={productPhoto}
        alt=""
      />
      <p>
        $
        {price}
      </p>
      <p>Star Rating: </p>
    </Card>
  );
}
