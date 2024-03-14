/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BsStarFill } from 'react-icons/bs';
import { TfiClose } from 'react-icons/tfi';
import StarRating from '../reviews/StarRating.jsx';

const Card = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 550px;
  min-width: 20%;
  max-width: 20%;
  position: relative;
  cursor: pointer;
  border-right: thin solid #ccc;
  justify-content: center;
  border-left: 20px solid #ffffff;
`;
// To-do: Add a more description button name
const ActionButton = styled.button`
  position: absolute;
  top: 3px;
  right: 20px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: grey;
  margin: 3px;
`;

const CardClick = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 95%;
  height: 77%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  display: flex;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 3px;
`;

const TextContainer = styled.div`
  background-color: white;
  z-index: 2;
  position: absolute;
  bottom: 0;
  width: 95%;
  height: 20%;
  margin-top: 10px;
  overflow: hidden;
  padding-top: 5px;
  p {
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 5px;
    padding: 0;
    font-size: 14px;
  }
  border-top: thin solid #ccc;
`;

// eslint-disable-next-line object-curly-newline
export default function ProductCard({ category, name, id, relatedProduct, handleModalOpen, comparisonProduct, removeFromOutfit, handleProductChange, scaleRatings, computeAverage }) {
  const [productPhoto, setProductPhoto] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [rating, setRating] = useState([]);
  const [thisDefaultStyle, setThisDefaultStyle] = useState([])



  // FUNCTION FOR RENDERING PHOTOS
  useEffect(() => {
    if (id !== undefined) {
      axios.get(`/api/products/${id}/styles`)
        .then((results) => {
          const styles = results.data.results;
          const defaultStyle = styles.filter((product) => product['default?'] === true)[0] || styles[0];
          setThisDefaultStyle(defaultStyle);
          setProductPhoto(defaultStyle.photos[0].url);
          setSalePrice(defaultStyle.sale_price);
          setOriginalPrice(defaultStyle.original_price);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    axios.get(`/api/reviews/meta?product_id=${id}`)
      .then((results) => {
        const scaledRatings = scaleRatings(results.data.ratings);
        setRating([computeAverage(scaledRatings)]);
      });
  }, [id]);

  function handleSecondPhoto() {
    if (productPhoto !== null) {
      setProductPhoto(thisDefaultStyle.photos[1].url);
    }
  }

  function handleOriginalPhoto() {
    if (thisDefaultStyle.photos[0].url !== null) {
      setProductPhoto(thisDefaultStyle.photos[0].url);
    }
  }

  return (
    <Card className="product-card">
      {relatedProduct ? <ActionButton onClick={() => handleModalOpen(comparisonProduct)}><BsStarFill size={20} /></ActionButton> : <ActionButton onClick={() => removeFromOutfit(id)}><TfiClose size={20} /></ActionButton> }
      <CardClick onClick={() => handleProductChange(id)} onKeyPress={() => handleProductChange(id)} role="button" tabIndex={0} data-testid="productCardClickableDiv">
        <ImageContainer
          onMouseOver={() => handleSecondPhoto()}
          onMouseOut={() => handleOriginalPhoto()}
        >
          <ProductImage src={(productPhoto === null) ? 'https://snipboard.io/bUWB2H.jpg' : productPhoto} alt="" />
        </ImageContainer>
        <TextContainer>
          <p style={{ fontSize: 16 }}>{name}</p>
          <p style={{ fontVariant: 'small-caps' }}>{category}</p>
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
          <StarRating data-testid="star-rating" rating={rating || 0} />
        </TextContainer>
      </CardClick>
    </Card>
  );
}
