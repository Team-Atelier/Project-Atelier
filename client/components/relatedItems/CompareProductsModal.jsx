/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  display: inline-block;
  position: fixed;
  z-index: 3;
  left: 35%;
  top: 35%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4)
  border: 1px solid #888;
`;
const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
`;
const ModalHeader = styled.header`
  font-weight: 1000;
  letter-spacing:  -.008rem;
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-align: left;
`;
const Close = styled.button`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`;
const Table = styled.table`
  font-weight: 400;
  letter-spacing: -.08px;
  font-size: 14px;
  line-height: 18px;
  border: none;
  border-collapse: collapse;
  text-indent: initial;
  border-spacing: 2px;
  tr:nth-child(odd) {background-color: #f4f2ed;}
  text-align: center;
`;
const Feature = styled.th`
  min-width: 200px;
  font-weight: 600px;
  min-height: 48px;
  padding: 0.8rem 1.6rem;
  text-alight: center;
  vertical-align: top;
`;
const Header = styled.thead`
  font-weight: 800;
  font-size: 20px;
  padding: 0.8rem 1.6rem;
`;

export default function CompareProductsModal({ handleModalClose, thisProduct, comparisonProduct }) {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const combinedFeatures = {};
    const productFeatureList = thisProduct.features;
    const compareFeatureList = comparisonProduct.features;
    for (let i = 0; i < productFeatureList.length; i += 1) {
      if (productFeatureList[i].value === null) {
        combinedFeatures[productFeatureList[i].feature] = ['check', null];
      } else {
        combinedFeatures[productFeatureList[i].feature] = [productFeatureList[i].value, null];
      }
    }
    for (let j = 0; j < compareFeatureList.length; j += 1) {
      if (combinedFeatures[compareFeatureList[j].feature] && combinedFeatures[compareFeatureList[j].value] === null) {
        combinedFeatures[compareFeatureList[j].feature][1] = 'check';
      } else if (combinedFeatures[compareFeatureList[j].feature]) {
        combinedFeatures[compareFeatureList[j].feature][1] = compareFeatureList[j].value;
      } else if (compareFeatureList[j].value === null) {
        combinedFeatures[compareFeatureList[j].feature] = [null, 'check'];
      } else {
        combinedFeatures[compareFeatureList[j].feature] = [null, compareFeatureList[j].value];
      }
    }
    setFeatures(Object.entries(combinedFeatures));
  }, [thisProduct, comparisonProduct]);

  return (
    <Modal id="modal">
      <ModalContent>
        <ModalHeader>
          <Close type="button" onClick={handleModalClose}>
            &times;
          </Close>
          <span>Compare</span>
        </ModalHeader>
        <Table>
          <Header>
            <Feature>{thisProduct.name}</Feature>
            <th aria-label="empty" />
            <Feature>{comparisonProduct.name}</Feature>
          </Header>
          <tbody>
            <tr>
              <td>{thisProduct.category}</td>
              <Feature>Category</Feature>
              <td>{comparisonProduct.category}</td>
            </tr>
            {features ? features.map((feature) => (
              <tr>
                <td>{(feature[1][0] === 'check') ? <>&#10003;</> : feature[1][0]}</td>
                <Feature>{feature[0]}</Feature>
                <td>{(feature[1][1] === 'check') ? <>&#10003;</> : feature[1][1]}</td>
              </tr>
            )) : null }
          </tbody>
        </Table>
      </ModalContent>
    </Modal>
  );
}
