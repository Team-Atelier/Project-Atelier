/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

const RelatedItemsDiv = styled.div`
  font-family: mate;
`;

export default function RelatedItems({
  scaleRatings, computeAverage, currentProductData, currentProductID, handleProductChange,
}) {
  const apiURL = process.env.API_URL;
  const token = process.env.GITHUB_TOKEN;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [storedOutfit, setStoredOutfit] = useState([]);
  const [outfitInfo, setOutfitInfo] = useState([]);

  // FUNCTIONS FOR INITIAL RENDERING

  const getProductInfo = async (ProductIDs, typeOfList) => {
    const results = await Promise.all(ProductIDs.map((id) => axios.get(`${apiURL}products/${id}`, {
      headers: { Authorization: token },
    })));
    if (typeOfList === 'relatedProducts') {
      setRelatedProducts(results.map((product) => product.data));
    }
    if (typeOfList === 'yourOutfit') {
      setOutfitInfo(results.map((product) => product.data));
    }
  };

  const getRelatedProducts = async (id) => {
    try {
      if (id) {
        const results = await axios.get(`${apiURL}products/${id}/related`, {
          headers: { Authorization: token },
        });
        getProductInfo(results.data, 'relatedProducts');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ADDING AND REMOVING FROM OUTFITS
  const outfits = JSON.parse(localStorage.getItem('outfit'));

  const addToOutfit = (ID) => {
    if (!outfits.includes(ID)) {
      localStorage.setItem('outfit', JSON.stringify(outfits.concat(ID)));
      setStoredOutfit(outfits.concat(ID));
    }
  };
  const removeFromOutfit = (ID) => {
    const productRemoved = outfits.filter((outfitIDs) => outfitIDs !== ID);
    localStorage.setItem('outfit', JSON.stringify(productRemoved));
    setStoredOutfit(productRemoved);
  };

  // USE EFFECTS
  useEffect(() => {
    getRelatedProducts(currentProductID);
  }, [currentProductID]);

  useEffect(() => {
    if (localStorage.getItem('outfit') === null) {
      localStorage.setItem('outfit', JSON.stringify(storedOutfit));
    } else {
      const storage = JSON.parse(localStorage.getItem('outfit'));
      if (storage) {
        getProductInfo(storage, 'yourOutfit');
      }
    }
  }, [storedOutfit]);

  return (
    <RelatedItemsDiv>
      <div className="relatedProductsList" data-testid="relatedProductsList">
        <RelatedProductsList relatedProducts={relatedProducts} thisProduct={currentProductData} handleProductChange={handleProductChange} scaleRatings={scaleRatings} computeAverage={computeAverage} />
      </div>
      <div className="yourOutfitList" data-testid="yourOutfitList">
        <YourOutfitList currentProductID={currentProductID} storedOutfit={storedOutfit} addToOutfit={addToOutfit} removeFromOutfit={removeFromOutfit} outfitInfo={outfitInfo} handleProductChange={handleProductChange} scaleRatings={scaleRatings} computeAverage={computeAverage} />
      </div>
    </RelatedItemsDiv>
  );
}
