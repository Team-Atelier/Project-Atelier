/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
`;
const BottomRow = styled(Container)`
  align-items: center;
  justify-content: center;
  position: relative;
  top: -15px;
`

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

function CharacteristicRating({ characteristic, rating }) {
  const descriptions = {
    size: ['Too small', 'Perfect', 'A size too wide'],
    width: ['Too narrow', 'Perfect', 'Too wide'],
    comfort: ['Uncomfortable', 'Ok', 'Perfect'],
    quality: ['Poor', 'What I expected', 'Perfect'],
    length: ['Runs tight', 'Perfect', 'Runs long'],
    fit: ['Runs tight', 'Perfect', 'Runs long'],
  };
  const key = characteristic.toLowerCase();
  console.log(key);
  return (
    <div>
      {characteristic}
      <Container>
        {key
          ? (
            <>
              <section>{descriptions[key][0]}</section>
              <section>{descriptions[key][2]}</section>
            </>
          )
          : (
            <>
              <section>1</section>
              <section>3</section>
            </>
          )}
      </Container>
      <Container>
        <Line width={20} />
        <Line width={50} />
        <Line width={20} />
      </Container>
      <Container>
        <Triangle rating={rating * 20} />
      </Container>
      <BottomRow>
        {key
          ? (
            <section>{descriptions[key][1]}</section>
          )
          : (
            <section>2</section>
          )}
      </BottomRow>
    </div>

  );
}
export default CharacteristicRating;
