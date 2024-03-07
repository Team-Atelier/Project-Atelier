/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaImage } from 'react-icons/fa';

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
  font-size: 50px;
`;

const RightArrow = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 50px;
`;

const ExpandedPhotoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5555;
`;

const ExpandedMainImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: crosshair;
`;

const ZoomedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ZoomedMainImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: scale(2.5);
  cursor: vertical-text;
`;

const ZoomedThumbnailContainerWrapper = styled.div`
  position: absolute;
  flex: 0 0 100px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 400px;
  margin-top: auto;
  margin-bottom: auto;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid #ccc;
`;

const ThumbnailIcon = styled(FaImage)`
  font-size: 20px;
  cursor: pointer;
  margin: 0 5px;
  color: ${({ selected }) => (selected ? 'blue' : 'black')};
`;

function PhotoSection({ productId, selectedStyle }) {
  const [styles, setStyles] = useState([]);
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectedMainPhotoIndex, setSelectedMainPhotoIndex] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const [startIdx, setStartIdx] = useState(0);
  const [expandedView, setExpandedView] = useState(false);
  const [zoomed, setZoomed] = useState(false);

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

  const handleZoomImageClick = () => {
    setZoomed(true);
  };

  const handleMouseMove = (event) => {
    const container = document.getElementById('zoomedContainer');
    const zoomedImage = document.getElementById('zoomedMainImage');

    // Calculate relative position of the mouse within container
    const rect = container.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    // Calculate ratio of mouse position to container size
    const ratioX = offsetX / rect.width;
    const ratioY = offsetY / rect.height;

    const imgWidth = zoomedImage.offsetWidth;
    const imgHeight = zoomedImage.offsetHeight;
    const newX = -((imgWidth * ratioX) - (rect.width / 2));
    const newY = -((imgHeight * ratioY) - (rect.height / 2));

    zoomedImage.style.transform = `scale(2.5) translate(${newX}px, ${newY}px)`;
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (expandedView && event.key === 'Escape') {
        setExpandedView(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [expandedView]);

  return (
    <PhotoSectionContainer>
      {expandedView && (
        <ExpandedPhotoContainer>

          <ZoomedThumbnailContainerWrapper ref={thumbnailContainerRef}>
            <ScrollButtonTop onClick={() => handleThumbnailScroll('up')}>
              ^
            </ScrollButtonTop>
            <ThumbnailContainer>
              {selectedPhotos.slice(startIdx, startIdx + 7).map((_, index) => (
                <ThumbnailIcon key={index} alt={`Thumbnail ${index}`} selected={index + startIdx === selectedMainPhotoIndex} onClick={() => handleThumbnailClick(index + startIdx)} />
              ))}
            </ThumbnailContainer>
            <ScrollButtonBottom onClick={() => handleThumbnailScroll('down')}>
              v
            </ScrollButtonBottom>
          </ZoomedThumbnailContainerWrapper>

          {selectedMainPhotoIndex !== 0 && (
          <LeftArrow onClick={() => handleArrowClick('left')} disabled={selectedStyleIndex === 0}>
            &#8592;
          </LeftArrow>
          )}

          <ExpandedMainImage
            style={{ backgroundImage: `url(${selectedPhotos[selectedMainPhotoIndex]?.url})` }}
            alt="Main"
            onClick={handleZoomImageClick}
          />

          {selectedMainPhotoIndex !== selectedPhotos.length - 1 && (
          <RightArrow onClick={() => handleArrowClick('right')} disabled={selectedStyleIndex === styles.length - 1}>
            &#8594;
          </RightArrow>
          )}
        </ExpandedPhotoContainer>
      )}

      {zoomed && (
        <ZoomedContainer id="zoomedContainer" onClick={() => setZoomed(false)}>
          <ZoomedMainImage
            id="zoomedMainImage"
            style={{ backgroundImage: `url(${selectedPhotos[selectedMainPhotoIndex]?.url})` }}
            alt="Zoomed"
            onMouseMove={handleMouseMove}
          />
        </ZoomedContainer>
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
