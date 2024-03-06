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
  left: 25%;
  top: 6.25%;
`;
const ModalContent = styled.div`
background-color:
margin: 15% auto;
padding: 0px;
border: 5px solid white;
`;
const ModalImage = styled.img`
width:  600px;
height: 600px;
object-fit: cover;
padding: 0px
`;
const CloseButton = styled.span`
background-color: white;
padding: 20px;
padding-top: 5px;
`;
function ModalWindowTemplate({children}) {
  const modal = document.getElementById('fullReviewImage');
  return (
    <ModalOverlay id="fullReviewImage" className="modal">
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
