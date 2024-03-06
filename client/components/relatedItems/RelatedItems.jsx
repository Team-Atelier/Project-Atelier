/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

export default function RelatedItems() {
  const apiURL = process.env.API_URL;
  const token = process.env.GITHUB_TOKEN;
  // TO-DO: TO BE GRABBED FROM INITIAL GET REQUEST
  const productID = 40348;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [storedOutfit, setStoredOutfit] = useState([]);
  const [outfitInfo, setOutfitInfo] = useState([]);

  // FUNCTIONS FOR INITIAL RENDERING

  const getProductInfo = async (ProductIDs, list) => {
    const results = await Promise.all(ProductIDs.map((id) => axios.get(`${apiURL}products/${id}`, {
      headers: { Authorization: token },
    })));
    const typeOfList = list;
    if (typeOfList === 'relatedProducts') {
      setRelatedProducts(results.map((product) => product.data));
    }
    if (typeOfList === 'yourOutfit') {
      setOutfitInfo(results.map((product) => product.data));
    }
  };

  const getRelatedProducts = (productData) => {
    axios.get(`${apiURL}products/${productData.id}/related`, {
      headers: { Authorization: token },
    })
      .then((results) => getProductInfo(results.data, 'relatedProducts'))
      .catch((err) => console.log(err));
  };

  const getCurrentProduct = () => {
    axios.get(`${apiURL}products/${productID}`, {
      headers: { Authorization: token },
    })
      .then((results) => getRelatedProducts(results.data))
      .catch((err) => console.log(err));
  };

  const addToOutfit = async (ID) => {
    const outfits = await JSON.parse(localStorage.getItem('outfit'));
    if (!outfits.includes(ID)) {
      localStorage.setItem('outfit', JSON.stringify(outfits.concat(ID)));
      setStoredOutfit(outfits.concat(ID));
    }
  };

  useEffect(() => {
    getCurrentProduct();
  }, []);

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
    <div>
      <div className="relatedProductsList">
        <RelatedProductsList relatedProducts={relatedProducts} />
      </div>
      <div className="yourOutfitList">
        <YourOutfitList thisProductID={productID} storedOutfit={storedOutfit} addToOutfit={addToOutfit} outfitInfo={outfitInfo} />
      </div>
    </div>
  );
}
