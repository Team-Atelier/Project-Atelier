import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  display: none;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;
const ModalWindow = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const ModalContent = styled.div`
padding: 0px;
border: 5px solid white;
`;
const CloseButton = styled.span`
background-color: white;
padding: 20px;
padding-top: 5px;
`;
function ModalWindowTemplate({id, children}) {
  const modal = document.getElementById(id);
  return (
    <ModalOverlay id={id} className="modal">
      <ModalWindow>
        <CloseButton onClick={() => { modal.style.display = 'none'; }}>
          CLOSE (&times;)
        </CloseButton>
        <ModalContent>
          {children}
        </ModalContent>
      </ModalWindow>
    </ModalOverlay>
  );
}
export default ModalWindowTemplate;
