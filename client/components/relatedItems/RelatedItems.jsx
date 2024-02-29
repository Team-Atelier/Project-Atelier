import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx'
import YourOutfitList from './YourOutfitList.jsx'

const RelatedItems = () => {

  return (
    <div>
      <div className="relatedProductsList">
        <RelatedProductsList />
      </div>
      <div className="yourOutfitList">
        <YourOutfitList />
      </div>
    </div>
  )

}

export default RelatedItems;