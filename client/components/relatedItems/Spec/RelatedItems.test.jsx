/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import RelatedItems from '../RelatedItems.jsx';
import AddToOutfitCard from '../AddToOutfitCard.jsx';
import YourOutfitList from '../YourOutfitList.jsx';
import ItemCarousel from '../ItemCarousel.jsx';
import ProductCard from '../ProductCard.jsx';
import CompareProductsModal from '../CompareProductsModal.jsx';

const url = process.env.API_URL;
jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

describe('RelatedItems Components', () => {
  const mockProductData = {
    id: '123',
    name: 'Test Product',
    category: 'Test Category',
  };

  test('renders relatedProductsList and yourOutfitList components', () => {
    render(
      <RelatedItems
        currentProductData={mockProductData}
        currentProductID="12345"
        handleProductChange={() => {}}
        scaleRatings={() => {}}
        computeAverage={() => {}}
      />,
    );
    const relatedProductsList = screen.getByTestId('relatedProductsList');
    const yourOutfitList = screen.getByTestId('yourOutfitList');
    expect(relatedProductsList).toBeInTheDocument();
    expect(yourOutfitList).toBeInTheDocument();
    expect(screen.getByText('You might like...')).toBeInTheDocument();
    expect(screen.getByText('Build an ensemble')).toBeInTheDocument();
  });
});

describe('AddToOutfitCard Click Event', () => {
  it('adds the current product to YourOutfitList and updates local storage on click', () => {
    const mockAddToOutfit = jest.fn();
    const testProductID = '789012'
    const storedOutfit = [{ id: testProductID, name: 'Test Product', category: 'Test category' }];
    const outfitInfo = [{ id: testProductID, name: 'Test Product', category: 'Test Category' }];


    render(<AddToOutfitCard thisProductID={testProductID} addToOutfit={mockAddToOutfit} />);
    const addToOutfitButton = screen.getByRole('button', { name: /Add to Outfit/ });
    fireEvent.click(addToOutfitButton);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

describe('ProductCard Component', () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${url}products/123/styles`).reply(200, {
    results: [
      {
        'default?': true,
        photos: [{ url: 'mocked_product_photo_url' }],
        sale_price: 'mocked-sale-price',
        original_price: 'mocked-original-price',
      },
    ],
  });

  mock.onGet(`${url}reviews/meta?product_id=123`).reply(200, {
    ratings: {
      1: 10,
      2: 20,
      3: 30,
      4: 40,
      5: 50,
    },
  });

  afterEach(() => {
    mock.reset();
  });

  it('renders product information correctly', async () => {
    await act(async () => {
      const product = {
        id: '123',
        name: 'Test Product',
        category: 'Test Category',
      };

      render(<ProductCard name={product.name} category={product.category} id={product.id} originalPrice={product.originalPrice} salePrice={product.salePrice} rating={product.rating} scaleRatings={() => {}} computeAverage={() => {}} />);
    });

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('$mocked-sale-price')).toBeInTheDocument();
    expect(screen.getByText('$mocked-original-price')).toBeInTheDocument();
  });
});

describe('CompareProductsModal', () => {
  const mockThisProduct = {
    name: 'Product A',
    category: 'Category A',
    features: [
      { feature: 'Feature 1', value: 'Value 1' },
      { feature: 'Feature 2', value: null },
    ],
  };
  const mockComparisonProduct = {
    name: 'Product B',
    category: 'Category B',
    features: [
      { feature: 'Feature 1', value: 'Value 2' },
      { feature: 'Feature 3', value: 'Value 3' },
    ],
  };
  test('renders compare modal correctly', () => {
    render(
      <CompareProductsModal
        handleModalClose={() => {}}
        thisProduct={mockThisProduct}
        comparisonProduct={mockComparisonProduct}
      />,
    );

    expect(screen.getByText('Compare')).toBeInTheDocument();
  });
});
