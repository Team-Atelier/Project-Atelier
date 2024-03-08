/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import styled from 'styled-components';

const OutfitCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 20%;
  min-height: 100%;
  line-height: 100%;
  position: relative;
  cursor: pointer;
`;

export default function AddToOutfitCard({ thisProductID, addToOutfit }) {
  return (
    <OutfitCard onClick={() => addToOutfit(thisProductID)} role="button" tabIndex="0">
      <h3>Add to Outfit</h3>
      <IconContext.Provider value={{ size: '7em' }}>
        <FiPlus />
      </IconContext.Provider>
    </OutfitCard>
  );
}
