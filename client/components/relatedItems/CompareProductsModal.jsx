/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4)
`;
const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;
const Close = styled.button`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
`;

export default function CompareProductsModal({ handleModalClose }) {
  return (
    <Modal id="modal">
      <ModalContent>
        <header>
          <Close type="button" onClick={handleModalClose}>
            &times;
          </Close>
          <h1>Compare</h1>
        </header>
        <div>
          <p>Product Comparison</p>
        </div>
      </ModalContent>
    </Modal>
  );
}
