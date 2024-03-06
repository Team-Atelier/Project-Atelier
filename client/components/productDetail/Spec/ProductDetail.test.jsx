/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ProductDetail from '../ProductDetail.jsx';
import InfoSection from '../InfoSection.jsx';
import Description from '../Description.jsx';
import PhotoSection from '../PhotoSection.jsx';
import ThumbnailOverlay from '../ThumbnailOverlay.jsx';

describe('ProductDetail component', () => {
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

  it('renders loading message initially', async () => {
    render(<ProductDetail />);
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('renders description info after successful API call', async () => {
    const productId = 40346;
    const apiURL = process.env.API_URL;
    const token = process.env.GITHUB_TOKEN;
    const mockData = {
      id: 40346,
      category: 'Pants',
      default_price: '40.00',
      description: "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers",
      name: 'Morning Joggers',
      slogan: 'Make yourself a morning person',
      features: [
        { feature: 'Fabric', value: '100% Cotton' },
        { feature: 'Cut', value: 'Skinny' },
      ],
    };
    mockAxios.onGet(`${apiURL}products/${productId}`, {
      headers: {
        Authorization: token,
      },
    }).reply(200, mockData);

    render(<Description productId={productId} />);

    await waitFor(() => {
      expect(screen.getByText('Make yourself a morning person')).toBeInTheDocument();
      expect(screen.getByText("Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers")).toBeInTheDocument();
      expect(screen.getByText('Fabric: 100% Cotton')).toBeInTheDocument();
      expect(screen.getByText('Cut: Skinny')).toBeInTheDocument();
    });
  });

  it('renders description info after successful API call', async () => {
    const productId = 40346;
    const apiURL = process.env.API_URL;
    const token = process.env.GITHUB_TOKEN;
    const mockData = {
      id: 40346,
      category: 'Pants',
      default_price: '40.00',
      description: "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers",
      name: 'Morning Joggers',
      slogan: 'Make yourself a morning person',
      features: [
        { feature: 'Fabric', value: '100% Cotton' },
        { feature: 'Cut', value: 'Skinny' },
      ],
    };
    mockAxios.onGet(`${apiURL}products/${productId}`, {
      headers: {
        Authorization: token,
      },
    }).reply(200, mockData);

    render(<InfoSection productId={productId} />);

    await waitFor(() => {
      expect(screen.getByText('Morning Joggers')).toBeInTheDocument();
      expect(screen.getByText('Pants')).toBeInTheDocument();
    });
  });
});
