import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx'
import YourOutfitList from './YourOutfitList.jsx'

const RelatedItems = () => {

  const apiURL = process.env.API_URL;
  const token = process.env.GITHUB_TOKEN;
  // TO-DO: TO BE GRABBED FROM INITIAL GET REQUEST
  const [currentProduct, setCurrentProduct] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    // TO-DO: Update URL to change dynmically based on what product we're on
    axios.get(apiURL + 'products/40346', {
      headers: {'Authorization': token}
    })
      .then((result) => {
        console.log('Product stuff', result.data);
        setCurrentProduct(result.data);
        axios.get(apiURL + `products/${result.data.id}/related`, {
          headers: {'Authorization': token}
        })
          .then((result) => setRelatedProducts(result.data))
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  }, [])


  return (
    <div>
      <h2>You might like...<hr></hr></h2>
      <div className="relatedProductsList">
        <RelatedProductsList/>
      </div>
      <h2>Build an ensemble<hr></hr></h2>
      <div className="yourOutfitList">
        <YourOutfitList />
      </div>
    </div>
  )

}

export default RelatedItems;