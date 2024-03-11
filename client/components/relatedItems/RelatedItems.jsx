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

  console.log('relatedprodcuts', relatedProducts);
  console.log('storedoutfit', storedOutfit);
  console.log('outfitinfo', outfitInfo);

  // FUNCTIONS FOR INITIAL RENDERING

  const getProductInfo = async (ProductIDs, typeOfList) => {
    console.log('productIDs are here:', ProductIDs);
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

  const getRelatedProducts = (id) => {
    axios.get(`${apiURL}products/${id}/related`, {
      headers: { Authorization: token },
    })
      .then((results) => {
        getProductInfo(results.data, 'relatedProducts');
      })
      .catch((err) => console.log(err));
  };

  // ADDING AND REMOVING FROM OUTFITS
  const outfits = JSON.parse(localStorage.getItem('outfit'));

  const addToOutfit = (ID) => {
    console.log('here is ID', ID);
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
    getRelatedProducts(currentProductData.id);
  }, [currentProductData.id]);

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
      <div className="relatedProductsList">
        <RelatedProductsList relatedProducts={relatedProducts} thisProduct={currentProductData} handleProductChange={handleProductChange} scaleRatings={scaleRatings} computeAverage={computeAverage} />
      </div>
      <div className="yourOutfitList">
        <YourOutfitList currentProductID={currentProductID} storedOutfit={storedOutfit} addToOutfit={addToOutfit} removeFromOutfit={removeFromOutfit} outfitInfo={outfitInfo} handleProductChange={handleProductChange} scaleRatings={scaleRatings} computeAverage={computeAverage} />
      </div>
    </RelatedItemsDiv>
  );
}
