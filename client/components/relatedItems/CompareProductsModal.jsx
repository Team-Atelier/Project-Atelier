/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
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

export default function CompareProductsModal({ handleModalClose, thisProduct, comparisonProduct }) {
  const [features, setFeatures] = useState([]);

  console.log('features', Object.entries(features));

  useEffect(() => {
    const combinedFeatures = {};
    const productFeatureList = thisProduct.features;
    const compareFeatureList = comparisonProduct.features;
    for (let i = 0; i < productFeatureList.length; i += 1) {
      combinedFeatures[productFeatureList[i].feature] = [productFeatureList[i].value, null];
    }
    for (let j = 0; j < compareFeatureList.length; j += 1) {
      if (combinedFeatures[compareFeatureList[j].feature]) {
        combinedFeatures[compareFeatureList[j].feature][1] = compareFeatureList[j].value;
      } else {
        combinedFeatures[compareFeatureList[j].feature] = [null, compareFeatureList[j].value];
      }
    }
    setFeatures(Object.entries(combinedFeatures));
  }, [thisProduct, comparisonProduct]);

  return (
    <Modal id="modal">
      <ModalContent>
        <header>
          <Close type="button" onClick={handleModalClose}>
            &times;
          </Close>
          <h1>Compare</h1>
        </header>
        <table>
          <thead>
            <tr>
              <th>{thisProduct.name}</th>
              <th aria-label="empty" />
              <th>{comparisonProduct.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{thisProduct.category}</td>
              <td>Category</td>
              <td>{comparisonProduct.category}</td>
            </tr>
            {features ? features.map((feature) => (
              <tr>
                <td>{feature[1][0]}</td>
                <td>{feature[0]}</td>
                <td>{feature[1][1]}</td>
              </tr>
            )) : null }
          </tbody>
        </table>
      </ModalContent>
    </Modal>
  );
}
