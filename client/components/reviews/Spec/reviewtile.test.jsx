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
import Reviews from '.../Reviews.jsx'

describe('Review tile', () => {
  test('Should render seller response if present', () => {
    const mockCallback = (() => {});
    const aReview = {
      review_id: 3,
      rating: 4,
      summary: 'I am liking these glasses',
      recommend: true,
      response: "Glad you're enjoying the product!",
      body: "They are very dark. But that's good because I'm in very sunny spots",
      date: '2019-06-23T00:00:00.000Z',
      reviewer_name: 'bigbrotherbenjamin',
      helpfulness: 5,
      photos: [],
    };
    render(
      <ReviewTile
        review={aReview}
        handleModalImgChange={mockCallback}
        handleAPIClick={mockCallback}
        markedAsHelpful
      />,
    );
    expect(screen.getByText(new RegExp(aReview.response))).toBeInTheDocument();
    expect(screen.getByText('✓ I recommend this product')).toBeInTheDocument();
  });
  test('Should not render "I recommend this product" or seller response if not present', () => {
    const mockCallback = (() => {});
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
    render(
      <ReviewTile
        review={aReview}
        handleModalImgChange={mockCallback}
        handleAPIClick={mockCallback}
        markedAsHelpful
      />,
    );
    expect(screen.queryByText(/Response/)).toBe(null);
    expect(screen.queryByText('✓ I recommend this product')).not.toBeInTheDocument();
  });
  test('Should render photos', () => {
    const mockCallback = (() => {});
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
      photos: ['https://i.imgur.com/E6cvpNw.jpeg', 'https://i.imgur.com/E6cvpNw.jpeg'],
    };
    render(
      <ReviewTile
        review={aReview}
        handleModalImgChange={mockCallback}
        handleAPIClick={mockCallback}
        markedAsHelpful
      />,
    );
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
  test('Should render helpful and report button', async () => {
    const reply = { status: 201 };
    axios.get = jest.fn().mockResolvedValue(reply);
    const user = userEvent.setup();

    const mockCallback = (() => { axios.get(); });
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
      photos: ['https://i.imgur.com/E6cvpNw.jpeg', 'https://i.imgur.com/E6cvpNw.jpeg'],
    };
    render(
      <ReviewTile
        review={aReview}
        handleModalImgChange={mockCallback}
        handleAPIClick={mockCallback}
        markedAsHelpful={{ 3: false }}
      />,
    );
    expect(screen.queryByText(/Yes/)).toBeInTheDocument();
    expect(screen.queryByText(/Was this review helpful/)).toBeInTheDocument();
    await waitFor(() => {
      user.click(screen.getByRole('button', { name: /Yes/ }));
    });
  });
  test('Should if review is already marked as helpful, button should be disabled', async () => {
    const reply = { status: 201 };
    axios.get = jest.fn().mockResolvedValue(reply);
    const user = userEvent.setup();

    const mockCallback = (() => { axios.get(); });
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
      photos: ['https://i.imgur.com/E6cvpNw.jpeg', 'https://i.imgur.com/E6cvpNw.jpeg'],
    };
    render(
      <ReviewTile
        review={aReview}
        handleModalImgChange={mockCallback}
        handleAPIClick={mockCallback}
        markedAsHelpful={{ 3: true }}
      />,
    );
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Yes/ })).toHaveAttribute('disabled');
    });
  });
});

