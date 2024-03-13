/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import {
  render, screen, waitFor, fireEvent, act,
} from '@testing-library/react';
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
    mockAxios.onGet(`/api/products/${productId}`, {
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

  it('renders product info after successful API call', async () => {
    const productId = 40346;
    const apiURL = process.env.API_URL;
    const token = process.env.GITHUB_TOKEN;
    const mockProductData = {
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

    const mockStylesData = {
      id: 40346,
      results: [
        {
          style_id: 240510,
          name: 'Black',
          original_price: '40.00',
          sale_price: null,
          photos: [
            { thumbnail_url: 'https://images.unsplash.com/photo-1552902865-b72c0…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1552902865-b72c0…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1492447105260-2e…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1492447105260-2e…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1548133464-29abc…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1548133464-29abc…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1500340520802-16…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1500340520802-16…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1559304022-afbf2…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1559304022-afbf2…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1656&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1554921148-83d8c…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1554921148-83d8c…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
          ],
        },
      ],
    };

    const mockReviewsData = {
      product_id: 40346,
      recommended: { false: '82', true: '214' },
      ratings: {
        1: '27', 2: '55', 3: '62', 4: '50', 5: '102',
      },
      characteristics: {
        Comfort: { id: 135226, value: '3.1086956521739130' },
        Fit: { id: 135224, value: '2.9561403508771930' },
        Length: { id: 135225, value: '3.2043478260869565' },
        Quality: { id: 135227, value: '3.4646017699115044' },
      },
    };

    mockAxios.onGet(`/api/products/${productId}`, {
      headers: {
        Authorization: token,
      },
    }).reply(200, mockProductData);

    mockAxios.onGet(`/api/products/${productId}/styles`, {
      headers: {
        Authorization: token,
      },
    }).reply(200, mockStylesData);

    mockAxios.onGet(`/api/reviews/meta?product_id=${productId}`, {
      headers: {
        Authorization: token,
      },
    }).reply(200, mockReviewsData);

    const scaleRatingsMock = jest.fn();
    const computeAverageMock = jest.fn();
    const mockOnStyleSelect = jest.fn();
    const mockScroll = jest.fn();

    render(
      <InfoSection
        productId={productId}
        onStyleSelect={mockOnStyleSelect}
        scrollToReviews={mockScroll}
        scaleRatings={scaleRatingsMock}
        computeAverage={computeAverageMock}
      />,
    );

    const thumbnailElement = screen.getByTestId('thumbnail-overlay');
    fireEvent.click(thumbnailElement);

    const sizeDropdown = screen.getByRole('option', { name: 'Select Size:' });
    fireEvent.change(sizeDropdown, { target: { value: 'Medium' } });

    const quantityDropdown = screen.getByRole('option', { name: '-' });
    fireEvent.change(quantityDropdown, { target: { value: '2' } });

    const scrollElement = screen.getByTestId('scroll-to-reviews');
    fireEvent.click(scrollElement);

    const addButton = screen.getByRole('button', { name: 'Add To Cart' });
    const facebook = screen.getByRole('button', { name: 'Facebook Share' });
    const twitter = screen.getByRole('button', { name: 'Twitter Share' });
    const pinterest = screen.getByRole('button', { name: 'Pinterest Share' });

    await waitFor(() => {
      expect(screen.getByText('Morning Joggers')).toBeInTheDocument();
      expect(screen.getByText('Pants')).toBeInTheDocument();
      expect(screen.getByText('Style: Black')).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByText('Read all 296 reviews')).toBeInTheDocument();
      expect(mockOnStyleSelect).toHaveBeenCalled();
      expect(sizeDropdown.value).toBe('Medium');
      expect(quantityDropdown.value).toBe('2');
      expect(mockScroll).toHaveBeenCalled();
      expect(addButton).toBeInTheDocument();
      expect(facebook).toBeInTheDocument();
      expect(twitter).toBeInTheDocument();
      expect(pinterest).toBeInTheDocument();
    });
  });

  it('check useEffect is called', async () => {
    const productId = 40346;
    const apiURL = process.env.API_URL;
    const token = process.env.GITHUB_TOKEN;
    const mockProductData = {
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

    const mockStylesData = {
      id: 40346,
      results: [
        {
          style_id: 240510,
          name: 'Black',
          original_price: '40.00',
          sale_price: null,
          photos: [
            { thumbnail_url: 'https://images.unsplash.com/photo-1552902865-b72c0…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1552902865-b72c0…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1492447105260-2e…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1492447105260-2e…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1548133464-29abc…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1548133464-29abc…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1500340520802-16…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1500340520802-16…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1559304022-afbf2…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1559304022-afbf2…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1656&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1554921148-83d8c…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1554921148-83d8c…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
          ],
        },
      ],
    };

    const mockReviewsData = {
      product_id: 40346,
      recommended: { false: '82', true: '214' },
      ratings: {
        1: '27', 2: '55', 3: '62', 4: '50', 5: '102',
      },
      characteristics: {
        Comfort: { id: 135226, value: '3.1086956521739130' },
        Fit: { id: 135224, value: '2.9561403508771930' },
        Length: { id: 135225, value: '3.2043478260869565' },
        Quality: { id: 135227, value: '3.4646017699115044' },
      },
    };

    mockAxios.onGet(`/api/products/${productId}`, {
      headers: {
        Authorization: token,
      },
    }).reply(200, mockProductData);

    mockAxios.onGet(`/api/products/${productId}/styles`, {
      headers: {
        Authorization: token,
      },
    }).reply(200, mockStylesData);

    mockAxios.onGet(`/api/reviews/meta?product_id=${productId}`, {
      headers: {
        Authorization: token,
      },
    }).reply(200, mockReviewsData);

    // Render the component with the initial productId
    const { rerender } = render(<PhotoSection productId={productId} />);

    // Update the productId
    const newId = 40347;

    // Rerender the component with the new productId
    act(() => {
      rerender(<PhotoSection productId={newId} />);
    });

    // Assert that the API requests were made with the new productId
    expect(mockAxios.history.get.length).toBe(2);
    expect(mockAxios.history.get[0].url).toBe(`/api/products/${40346}/styles`);
    expect(mockAxios.history.get[1].url).toBe(`/api/products/${newId}/styles`);
  });

  it('renders photo info after successful API call', async () => {
    const productId = 40346;
    const selectedStyle = 240510;
    const apiURL = process.env.API_URL;
    const token = process.env.GITHUB_TOKEN;
    const mockData = {
      id: 40346,
      results: [
        {
          style_id: 240510,
          name: 'Black',
          original_price: '40.00',
          sale_price: null,
          photos: [
            { thumbnail_url: 'https://images.unsplash.com/photo-1552902865-b72c0…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1552902865-b72c0…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1492447105260-2e…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1492447105260-2e…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1548133464-29abc…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1548133464-29abc…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1500340520802-16…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1500340520802-16…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1559304022-afbf2…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1559304022-afbf2…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1656&q=80' },
            { thumbnail_url: 'https://images.unsplash.com/photo-1554921148-83d8c…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1554921148-83d8c…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
          ],
        },
      ],
    };
    mockAxios.onGet(`/api/products/${productId}/styles`, {
      headers: {
        Authorization: token,
      },
    }).reply(200, mockData);

    const handleThumbnailScrollMock = jest.fn();
    const mockMainImageClick = jest.fn();
    const mockArrowClick = jest.fn();

    render(<PhotoSection productId={productId} selectedStyle={selectedStyle} />);

    const scrollDown = screen.getByTestId('scroll-bottom-btn');
    fireEvent.click(scrollDown);

    const main = screen.getByAltText('Main');
    fireEvent.click(main);

    const right = screen.getByTestId('right-arrow-one');
    fireEvent.click(right);

    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(scrollDown).toBeInTheDocument();
      expect(mockMainImageClick).toHaveBeenCalledTimes(0);
      expect(mockArrowClick).toHaveBeenCalledTimes(0);
      expect(screen.queryByTestId('zoomed-container')).not.toBeInTheDocument();
      expect(screen.queryByTestId('zoomed-image')).not.toBeInTheDocument();
      expect(screen.queryByTestId('left-arrow-index')).not.toBeInTheDocument();
    });
  });

  it('renders conditional element when zoomed', async () => {
    //
    const productId = 40346;
    const selectedStyle = 240510;
    const apiURL = process.env.API_URL;
    const token = process.env.GITHUB_TOKEN;

    const { container } = render(
      <PhotoSection productId={productId} selectedStyle={selectedStyle} />,
    );
    let zoomedImage;

    await waitFor(() => {
      zoomedImage = container.querySelector('#zoomedMainImage');
    });

    expect(zoomedImage).not.toBeInTheDocument();
  });
});
