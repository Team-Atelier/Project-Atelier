import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

  display: flex;
  height: 7px;
  width: 76%;
  margin-right: 5%;
  position: relative;
  margin-top: 1.05em;
  left: 15px;
  top: -10px;
`;

const Box = styled.div`
  height: 100%;
  position: absolute;
  border-radius: 0px;
`;

const Background = styled(Box)`
  background: #696969;
  width: 100%;
`;

const Progress = styled(Box)`
  background: #3eb489;
  width: ${({ percent }) => percent}%;
`;

function PartiallyFilledBar({percentage}) {
  return (

    <Container>
      <Background />
      <Progress percent={percentage} />
    </Container>

  );
}
export default PartiallyFilledBar;
