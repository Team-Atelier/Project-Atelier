import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

  display: flex;
  height: 7px;
  width: 70%;
  margin-right: 15%;
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
  background: grey;
  width: 100%;
`;

const Progress = styled(Box)`
  background: black;
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
