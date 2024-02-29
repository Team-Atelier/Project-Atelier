import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx'
import YourOutfitList from './YourOutfitList.jsx'
import ItemCarousel from './ItemCarousel.jsx'

const RelatedItems = () => {

  return (
    <div>
      <h2>You might like...<hr></hr></h2>
      <div className="relatedProductsList">
        <RelatedProductsList />
      </div>
      <h2>Build an ensemble<hr></hr></h2>
      <div className="yourOutfitList">
        <YourOutfitList />
      </div>
    </div>
  )

}

export default RelatedItems;