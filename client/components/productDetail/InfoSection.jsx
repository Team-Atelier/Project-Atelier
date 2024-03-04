/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ThumbnailOverlay from './ThumbnailOverlay.jsx';

const { useState, useEffect } = React;

const InfoSectionContainer = styled.div`
  width: 40%;
  padding: 20px;
`;

const StarRating = styled.div`
  font-size: 14px;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
`;

const ProductCategory = styled.p`
  font-size: 18px;
`;

const ProductPrice = styled.div`
  font-size: 18px;
`;

const SalePrice = styled.p`
  font-size: 18px;
  color: red;
`;

const OriginalPrice = styled.p`
  font-size: 18px;
  color: black;
`;

const OriginalPriceSale = styled.p`
  font-size: 18px;
  text-decoration: line-through;
  color: black;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SelectedStyle = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const SelectSizeContent = styled.div`
  position: relative;
  box-shadow: 0px 8px 16p 0px rgba(0,0,0,0.2);
  z-index: 1;
  margin-top: 0px;
  margin-left: 10px;
  width: 200px;
  float: left;
`;

const SelectQuantityContent = styled.div`
  position: relative;
  box-shadow: 0px 8px 16p 0px rgba(0,0,0,0.2);
  z-index: 1;
  margin-top: 0px;
  margin-left: 10px;
  width: 45%;
  float: right;
`;

const Select = styled.select`
  width: 200px;
  font-size: 16px;
  padding: 8px;
`;

const CartContainer = styled.div`
  position: relative;
  display: flex;
  box-shadow: 0px 8px 16p 0px rgba(0,0,0,0.2);
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
  justify-content: space-between;
  width: 200px;
`;

const AddButton = styled.button`
  position: relative;
  width: 200px;
  font-size: 16px;
  padding: 8px;
`;

// eslint-disable-next-line react/prop-types
function InfoSection({ productId, onStyleSelect }) {
  const [infoSectionProduct, setInfoSectionProduct] = useState([]);
  const [productStyle, setProductStyle] = useState([]);
  const [selectedStyleId, setSelectedStyleId] = useState(null);
  const [styleName, setStyleName] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const apiURL = process.env.API_URL;
  const token = process.env.GITHUB_TOKEN;

  useEffect(() => {
    axios.get(`${apiURL}products/${productId}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setInfoSectionProduct(response.data);
      })
      .catch((err) => {
        console.error('Error retrieving product information for InfoSection component:', err);
      })
      .then(() => {
        axios.get(`${apiURL}products/${productId}/styles`, {
          headers: {
            Authorization: token,
          },
        })
          .then((response) => {
            console.log('infoSection response data: ', response.data.results);
            setProductStyle(response.data.results);
            if (response.data.results.length > 0) {
              onStyleSelect(response.data.results[0].style_id);
              setSelectedStyleId(response.data.results[0].style_id);
              setStyleName(response.data.results[0].name);
              setOriginalPrice(response.data.results[0].original_price);
              if (response.data.results[0].sale_price !== null) {
                setSalePrice(response.data.results[0].sale_price);
              }
            }
          })
          .catch((err) => {
            console.error('Error retrieving product styles:', err);
          });
      });
  }, []);

  // eslint-disable-next-line no-shadow
  const handleStyleSelect = (styleId, styleName, stylePrice, styleSalePrice) => {
    if (styleId !== selectedStyleId) {
      onStyleSelect(styleId);
      setSelectedStyleId(styleId);
      setStyleName(styleName);
      setOriginalPrice(stylePrice);
      setSalePrice(styleSalePrice);
      setSelectedSize('');
      setSelectedQuantity(1);
    }
  };

  // eslint-disable-next-line max-len
  const sizeOptions = Object.values(productStyle.find((style) => style.style_id === selectedStyleId)?.skus || {})
    ?.filter((sku) => sku.quantity > 0)
    ?.map((sku) => sku.size) || [];
  console.log('sizeOptions: ', sizeOptions);

  const maxQuantity = selectedSize
    ? Math.min(
      Object.values(productStyle.find((style) => style.style_id === selectedStyleId)?.skus)
        .find((sku) => sku.size === selectedSize)?.quantity || 0,
      15,
    )
    : 0;

  const quantityOptions = selectedSize ? Array.from({ length: maxQuantity }, (_, index) => index + 1) : ['-'];
  console.log('quantityOptions: ', quantityOptions);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSelectedQuantity(1);
  };

  const handleQuantitySelect = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleAddCart = () => {
    setSelectedSize('');
  };

  return (

    <InfoSectionContainer>
      <StarRating>(stars will go here) Read all reviews</StarRating>

      <ProductCategory>{infoSectionProduct.category}</ProductCategory>

      <ProductTitle>{infoSectionProduct.name}</ProductTitle>

      <ProductPrice>
        {salePrice !== null && (
          <>
            <SalePrice>
              $
              {salePrice}
            </SalePrice>
            <OriginalPriceSale>
              $
              {originalPrice}
            </OriginalPriceSale>
          </>
        )}
        {salePrice === null && (
          <OriginalPrice>
            $
            {originalPrice}
          </OriginalPrice>
        )}
      </ProductPrice>

      <SelectedStyle>
        Style:
        {' '}
        {styleName}
      </SelectedStyle>

      <ThumbnailContainer>
        {productStyle.map((style) => (
          <ThumbnailOverlay
            key={style.style_id}
            src={style.photos[0].thumbnail_url}
            alt={style.name}
            selected={selectedStyleId === style.style_id}
            onClick={() => handleStyleSelect(
              style.style_id,
              style.name,
              style.original_price,
              style.sale_price,
            )}
          />
        ))}
      </ThumbnailContainer>

      <DropdownContainer>
        <SelectSizeContent>

          <Select value={selectedSize || ''} onChange={(e) => handleSizeSelect(e.target.value)}>
            <option value="">Select Size:</option>
            {sizeOptions.length > 0 ? (
              sizeOptions.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))
            ) : (
              <option value="" disabled>OUT OF STOCK</option>
            )}
          </Select>
        </SelectSizeContent>

        <SelectQuantityContent>

          <Select
            value={selectedQuantity}
            onChange={(e) => handleQuantitySelect(Number(e.target.value))}
            disabled={!selectedSize}
          >
            {quantityOptions.map((quantity) => (
              <option key={quantity} value={quantity}>{quantity}</option>
            ))}
          </Select>
        </SelectQuantityContent>
      </DropdownContainer>

      <CartContainer>
        <AddButton onClick={handleAddCart}>
          Add To Cart
        </AddButton>
      </CartContainer>

    </InfoSectionContainer>
  );
}

export default InfoSection;
