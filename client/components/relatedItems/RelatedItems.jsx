import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx'
import YourOutfitList from './YourOutfitList.jsx'

const RelatedItems = function RealtedItems() {
  const apiURL = process.env.API_URL;
  const token = process.env.GITHUB_TOKEN;
  // TO-DO: TO BE GRABBED FROM INITIAL GET REQUEST
  const [currentProduct, setCurrentProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios.get(`${apiURL}products/40345`, {
      headers: { Authorization: token },
    })
      .then((productResult) => {
        setCurrentProduct(productResult.data);
        axios.get(`${apiURL}products/${productResult.data.id}/related`, {
          headers: { Authorization: token },
        })
          .then((result) => setRelatedProducts(result.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>
        You might like...
        <hr />
      </h2>
      <div className="relatedProductsList">
        <RelatedProductsList />
      </div>
      <h2>
        Build an ensemble
        <hr />
      </h2>
      <div className="yourOutfitList">
        <YourOutfitList />
      </div>
    </div>
  );
};

export default RelatedItems;
