import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Carousel Styling
const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const CarouselWrapper = styled.div`
  display: flex;
  width: 100%
  position: relative;
`;
const CarouselContentWrapper = styled.div`
  overflow: hidden;
  width: 100%
  height:100%
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CarouselContent = styled.div`
  display: flex;
  transition: all 250ms linear;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const Arrow = styled.button`
  position: absolute;
  z-index: 1;
  top: 50%;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: white;
  border: 1px solid #ddd;
`;
const LeftArrow = styled(Arrow)`
  left: 24px;
`;
const RightArrow = styled(Arrow)`
  right: 24px;
`;

// Carousel
const ItemCarousel = function (props) {
  const {children} = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setLength(children.length)
  }, [children]);

  const next = () => {
    if (currentIndex < (length - 1)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  return (
    <CarouselContainer>
      <CarouselWrapper>
        {
          currentIndex > 0
          && <LeftArrow onClick={prev}>&lt;</LeftArrow>
        }
        <CarouselContentWrapper>
          <CarouselContent style={{ transform: `translateX(-${currentIndex * 20}%)` }}>
              {children}
          </CarouselContent>
        </CarouselContentWrapper>
        {
          currentIndex < (length - 1)
          && <RightArrow onClick={next}>&gt;</RightArrow>
        }
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default ItemCarousel;
