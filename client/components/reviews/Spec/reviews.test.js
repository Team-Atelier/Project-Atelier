/**
 * @jest-environment jsdom
 */
/* eslint-disable react/no-deprecated */
import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import StarRating from '../StarRating.jsx';

jest.mock('axios');

/*
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
*/

describe('testing review tile star rating', () => {
  test('should render 5 stars by passing prop', () => {
    const container = document.createElement('div');
    ReactDOM.render(<StarRating rating={5} />, container);
    expect(container.getElementsByClassName('StarRating__StarStyle-sc-1ikxy9w-0').length).toBe(5);
  });
  test('should render 4 stars by passing prop', () => {
    const container = document.createElement('div');
    ReactDOM.render(<StarRating rating={4} />, container);
    expect(container.getElementsByClassName('StarRating__StarStyle-sc-1ikxy9w-0').length).toBe(4);
  });
  test('should render 3 stars by passing prop', () => {
    const container = document.createElement('div');
    ReactDOM.render(<StarRating rating={3} />, container);
    expect(container.getElementsByClassName('StarRating__StarStyle-sc-1ikxy9w-0').length).toBe(3);
  });
  test('should render 2 stars by passing prop', () => {
    const container = document.createElement('div');
    ReactDOM.render(<StarRating rating={2} />, container);
    expect(container.getElementsByClassName('StarRating__StarStyle-sc-1ikxy9w-0').length).toBe(2);
  });
  test('should render 1 stars by passing prop', () => {
    const container = document.createElement('div');
    ReactDOM.render(<StarRating rating={1} />, container);
    expect(container.getElementsByClassName('StarRating__StarStyle-sc-1ikxy9w-0').length).toBe(1);
  });
});
