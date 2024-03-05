/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import ExperienceTable from './ExperienceTable.jsx';
import AddReviewStarRating from './AddReviewStarRating.jsx';

function AddReviews({ newReviewData, handleNewReviewChange, resetImages }) {
  return (
    <>
      <div>
        Your rating:
        <br />
        <AddReviewStarRating
          newReviewData={newReviewData}
          handleNewReviewChange={handleNewReviewChange}
        />
      </div>
      <div>
        Do you recommend this product?
        <br />
        <label htmlFor="myRadio">
          <input type="radio" name="recommend" value={true} checked={newReviewData.name} onChange={(e) => { handleNewReviewChange(e); }} />
          Yes
        </label>
        <label htmlFor="myRadio">
          <input type="radio" name="recommend" value={false} checked={newReviewData.name} onChange={(e) => { handleNewReviewChange(e); }} />
          No
        </label>
      </div>

      <div>
        Review summary:
        <br />
        <input name="summary" maxLength="60" value={newReviewData.name} onChange={(e) => { handleNewReviewChange(e); }} />
        <br />
        {newReviewData.summary ? `${(60 - (newReviewData.summary.length))} characters remaining` : ''}
      </div>

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
      <div>
        <ExperienceTable
          newReviewData={newReviewData}
          handleNewReviewChange={handleNewReviewChange}
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
          {newReviewData.images && newReviewData.images.map((image) => <img src={image} alt="user content" />)}
        </label>

      </div>

    </>
  );
}

export default AddReviews;
