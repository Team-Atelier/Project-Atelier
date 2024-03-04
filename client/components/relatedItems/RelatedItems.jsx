import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx'
import YourOutfitList from './YourOutfitList.jsx'

const RelatedItems = function RelatedItems() {
  const apiURL = process.env.API_URL;
  const token = process.env.GITHUB_TOKEN;
  // TO-DO: TO BE GRABBED FROM INITIAL GET REQUEST
  const productID = 40345;
  const [relatedProducts, setRelatedProducts] = useState([]);

  // FUNCTIONS FOR INITIAL RENDERING
  const getRelatedProductInfo = async (relatedProductIDs) => {
    const relatedProductsInfo = [];
    await Promise.all(relatedProductIDs.map((id) => axios.get(`${apiURL}products/${id}`, {
      headers: { Authorization: token },
    })))
      .then((results) => results.forEach((result) => {
        relatedProductsInfo.push(result.data);
        console.log('here is what i want', relatedProductsInfo);
      }))
      .then(() => {
        setRelatedProducts(relatedProductsInfo);
      })
      .catch((err) => console.log(err));
  };

  const getRelatedProducts = (productData) => {
    axios.get(`${apiURL}products/${productData.id}/related`, {
      headers: { Authorization: token },
    })
      .then((results) => getRelatedProductInfo(results.data))
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

// () => {
//
//     .then((productResult) => {
//       setCurrentProduct(productResult.data);
//       axios.get(`${apiURL}products/${productResult.data.id}/related`, {
//         headers: { Authorization: token },
//       })
//         .then(async (relatedResult) => {
//           setRelatedProductIDs(relatedResult.data);
//           const results = await Promise.all(relatedResult.data.map((id) => {
//             return axios.get(`${apiURL}products/${id}`, {
//             headers: { Authorization: token },
//           })
//         }));
//           results.forEach((result) => setRelatedProductsInfo(relatedProductsInfo.concat(result.data)))
//         });
//     })
//     .catch((error) => console.log(error));
// }