/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BsStarFill } from 'react-icons/bs';
import { TfiClose } from 'react-icons/tfi';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 20%;
  max-width: 20%;
  position: relative;
  cursor: pointer;
  border-style: solid;
  border-color: #ffffff;
  border-width: thick;
`;
// To-do: Add a more description button name
const ActionButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
`;

const CardClick = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 85%;
  object-fit: cover;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
`;

const TextContainer = styled.div`
  background-color: white;
  z-index: 1;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15;
  overflow: hidden;
  padding-top: 5px;
  p {
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 5px;
    padding: 0;
    font-size: 14px;
  }
  border-style: solid;
  border-top: #00000;
  border-left: #ffffff;
  border-right: #ffffff;
  border-width: thin medium;
`;

// eslint-disable-next-line object-curly-newline
export default function ProductCard({ category, name, id, relatedProduct, handleModalOpen, comparisonProduct, removeFromOutfit, handleProductChange }) {
  const apiURL = process.env.API_URL;
  const token = process.env.GITHUB_TOKEN;
  const [productPhoto, setProductPhoto] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [ratings, setRatings] = useState({});

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

  useEffect(() => {
    axios.get(`${apiURL}reviews/meta?product_id=${id}`, {
      headers: { Authorization: token },
    })
      .then((results) => {
        setRatings(results.data.ratings);
      });
  }, [id]);

  return (
    <Card>
      {relatedProduct ? <ActionButton onClick={() => handleModalOpen(comparisonProduct)}><BsStarFill /></ActionButton> : <ActionButton onClick={() => removeFromOutfit(id)}><TfiClose /></ActionButton> }
      <CardClick onClick={() => handleProductChange(id)} onKeyPress={() => handleProductChange(id)} role="button" tabIndex={0}>
        <ImageContainer>
          <ProductImage
            src={productPhoto}
            alt=""
          />
        </ImageContainer>
        <TextContainer>
          <p>{name}</p>
          <p>{category}</p>
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
        </TextContainer>
      </CardClick>
    </Card>
  );
}
