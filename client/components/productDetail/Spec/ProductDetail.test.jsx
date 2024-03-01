/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ProductDetail from '../ProductDetail.jsx';

jest.mock('../PhotoSection.jsx', () => () => <div data-testid="photo-section">PhotoSection Component</div>);
jest.mock('../InfoSection.jsx', () => () => <div data-testid="info-section">InfoSection Component</div>);
jest.mock('../Description.jsx', () => () => <div data-testid="description">Description Component</div>);

describe('ProductDetail component', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductDetail />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('renders PhotoSection, InfoSection, and Description components', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductDetail />, div);

    const photoSection = div.querySelector('[data-testid="photo-section"]');
    const infoSection = div.querySelector('[data-testid="info-section"]');
    const description = div.querySelector('[data-testid="description"]');

    expect(photoSection).toBeTruthy();
    expect(infoSection).toBeTruthy();
    expect(description).toBeTruthy();
  });
});