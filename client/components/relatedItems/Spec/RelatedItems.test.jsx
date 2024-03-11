/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedItems from '../RelatedItems.jsx';
import AddToOutfitCard from '../AddToOutfitCard.jsx';
import YourOutfitList from '../YourOutfitList.jsx';

test('renders RelatedProductsList component', () => {
  const { getByText } = render(<RelatedItems />);

  expect(getByText('You might like...')).toBeInTheDocument();
});

test('renders YourOutfitList component', () => {
  const { getByText } = render(<RelatedItems />);

  expect(getByText('Build an ensemble')).toBeInTheDocument();
});

const localStorageMock = (function localStorageMock() {
  let store = { outfit: '[]' };
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = { outfit: '[]' };
    },
  };
}());

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

afterEach(() => {
  localStorageMock.clear();
});

describe('AddToOutfitCard Click Event', () => {
  it('adds the current product to YourOutfitList and updates local storage on click', () => {
    const testProductID = '40346';
    const mockAddToOutfit = jest.fn();
    render(<AddToOutfitCard thisProductID={testProductID} addToOutfit={mockAddToOutfit} />);
    const addToOutfitButton = screen.getByRole('button', { name: /Add to Outfit/ });
    fireEvent.click(addToOutfitButton);
    expect(localStorage.getItem('outfit')).toContain(testProductID);
    render(<YourOutfitList />);
    expect(screen.getByTestId(`product-${testProductID}`)).toBeInTheDocument();
  });
});
