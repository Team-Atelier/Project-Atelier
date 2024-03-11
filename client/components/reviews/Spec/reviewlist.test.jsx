/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/no-deprecated */
import React from 'react';
import {
  render, screen, act, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import ReviewsList from '../ReviewsList.jsx';
import ReviewTile from '../ReviewTile.jsx';

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
const mockReviewAPI = {
  product: '40346',
  page: 0,
  count: 400,
  results: [
    {
      review_id: 1280925,
      rating: 4,
      summary: 'I love dogs more than cats',
      recommend: false,
      response: null,
      body: 'I love dogs more than cats I love dogs more than cats I love dogs more than cats I love dogs more than cats I love dogs more than cats I love dogs more than cats',
      date: '2024-03-10T00:00:00.000Z',
      reviewer_name: 'jackson11',
      helpfulness: 0,
      photos: [
        {
          id: 2459297,
          url: 'https://i.imgur.com/E6cvpNw.jpeg',
        },
      ],
    },
    {
      review_id: 1280924,
      rating: 4,
      summary: 'Example: Best purchase ever',
      recommend: true,
      response: null,
      body: 'Why did you like the product or not? Why did you like the product or not? Why did you like the product or not? Why did you like the product or not? Why did you like the product or not?',
      date: '2024-03-10T00:00:00.000Z',
      reviewer_name: 'jackson11',
      helpfulness: 0,
      photos: [],
    },
    {
      review_id: 1280923,
      rating: 3,
      summary: 'Best purchase ever!',
      recommend: true,
      response: null,
      body: 'Why did you like the product or not? Why did you like the product or not?',
      date: '2024-03-10T00:00:00.000Z',
      reviewer_name: 'jackson11!',
      helpfulness: 0,
      photos: [
        {
          id: 2459296,
          url: 'https://www.popsci.com/uploads/2022/04/29/husky-independent-personality-dog-breeds.jpg',
        },
      ],
    },
    {
      review_id: 1280922,
      rating: 5,
      summary: 'I love dogs more than cats',
      recommend: false,
      response: null,
      body: 'This is my testThis is my testThis is my testThis is my testThis is my test',
      date: '2024-03-10T00:00:00.000Z',
      reviewer_name: 'jackson11!',
      helpfulness: 0,
      photos: [
        {
          id: 2459295,
          url: 'https://i.imgur.com/E6cvpNw.jpeg',
        },
      ],
    },
  ],
};
// jest.mock('axios');
describe('Review tile', () => {
  test('should render two list items at first', async () => {
    mockReviewAPI.results.push(mockReviewAPI.results[0]);
    mockReviewAPI.results.push(mockReviewAPI.results[0]);
    mockReviewAPI.results.push(mockReviewAPI.results[0]);
    const reply = { status: 200, data: mockReviewAPI };
    const user = userEvent.setup();
    axios.get = jest.fn().mockResolvedValue(reply);
    const rendered = render(<ReviewsList
      productId={40346}
      ratingFilter={{
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      }}
      metadata={mockMetadata}
    />);
    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(2);
    });
    await waitFor(() => {
      user.click(screen.getByRole('button'), { name: /More Reviews/ });
    });

    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(4);
    });
  });
});
