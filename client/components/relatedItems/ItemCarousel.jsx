import React from 'react';
import ProductCard from './ProductCard.jsx';
import styled from 'styled-components';

// Carousel Styling
const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const CarouselWrapper = styled.div`
  display: flex;
  width: 100%
  position: relative;
`
const CarouselContentWrapper = styled.div`
  overflow: hidden;
  width: 100%
  height:100%
`
const CarouselContent = styled.div`
  display: flex;
  transition: all 250ms linear;
  -ms-overflow-style: none;
  scrollbar-width: none;
`
const Arrow = styled.button`
  position: absolute;
  z-index: 1;
  top: 50%;
  tranform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: white;
  border: 1px solid #ddd;
`
const LeftArrow = styled(Arrow)`
  left: 24px;
`
const RightArrow = styled(Arrow)`
  right: 24px;
`

// Carousel 
const ItemCarousel = (props) => {
  const {children} = props;

  return (
    <CarouselContainer>
      <CarouselWrapper>
        <LeftArrow>&lt;</LeftArrow>
        <CarouselContentWrapper>
          <CarouselContent>
            {children}
          </CarouselContent>
        </CarouselContentWrapper>
        <RightArrow>&gt;</RightArrow>
      </CarouselWrapper>
    </CarouselContainer>
  )

}

export default ItemCarousel;