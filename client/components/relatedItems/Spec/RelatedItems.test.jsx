/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedItems from '../RelatedItems.jsx';

test('renders RelatedProductsList component', () => {
  const { getByText } = render(<RelatedItems />);

  expect(getByText('You might like...')).toBeInTheDocument();
});

test('renders YourOutfitList component', () => {
  const { getByText } = render(<RelatedItems />);

  expect(getByText('Build an ensemble')).toBeInTheDocument();
});
