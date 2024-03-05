/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const { useState, useEffect, useRef } = React;

const PhotoSectionContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%
`;

const MainPhotoContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  overflow: hidden;
`;

const MainImage = styled.img`
  max-width: 100%;
  max-height: 500px;
`;

const ThumbnailContainerWrapper = styled.div`
  position: absolute;
  flex: 0 0 100px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 400px;
  margin-top: auto;
  margin-bottom: auto;
  left: 10px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: auto;
  margin-bottom: auto;
  overflow-y: auto;
  max-height: 370px;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: ${({ selected }) => (selected ? '2px solid blue' : 'none')};
  margin-bottom: 5px;
`;

const ScrollButtonTop = styled.button`
  position: relative;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  top: 2px;
`;

const ScrollButtonBottom = styled.button`
  position: relative;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  bottom: 2px;
`;

const LeftArrow = styled.span`
  position: absolute;
  left: 100px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 24px;
`;

const RightArrow = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 24px;
`;

const ExpandedPhotoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ExpandedMainImage = styled.img`
  width: 100%;
  height: 100%;
  objectFit: contain;
  cursor: pointer;
`;

function PhotoSection({ productId, selectedStyle }) {
  const [styles, setStyles] = useState([]);
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectedMainPhotoIndex, setSelectedMainPhotoIndex] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const [startIdx, setStartIdx] = useState(0);
  const [expandedView, setExpandedView] = useState(false);

  const apiURL = process.env.API_URL;
  const token = process.env.GITHUB_TOKEN;

  useEffect(() => {
    axios.get(`${apiURL}products/${productId}/styles`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setStyles(response.data.results);
      })
      .catch((err) => {
        console.error('Error retrieving product styles:', err);
      });
  }, [productId]);

  useEffect(() => {
    const styleIndex = styles.findIndex((style) => style.style_id === selectedStyle);
    if (styleIndex !== -1) {
      setSelectedStyleIndex(styleIndex);
      setSelectedPhotos(styles[styleIndex]?.photos);
      setSelectedMainPhotoIndex(selectedMainPhotoIndex);
    }
  }, [selectedStyle, styles]);

  const handleThumbnailClick = (index) => {
    setSelectedPhotos(styles[selectedStyleIndex]?.photos);
    setSelectedMainPhotoIndex(index);
  };

  const handleArrowClick = (direction) => {
    if (direction === 'right') {
      setSelectedMainPhotoIndex((prevIndex) => (prevIndex < styles.length - 1 ? prevIndex + 1 : prevIndex));
    } else {
      setSelectedMainPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    }
  };

  const handleThumbnailScroll = (direction) => {
    const container = thumbnailContainerRef.current;
    console.log(container);
    if (!container) {
      return;
    }

    const visibleThumbnails = 7;
    const totalThumbnails = selectedPhotos.length;

    if (direction === 'up') {
      setStartIdx(Math.max(0, startIdx - 1));
    } else if (direction === 'down') {
      setStartIdx(Math.min(startIdx + 1, totalThumbnails - visibleThumbnails));
    }
  };

  const handleMainImageClick = () => {
    setExpandedView(!expandedView);
  };

  return (
    <PhotoSectionContainer>
      {expandedView && (
        <ExpandedPhotoContainer onClick={() => setExpandedView(false)}>
          <ExpandedMainImage src={selectedPhotos[selectedMainPhotoIndex]?.url} alt="Main" />
        </ExpandedPhotoContainer>
      )}

      <MainPhotoContainer>
        <ThumbnailContainerWrapper ref={thumbnailContainerRef}>
          <ScrollButtonTop onClick={() => handleThumbnailScroll('up')}>
            ^
          </ScrollButtonTop>
          <ThumbnailContainer>
            {selectedPhotos.slice(startIdx, startIdx + 7).map((photo, index) => (
              <Thumbnail key={index} src={photo.thumbnail_url} alt={`Thumbnail ${index}`} selected={index + startIdx === selectedMainPhotoIndex} onClick={() => handleThumbnailClick(index + startIdx)} />
            ))}
          </ThumbnailContainer>
          <ScrollButtonBottom onClick={() => handleThumbnailScroll('down')}>
            v
          </ScrollButtonBottom>
        </ThumbnailContainerWrapper>

        {selectedMainPhotoIndex !== 0 && (
          <LeftArrow onClick={() => handleArrowClick('left')} disabled={selectedStyleIndex === 0}>
            &#8592;
          </LeftArrow>
        )}
        <MainImage
          src={selectedPhotos[selectedMainPhotoIndex]?.url}
          alt="Main"
          onClick={handleMainImageClick}
          style={{ cursor: 'zoom-in' }}
        />
        {selectedMainPhotoIndex !== selectedPhotos.length - 1 && (
          <RightArrow onClick={() => handleArrowClick('right')} disabled={selectedStyleIndex === styles.length - 1}>
            &#8594;
          </RightArrow>
        )}
      </MainPhotoContainer>

    </PhotoSectionContainer>
  );
}

export default PhotoSection;
