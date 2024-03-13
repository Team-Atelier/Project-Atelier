/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */

/* Take rating and put it into a state. */
/* Move Metadata requests to app.jsx */

import React from 'react';
import styled from 'styled-components';
import PartiallyFilledBar from './PartiallyFilledBar.jsx';
import StarRating from './StarRating.jsx';
import CharacteristicRating from './CharacteristicRating.jsx';

const RatingRow = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%
  min-width: 4vw
`;

const RatingCard = styled.section`
  display: grid;
  width: 40%;
  margin-left: 4vw;
  margin-right: 4vw;
`;

function RatingRowElement({
  parentID, star, rate, handleRatingFilterClick, metadata,
  ratingFilter,
}) {
  const highlightColor = '#c9ffe5';
  const selectedColor = '#aaf0d1';

  return (
    <RatingRow
      id={parentID}
      onClick={() => {
        handleRatingFilterClick(star);
        if (!ratingFilter[star]) { document.getElementById(parentID).style.background = selectedColor; } else { document.getElementById(parentID).style.background = highlightColor; }
      }}
      onMouseEnter={() => {
        if (!ratingFilter[star]) { document.getElementById(parentID).style.background = highlightColor; }
      }}
      onMouseLeave={() => {
        !ratingFilter[star]
          ? document.getElementById(parentID).style.background = 'transparent'
          : document.getElementById(parentID).style.background = selectedColor;
      }}
    >
      <div>{`${star} star`} </div>
      <PartiallyFilledBar percentage={rate?.[star] * 100 || 100} />
      <div>{`(${metadata?.ratings?.[star]})`}</div>
    </RatingRow>
  );
}
function RatingBreakdown({ metadata, handleRatingFilterClick, ratingFilter }) {
  const filteringEnabled = Object.values(ratingFilter).some((filter) => (filter === true));
  return (
    <RatingCard>
      <h2>Ratings Breakdown:</h2>
      {filteringEnabled && `Review filtering enabled. Showing
      ${
        Object.keys(ratingFilter).reduce((ratingList, rating) => {
          if (ratingFilter[rating]) {
            return [...ratingList, rating];
          }
          return [...ratingList];
        }, []).join(', ')
      }
      star ratings.`}
      {filteringEnabled && (
      <button
        type="button"
        onClick={() => {
          handleRatingFilterClick(null, true);
          document.getElementById('one-star').style.background = 'transparent';
          document.getElementById('two-star').style.background = 'transparent';
          document.getElementById('three-star').style.background = 'transparent';
          document.getElementById('four-star').style.background = 'transparent';
          document.getElementById('five-star').style.background = 'transparent';
        }}
      >
        Reset filter
      </button>
      )}
      <div>
        <h1>
          <StarRating rating={metadata?.average || 0} />
          {' '}
          Rating:
          {' '}
          {Math.round(metadata?.average * 10) / 10}

        </h1>

      </div>
      <div>
        {metadata?.rec + metadata?.noRec} reviews
      </div>
      <div>
        {Math.round(metadata?.percentRecommend)}
        % of reviewers recommend this product
      </div>

      <RatingRowElement parentID="five-star" star={5} rate={metadata?.scaled} handleRatingFilterClick={handleRatingFilterClick} metadata={metadata} ratingFilter={ratingFilter} />
      <RatingRowElement parentID="four-star" star={4} rate={metadata?.scaled} handleRatingFilterClick={handleRatingFilterClick} metadata={metadata} ratingFilter={ratingFilter} />
      <RatingRowElement parentID="three-star" star={3} rate={metadata?.scaled} handleRatingFilterClick={handleRatingFilterClick} metadata={metadata} ratingFilter={ratingFilter} />
      <RatingRowElement parentID="two-star" star={2} rate={metadata?.scaled} handleRatingFilterClick={handleRatingFilterClick} metadata={metadata} ratingFilter={ratingFilter} />
      <RatingRowElement parentID="one-star" star={1} rate={metadata?.scaled} handleRatingFilterClick={handleRatingFilterClick} metadata={metadata} ratingFilter={ratingFilter} />

      {metadata?.characteristics && Object.keys(metadata?.characteristics).map((key) => (
        <CharacteristicRating
          key={metadata.characteristics[key].id}
          characteristic={key}
          rating={metadata.characteristics[key].value}
        />
      ))}
    </RatingCard>
  );
}
export default RatingBreakdown;
