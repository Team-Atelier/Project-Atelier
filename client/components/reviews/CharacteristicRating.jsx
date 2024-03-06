import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
`;

const Triangle = styled.span`
  border-bottom: 12px solid #000000;
  border-left: 8px solid rgba(0, 0, 0, 0);
  border-right: 8px solid rgba(0, 0, 0, 0);
  content: "";
  display: flex;
  height: 0;
  vertical-align: top;
  width: 0;
  transform: rotate(180deg);
  position: relative;
  top: -16px;
  left: ${({ rating }) => rating}%;
`;

const Line = styled.div`

  display: flex;
  height: 6px;
  width: ${({ width }) => width}%;
  position: relative;
  margin-top: 1.05em;
  top: -10px;
  background: grey;
`;

function CharacteristicRating({characteristic, rating}) {
  return (
    <div>{characteristic}
      <Container>
        <section>Cold</section>
        <section>Warm</section>
        <section>Hot</section>
      </Container>
      <Container>
        <Line width={20} />
        <Line width={50} />
        <Line width={20} />
      </Container>
      <Container>
        <Triangle rating={rating * 20} />
      </Container>
    </div>

  );
}
export default CharacteristicRating;
