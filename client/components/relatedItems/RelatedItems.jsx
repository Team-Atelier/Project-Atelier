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
  const productID = 40345;
  const [relatedProducts, setRelatedProducts] = useState([]);

  // FUNCTIONS FOR INITIAL RENDERING

  const getProductInfo = async (ProductIDs, list) => {
    const results = await Promise.all(ProductIDs.map((id) => axios.get(`${apiURL}products/${id}`, {
      headers: { Authorization: token },
    })));
    const typeOfList = list;
    if (typeOfList === 'relatedProducts') {
      setRelatedProducts(results.map((product) => product.data));
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

  useEffect(() => {
    getCurrentProduct();
  }, []);

  return (
    <div>
      <h2>
        You might like...
      </h2>
      <div className="relatedProductsList">
        <RelatedProductsList relatedProducts={relatedProducts} />
      </div>
      <h2>
        Build an ensemble
      </h2>
      <div className="yourOutfitList">
        <YourOutfitList thisProductID={productID} />
      </div>
    </div>
  );
}
