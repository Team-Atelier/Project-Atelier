/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/no-deprecated */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import ReviewTile from '../ReviewTile.jsx';
import Reviews from '../Reviews.jsx';

const aReview = {
  review_id: 3,
  rating: 4,
  summary: 'I am liking these glasses',
  recommend: false,
  response: null,
  body: "They are very dark. But that's good because I'm in very sunny spots",
  date: '2019-06-23T00:00:00.000Z',
  reviewer_name: 'bigbrotherbenjamin',
  helpfulness: 5,
  photos: [],
};
const mockMetadata = {
  product_id: '40346',
  ratings: {
    1: '0',
    2: '1',
    3: '1',
    4: '1',
    5: '1',
  },
  recommended: {
    false: '2',
    true: '2',
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
describe('Test review length validation', () => {
  test('should properly add and reset images, and track of new review info state', async () => {
    const getReviewsReply = { status: 200, data: mockReviewAPI };
    const user = userEvent.setup();
    const mockProp = jest.fn(() => {});
    axios.get = jest.fn().mockResolvedValue(getReviewsReply);
    axios.post = jest.fn().mockResolvedValue({ status: 200 });
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const component = render(
      <Reviews
        productId="40346"
        metadata={mockMetadata}
        reloadReviews={mockProp}
      />,
    );
    await user.click(screen.getByRole('button', { name: /Add review/ }));

    const body = await screen.getByRole('textbox', { name: /honest review/ });
    const nickname = await screen.getByRole('textbox', { name: /name/ });
    const email = await screen.getByRole('textbox', { name: /Email/ });
    const addImg = await screen.getByRole('textbox', { name: /Upload images of product/ });
    const reccomend = component.container.querySelector('radio[name="reccomend"]');
    await user.click(reccomend, { name: /Yes/ });

    await user.type(nickname, 'Chris');
    await user.type(email, 'chris');
    await user.type(body, '0'.repeat(50));
    await user.type(addImg, 'https://i.imgur.com/E6cvpNw.jpeg');
    await user.click(screen.getByRole('button', { name: /Insert image/ }));
    await user.click(screen.getByRole('button', { name: /Submit review/ }));
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    });
    await user.click(screen.getByRole('button', { name: /Insert image/ }));
  });
});
