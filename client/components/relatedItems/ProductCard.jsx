/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Card = styled.div`
  border: solid;
  text-align: center;
  min-width: 33.33%;
  height: 100%;
  position: relative;
`;
// To-do: Add a more description button name
const ActionButton = styled.button`
  position: absolute;
  right: 0px;
`;

// eslint-disable-next-line object-curly-newline
const ProductCard = function ProductCard({ category, name, price, id }) {
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
          console.log(id, results.data.results);
          const styles = results.data.results;
          for (let i = 0; i < styles.length; i += 1) {
            if (styles[i]['default?']) {
              setProductPhoto(styles[i].photos[0].url);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <Card>
      <ActionButton>Action</ActionButton>
      <p>{category}</p>
      <h3>{name}</h3>
      <img
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
};

export default ProductCard;
