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
  height: 600px;
  min-width: 20%;
  max-width: 20%;
  position: relative;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  line-height: 100%;
`;

const OutfitCardContent = styled.div`
  position: absolute;
  top: 15%;
`;

export default function AddToOutfitCard({ thisProductID, addToOutfit }) {
  return (
    <OutfitCard onClick={() => addToOutfit(thisProductID)} role="button" aria-label="Add to Outfit" tabIndex="0">
      <OutfitCardContent>
        <h3>Add to Outfit</h3>
        <IconContext.Provider value={{ size: '7em' }}>
          <FiPlus />
        </IconContext.Provider>
      </OutfitCardContent>
    </OutfitCard>
  );
}
