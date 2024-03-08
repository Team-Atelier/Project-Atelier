/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetail from './productDetail/ProductDetail.jsx';
import Reviews from './reviews/Reviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

const url = process.env.API_URL;
const token = process.env.GITHUB_TOKEN;
const productId = 40346;

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

function App() {
  const [metadata, setMetadata] = useState();
  /*
  const rec = Number(metadata?.recommended?.true);
  const noRec = Number(metadata?.recommended?.false);
  const percentRecommend = 100 * (rec / (rec + noRec));
  const rate = metadata?.ratings && scaleRatings(metadata.ratings);
  let average = metadata?.ratings && computeAverage(rate);
  average = Math.round(average * 10) / 10;
  */

  const getMetadata = async () => {
    const data = await axios.get(`${url}reviews/meta`, {
      headers: { Authorization: token },
      params: {
        product_id: productId,
      },
    }).catch((err) => console.log(err));
    return data;
  };
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

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>

      <div>
        <h1>Project Atelier</h1>
        <button onClick={(() => { console.log(metadata); })}>Debug</button>
      </div>
      <ProductDetail scrollToReviews={scrollToReviews} />
      <RelatedItems />

      <div id="reviews-section">
        <Reviews metadata={metadata} />
      </div>
    </>
  );
}

export default App;
