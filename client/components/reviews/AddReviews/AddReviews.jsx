/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import ExperienceTable from './ExperienceTable.jsx';
import AddReviewStarRating from './AddReviewStarRating.jsx';

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

function AddReviews({ newReviewData, metadata, handleNewReviewChange, resetImages }) {
  return (
    <>
      <div>
        Nickname:
        <br />
        <input name="username" maxLength="60" value={newReviewData.name} onChange={(e) => { handleNewReviewChange(e); }} />
        <br />
        For privacy reasons, do not use your full name or email address
        {newReviewData.summary ? `${(30 - (newReviewData.summary.length))} characters remaining` : ''}
      </div>
      <br />
      <div>
        Email:
        <br />
        <input name="email" maxLength="60" value={newReviewData.name} onChange={(e) => { handleNewReviewChange(e); }} />
        <br />
        For authentication reasons, you will not be emailed
      </div>
      <br />
      <div>
        Your rating:
        <br />
        <AddReviewStarRating
          newReviewData={newReviewData}
          handleNewReviewChange={handleNewReviewChange}
        />
      </div>
      <br />
      <div>
        Do you recommend this product?
        <br />
        <label>
          <input type="radio" name="recommend" value={true} checked={newReviewData.name} onChange={(e) => { handleNewReviewChange(e); }} />
          Yes
        </label>
        <label>
          <input type="radio" name="recommend" value={false} checked={newReviewData.name} onChange={(e) => { handleNewReviewChange(e); }} />
          No
        </label>
      </div>
      <br />
      <div>
        Review summary:
        <br />
        <input name="summary" maxLength="60" value={newReviewData.name} onChange={(e) => { handleNewReviewChange(e); }} />
        <br />
        {newReviewData.summary ? `${(60 - (newReviewData.summary.length))} characters remaining` : ''}
      </div>
      <br />
      <div>
        Your honest review:
        <br />
        <textarea name="body" maxLength="1000" value={newReviewData.name} onChange={(e) => { handleNewReviewChange(e); }} />
        <br />
        {newReviewData.body && newReviewData.body.length >= 50 ? 'Minimim reached' : ''}
        {newReviewData.body && newReviewData.body.length < 50 ? `${50 - newReviewData.body.length} characters needed until 50 character minimum reached` : ''}
        <br />
        {newReviewData.body ? `${(1000 - (newReviewData.body.length))} characters remaining` : ''}
      </div>
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
          (!newReviewData.images || newReviewData.images.length < 2)
          && (
            <input id="upload" name="images" type="file" accept="image/*" value={newReviewData.name} onChange={(e) => { handleNewReviewChange(e); }} />
          )
          }
          {(newReviewData.images && newReviewData.images.length > 0)
          && (
          <button
            type="button"
            htmlFor="upload"
            onClick={(e) => {
              e.preventDefault();
              resetImages();
            }}
          >
            reset
          </button>
          )}
          <ImageRow>
            {newReviewData.images && newReviewData.images.map((image) => <Image src={image} alt="user content" />)}
          </ImageRow>
        </label>
      </div>
    </>
  );
}

export default AddReviews;
