/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const ThumbnailContainer = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 75px;
  height: 75px;
  cursor: pointer;
  object-fit: cover;
`;

const CheckmarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckmarkIcon = styled.span`
  color: white;
  font-size: 24px;
`;

function ThumbnailOverlay({
  src, alt, selected, onClick,
}) {
  return (
    <ThumbnailContainer onClick={onClick}>
      <Thumbnail src={src} alt={alt} />
      {selected && (
      <CheckmarkOverlay>
        <CheckmarkIcon>&#10003;</CheckmarkIcon>
      </CheckmarkOverlay>
      )}
    </ThumbnailContainer>
  );
}

export default ThumbnailOverlay;
