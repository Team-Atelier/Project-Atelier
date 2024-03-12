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

// class LocalStorageMock {
//   constuctor() {
//     this.store = {};
//   }

//   clear() {
//     this.store = {};
//   }

//   getItem(key) {
//     return this.store[key] || null;
//   }

//   setItem(key, value) {
//     this.store[key] = String(value);
//   }

//   removeItem(key) {
//     delete this.store[key];
//   }
// }

// global.localStorage = new LocalStorageMock();
const url = process.env.API_URL;
jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

test('renders RelatedProductsList component', () => {
  const { getByText } = render(<RelatedItems />);

  expect(getByText('You might like...')).toBeInTheDocument();
});

test('renders YourOutfitList component', () => {
  const { getByText } = render(<RelatedItems />);

  expect(getByText('Build an ensemble')).toBeInTheDocument();
});

describe('AddToOutfitCard Click Event', () => {
  it('adds the current product to YourOutfitList and updates local storage on click', () => {
    const testProductID = '40346';
    const mockAddToOutfit = jest.fn();
    const storedOutfit = [{ id: testProductID, name: 'Test Product', category: 'Test category' }];
    const outfitInfo = [{ id: testProductID, name: 'Test Product', category: 'Test Category' }];


    render(<AddToOutfitCard thisProductID={testProductID} addToOutfit={mockAddToOutfit} />);
    // render(<YourOutfitList currentProductID={testProductID} addToOutfit={mockAddToOutfit} storedOutfit={storedOutfit} outfitInfo={outfitInfo} />);
    const addToOutfitButton = screen.getByRole('button', { name: /Add to Outfit/ });
    fireEvent.click(addToOutfitButton);
    expect(localStorage.setItem).toHaveBeenCalled();
    // expect(screen.getByTestId('hello')).toBeInTheDocument();
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
