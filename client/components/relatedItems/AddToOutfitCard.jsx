/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import styled from 'styled-components';

const OutfitCard = styled.div`
  border: solid;
  text-align: center;
  min-width: 33.33%;
  min-height: 100%;
  position: relative;
`;

export default function AddToOutfitCard({ setOutfitList, outfitList, thisProductID }) {
  const addToOutfit = () => {
    if (!outfitList.includes(thisProductID)) {
      setOutfitList(outfitList.concat(thisProductID));
    }
  };

  return (
    <OutfitCard onClick={addToOutfit} onKeyPress={addToOutfit} role="button" tabIndex="0">
      <h3>Add to Outfit</h3>
      <IconContext.Provider value={{ size: '7em' }}>
        <FiPlus />
      </IconContext.Provider>
    </OutfitCard>
  );
}
