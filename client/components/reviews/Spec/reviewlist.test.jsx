/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/no-deprecated */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ReviewList from '../ReviewList.jsx';
import MockAdapter from 'axios-mock-adapter';

jest.mock('axios');

const mockMetadata = {
  product_id: '40346',
  ratings: {
    1: '26',
    2: '55',
    3: '59',
    4: '44',
    5: '99',
  },
  recommended: {
    false: '74',
    true: '209',
  },
  characteristics: {
    Fit: {
      id: 135224,
      value: '2.8790697674418605',
    },
    Length: {
      id: 135225,
      value: '3.1382488479262673',
    },
    Comfort: {
      id: 135226,
      value: '3.0230414746543779',
    },
    Quality: {
      id: 135227,
      value: '3.3943661971830986',
    },
  },
  rec: 209,
  noRec: 74,
  percentRecommend: 73.85159010600707,
  scaled: {
    1: 0.09187279151943463,
    2: 0.19434628975265017,
    3: 0.20848056537102475,
    4: 0.15547703180212014,
    5: 0.3498233215547703,
  },
  average: 3.477031802120141,
};

describe('Review tile', () => {
  test('Should render seller response if present', () => {
    const mockCallback = (() => {});
    render(
    );
    expect(screen.getByText(new RegExp(aReview.response))).toBeInTheDocument();
    expect(screen.getByText('✓ I recommend this product')).toBeInTheDocument();
  });
});



describe('Api tests', () => {
  let mockAxios;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(() => {
    mockAxios.restore();
  });

});