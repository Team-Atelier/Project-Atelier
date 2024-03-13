/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ExperienceTable from './ExperienceTable.jsx';
import AddReviewStarRating from './AddReviewStarRating.jsx';

const url = process.env.API_URL;
const token = process.env.GITHUB_TOKEN;

const FlexRow = styled.div`
  word-wrap: break-word;
  display: flex;
  justify-content: space-between;
  background: white;
`;
const ImageRow = styled(FlexRow)`
justify-content: left;
`;

const Image = styled.img`
  width:  100px;
  height: 100px;
  object-fit: cover;
  padding: 5px
`;

/*
  const data = await axios.get(`${url}reviews/meta`, {
    headers: { Authorization: token },
    params: {
      product_id: productId,
    },
  })
*/
const postReview = (reviewInfo) => axios.post('/api/reviews', reviewInfo);

function AddReviews({
  newReviewData, metadata, handleNewReviewChange, resetImages, reloadReviews, numReviewsAdded,
}) {
  const validReview = () => {
    const mandatoryFields = ['rating', 'summary', 'body', 'recommend', 'name', 'email'];
    // eslint-disable-next-line no-restricted-syntax
    const result = mandatoryFields.every((item) => {
      if (newReviewData[item] === undefined) {
        alert(`A mandatory text field ${item} is not defined.`);
        return false;
      }
      if (newReviewData[item] === '') {
        alert(`A mandatory text field ${item} is ''.`);
        return false;
      }
      return true;
    });
    if (result === false) {
      return false;
    }
    // Other aspects have been resolved as those text boxes have character limits.
    if (newReviewData.body.length <= 50) {
      alert('Review body has not met minimum length');
      return false;
    }
    // eslint-disable-next-line no-useless-escape
    const emailRegEx = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;

    if (emailRegEx.test(newReviewData.email) === false) {
      alert('Failed email format validation');
      return false;
    }

    const validCharacteristics = Object.keys(metadata?.characteristics)?.length
    === Object.keys(newReviewData.characteristics).length;
    if (validCharacteristics === false) {
      alert('Please ensure all characteristics are checked');
      return false;
    }

    return true;
  };
  return (
    <>
      <div>
        <label>
          Nickname:
          <br />
          <input
            name="name"
            maxLength="60"
            value={newReviewData.name || ''}
            placeholder="Example: jackson11!"
            style={{ width: '300px' }}
            onChange={(e) => { handleNewReviewChange(e); }}
          />
          <br />
          For privacy reasons, do not use your full name or email address
          <br />
          {newReviewData.name ? `${(60 - (newReviewData.name.length))} characters remaining` : ''}
        </label>
      </div>
      <br />
      <div>
        <label>
          Email:
          <br />
          <input
            name="email"
            maxLength="60"
            value={newReviewData.email || ''}
            placeholder="Example: jackson11@email.com"
            style={{ width: '300px' }}
            onChange={(e) => { handleNewReviewChange(e); }}
          />
          <br />
          For authentication reasons, you will not be emailed
        </label>
      </div>
      <br />
      <div>
        <label>
          Your rating:
          <br />
          <div data-testid="star-element">
            <AddReviewStarRating
              newReviewData={newReviewData}
              handleNewReviewChange={handleNewReviewChange}
              numReviewsAdded={numReviewsAdded}
            />
          </div>
        </label>
      </div>
      <br />
      <div>
        <label>
          Do you recommend this product?
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="recommend"
            value={true}
            checked={newReviewData.recommend === 'true'}
            onChange={(e) => {
              handleNewReviewChange(e);
            }}
          />
          Yes
        </label>
        <label>
          <input type="radio" name="recommend" value={false} checked={newReviewData.recommend === 'false'} onChange={(e) => { handleNewReviewChange(e); }} />
          No
        </label>
      </div>
      <br />
      <div>
        <label>
          Review summary:
          <br />
          <input
            name="summary"
            maxLength="60"
            value={newReviewData.summary || ''}
            placeholder="Example: Best purchase ever!"
            style={{ width: '300px' }}
            onChange={(e) => { handleNewReviewChange(e); }}
          />
          <br />
          {newReviewData.summary ? `${(60 - (newReviewData.summary.length))} characters remaining` : ''}
        </label>
      </div>
      <br />
      <label>
        Your honest review:
        <br />
        <textarea
          name="body"
          maxLength="1000"
          value={newReviewData.body || ''}
          placeholder="Why did you like the product or not?"
          style={{ width: '90%' }}
          onChange={(e) => { handleNewReviewChange(e); }}
        />
        <br />
        {newReviewData.body && newReviewData.body.length >= 50 ? 'Minimum reached' : ''}
        {newReviewData.body && newReviewData.body.length < 50 ? `${50 - newReviewData.body.length} characters needed until 50 character minimum reached` : ''}
        <br />
        {newReviewData.body ? `${(1000 - (newReviewData.body.length))} characters remaining` : ''}
      </label>
      <br />
      <div>
        <ExperienceTable
          newReviewData={newReviewData}
          handleNewReviewChange={handleNewReviewChange}
          metadata={metadata}
        />
      </div>
      <br />
      <div>
        <label>
          Upload images of product: (Max 5 images.)
          <br />
          {
          (!newReviewData.photos || newReviewData.photos.length < 5)
          && (
            <form
              className="reviewimg"
              onSubmit={(e) => {
                e.preventDefault();
                handleNewReviewChange(e);
              }}
            >
              <label htmlFor="imgurl">Input image url: </label>
              <input id="imgurl" name="images" type="url" />
              <button type="submit"> Insert image</button>
            </form>
          )
          }
          {(newReviewData.photos && newReviewData.photos.length > 0)
          && (
          <button
            type="button"
            htmlFor="url"
            onClick={(e) => {
              e.preventDefault();
              resetImages();
            }}
          >
            Reset
          </button>
          )}
          <ImageRow>
            {newReviewData.photos && newReviewData.photos.map((imageURL) => (
              <Image
                onError={() => {
                  resetImages(true);
                  alert('Invalid image');
                }}
                src={imageURL}
                alt="user content"
              />
            ))}
          </ImageRow>
        </label>
      </div>
      <button
        type="button"
        onClick={() => {
          if (!validReview()) {
            alert('Invalid review, please ensure no fields are empty and character minimums are met.');
            return;
          }
          const review = { ...newReviewData };
          review.product_id = Number(metadata.product_id);
          review.recommend = review.recommend === 'true';
          postReview(review)
            .then(() => {
              reloadReviews();
              alert('Review submitted!');
              document.getElementById('reviewsScreen').style.display = 'none';
              const modal = document.getElementById('reviewsScreen');
              modal.style.display = 'none';
            })
            .catch((err) => (console.log(err)));
        }}
      >
        Submit review
      </button>
    </>
  );
}

export default AddReviews;
