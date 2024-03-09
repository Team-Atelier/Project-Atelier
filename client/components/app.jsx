/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductDetail from './productDetail/ProductDetail.jsx';
import Reviews from './reviews/Reviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

const url = process.env.API_URL;
const token = process.env.GITHUB_TOKEN;
// const productId = 40346;


const Title = styled.div`
  font-family: mate;
`;

function App() {
  const [metadata, setMetadata] = useState();
  const [currentProductData, setCurrentProductData] = useState({});
  const [currentProductID, setCurrentProductID] = useState(40346);
  /*
  const rec = Number(metadata?.recommended?.true);
  const noRec = Number(metadata?.recommended?.false);
  const percentRecommend = 100 * (rec / (rec + noRec));
  const rate = metadata?.ratings && scaleRatings(metadata.ratings);
  let average = metadata?.ratings && computeAverage(rate);
  average = Math.round(average * 10) / 10;
  */

  /* ----- Functions for grabbing review data and computing averges ----- */
  const getMetadata = async () => {
    const data = await axios.get(`${url}reviews/meta`, {
      headers: { Authorization: token },
      params: {
        product_id: currentProductID,
      },
    }).catch((err) => console.log(err));
    return data;
  };
  const scaleRatings = (ratings) => {
    const result = {};
    let sum = 0;
    Object.keys(ratings)?.forEach((key) => {
      sum += Number(ratings[key]);
    });
    Object.keys(ratings).forEach((key) => {
      result[key] = (Number(ratings[key]) / sum);
    });
    return result;
  };
  const computeAverage = (scaledRatings) => {
    let result = 0;
    Object?.keys(scaledRatings)?.forEach((key) => {
      result += Number(key) * Number(scaledRatings[key]);
    });
    return result;
  };

  /* ----- Rendering Initial State ----- */
  useEffect(() => {
    axios.get(`${url}products/${currentProductID}`, {
      headers: { Authorization: token },
    })
      .then((results) => {
        setCurrentProductData(results.data);
      });
  }, [currentProductID]);

  useEffect(() => {
    getMetadata()
      .then((res) => {
        const { data } = res;
        const meta = { ...res.data };
        console.log('the meta', meta);
        meta.rec = Number(data?.recommended?.true);
        meta.noRec = Number(data?.recommended?.false);
        meta.percentRecommend = 100 * (meta.rec / (meta.rec + meta.noRec));
        meta.scaled = scaleRatings(meta.ratings);
        meta.average = computeAverage(meta.scaled);
        setMetadata(meta);
      });
  }, []);

  /* ----- Function for user navigation ----- */
  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ----- Function for changing product ----- */
  const handleProductChange = (newID) => {
    setCurrentProductID(newID);
    console.log('hello');
  };

  return (
    <>

      <Title>
        <h1>Project Atelier</h1>
      </Title>
      <ProductDetail scrollToReviews={scrollToReviews} />
      <RelatedItems scaleRatings={scaleRatings} computeAverage={computeAverage} currentProductData={currentProductData} currentProductID={currentProductID} handleProductChange={handleProductChange} />

      <div id="reviews-section">
        <Reviews metadata={metadata} />
      </div>
    </>
  );
}

export default App;
