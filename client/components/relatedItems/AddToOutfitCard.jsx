/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { IconContext } from 'react-icons';

const AddToOutfitCard = function AddToOutfitCard({ setOutfitList, outfitList, thisProductID }) {
  const addToOutfit = () => {
    if (!outfitList.includes(thisProductID)) {
      setOutfitList(outfitList.concat(thisProductID));
    }
  };

  return (
    <div onClick={addToOutfit} onKeyPress={addToOutfit} role="button" tabIndex="0">
      <h3>Add to Outfit</h3>
      <IconContext.Provider value={{ size: '7em' }}>
        <FiPlus />
      </IconContext.Provider>
    </div>
  );
};

export default AddToOutfitCard;
