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
import Reviews from '../Reviews.jsx';

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
      body: 'Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review Long review',
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
    const user = userEvent.setup();
    mockReviewAPI.results.push(mockReviewAPI.results[0]);
    mockReviewAPI.results.push(mockReviewAPI.results[0]);
    mockReviewAPI.results.push(mockReviewAPI.results[0]);
    const reply = { status: 200, data: mockReviewAPI };
    axios.get = jest.fn().mockResolvedValue(reply);
    render(<ReviewsList
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
      user.click(screen.getByRole('button', { name: /More reviews/ }));
    });
    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(4);
    });
  });
});
const getReviewsReply = { status: 200, data: mockReviewAPI };
describe('Main review controller', () => {
  mockReviewAPI.results.push(mockReviewAPI.results[0]);
  mockReviewAPI.results.push(mockReviewAPI.results[0]);
  mockReviewAPI.results.push(mockReviewAPI.results[0]);
  axios.get = jest.fn().mockResolvedValue(mockReviewAPI);

  test('should open add review modal when "add reviews" clicked', async () => {
    const user = userEvent.setup();
    const mockProp = jest.fn(() => {});
    axios.get = jest.fn().mockResolvedValue(getReviewsReply);
    const component = render(
      <Reviews
        productId="40346"
        metadata={mockMetadata}
        reloadReviews={mockProp}
      />,
    );
    await user.click(screen.getByRole('button', { name: /Add review/ }));
    await waitFor(() => {
      expect(component.container.querySelector('#reviewsScreen')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId('rating-blurb')).toHaveTextContent('');
    });
  });
  test('should render the add review modal when button is clicked', async () => {
    const user = userEvent.setup();
    const mockProp = jest.fn(() => {});
    axios.get = jest.fn().mockResolvedValue(getReviewsReply);
    const component = render(
      <Reviews
        productId="40346"
        metadata={mockMetadata}
        reloadReviews={mockProp}
      />,
    );
    await user.click(screen.getByRole('button', { name: /Add review/ }));
    waitFor(() => {
      expect(component.container.querySelector('#reviewsScreen')).toBeInTheDocument();
    });
  });
});

test('should filter properly when filter ratings clicked', async () => {
  const user = userEvent.setup();
  const mockProp = jest.fn(() => {});
  axios.get = jest.fn().mockResolvedValue(getReviewsReply);
  const component = render(
    <Reviews
      productId="40346"
      metadata={mockMetadata}
      reloadReviews={mockProp}
    />,
  );
  await user.click(screen.getByRole('button', { name: /Add review/ }));
  waitFor(() => {
    expect(component.container.querySelector('#reviewsScreen')).toBeInTheDocument();
  });
  waitFor(() => {
    expect(component.container.querySelector('#five-star')).toHaveAttribute({ background: 'transparent' });
  });
  await user.hover(component.container.querySelector('#five-star'));
  waitFor(() => {
    expect(component.container.querySelector('#five-star')).toHaveAttribute({ background: 'green' });
  });
  await user.click(component.container.querySelector('#five-star'));
  waitFor(() => {
    expect(component.container.querySelector('#five-star')).toHaveAttribute({ background: 'darkgreen' });
    expect(screen.getAllByRole('article')).toHaveLength(1);
  });
  expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
  expect(screen.getByText(/Review filtering enabled/)).toBeInTheDocument();
  // await user.click(component.container.querySelector('#five-star'));
});

test('should properly add and reset images, and track of new review info state', async () => {
  const user = userEvent.setup();
  const mockProp = jest.fn(() => {});
  axios.get = jest.fn().mockResolvedValue(getReviewsReply);
  const component = render(
    <Reviews
      productId="40346"
      metadata={mockMetadata}
      reloadReviews={mockProp}
    />,
  );
  await user.click(screen.getByRole('button', { name: /Add review/ }));
  const reviewBodyField = await screen.getByRole('textbox', { name: /honest review/ });
  const nickname = await screen.getByRole('textbox', { name: /name/ });
  const addImg = await screen.getByRole('textbox', { name: /Upload images of product/ });
  await user.type(nickname, 'Chris');
  await user.type(reviewBodyField, '012345679');
  await user.type(addImg, 'https://i.imgur.com/BXlZVQh.jpeg');
  await waitFor(() => {
    expect(reviewBodyField).toHaveValue('012345679');
    expect(screen.getByText(/41 characters needed until 50 character minimum reached/)).toBeInTheDocument();
    expect(screen.getByText(/991 characters remaining/)).toBeInTheDocument();
  });
  await (() => {
    user.click(screen.getByRole('button', { name: /Insert image/ }));
  });
  await waitFor(() => {
    expect(screen.getByRole('img', { src: 'https://i.imgur.com/E6cvpNw.jpeg' })).toBeInTheDocument();
  //  user.click(screen.getByRole('button', { name: /Reset/ }));
  });
  // await waitFor(() => {
  //   expect(screen.getByRole('img', { src: 'https://i.imgur.com/E6cvpNw.jpeg' })).not.toBeInTheDocument();
  // });
});

test('should render clickable radio buttons by characteristic ', async () => {
  const user = userEvent.setup();
  const mockProp = jest.fn(() => {});
  // Your Experience
  // Characteristic
  axios.get = jest.fn().mockResolvedValue(getReviewsReply);
  const component = await render(
    <Reviews
      productId="40346"
      metadata={mockMetadata}
      reloadReviews={mockProp}
    />,
  );
  await user.click(screen.getByRole('button', { name: /Add review/ }));
  await waitFor(() => {
    expect(screen.getByRole('row', { name: /Fit/ })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /Length/ })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /Comfort/ })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /Quality/ })).toBeInTheDocument();
  });
  // await user.click(screen.getByRole('cell', { name: /Slightly uncomfortable/ }));
});
/*
test('should display text when stars are clicked', async () => {
  const user = userEvent.setup();
  const mockProp = jest.fn(() => {});
  // Your Experience
  // Characteristic
  axios.get = jest.fn().mockResolvedValue(getReviewsReply);
  const component = render(
    <Reviews
      productId="40346"
      metadata={mockMetadata}
      reloadReviews={mockProp}
    />,
  );
  await waitFor(async () => {
    user.click(component.getByRole('button', { name: /Add review/ }));
  });
  await waitFor(() => {
    user.hover(component.getByTestId('rsr-2'));
    // user.click(component.getByTestId('rsr-2'));
  });
  await waitFor(() => {
    expect(screen.getByTestId('fair')).toBeInTheDocument();
  });
});
*/
/*
test('hover/unhover', async () => {
  const user = userEvent.setup();
  const mockProp = jest.fn(() => {});
  // Your Experience
  // Characteristic
  axios.get = jest.fn().mockResolvedValue(getReviewsReply);
  const component = render(
    <Reviews
      productId="40346"
      metadata={mockMetadata}
      reloadReviews={mockProp}
    />,
  );

  const hoverBox1 = screen.getByTestId('rsr-1');
  const hoverBox2 = screen.getByTestId('rsr-2');
  const hoverBox3 = screen.getByTestId('rsr-3');
  const hoverBox4 = screen.getByTestId('rsr-4');
  const hoverBox5 = screen.getByTestId('rsr-5');

  await user.click(screen.getByRole('button', { name: /Add review/ }));
  await user.hover(hoverBox2);
  await waitFor(() => {
    expect(screen.getByTestId('fair')).toBeInTheDocument();
  });
  await user.unhover(hoverBox2);
  await user.hover(hoverBox1);

  await waitFor(() => {
    expect(screen.getByTestId('fair')).not.toBeInTheDocument();
    expect(screen.getByTestId('poor')).toBeInTheDocument();
  });
});
*/
test('elements appear on the screen', async () => {
  const user = userEvent.setup();
  const mockProp = jest.fn(() => {});
  // Your Experience
  // Characteristic
  axios.get = jest.fn().mockResolvedValue(getReviewsReply);

  const component = render(
    <Reviews
      productId="40346"
      metadata={mockMetadata}
      reloadReviews={mockProp}
    />,
  );

  await waitFor(() => {
    expect(screen.getByText(/reviewers recommend this product/)).toBeInTheDocument();
    expect(screen.getByText(/5 star/)).toBeInTheDocument();
    expect(screen.getByText(/4 star/)).toBeInTheDocument();
    expect(screen.getByText(/3 star/)).toBeInTheDocument();
    expect(screen.getByText(/2 star/)).toBeInTheDocument();
    expect(screen.getByText(/1 star/)).toBeInTheDocument();
    expect(screen.getAllByText('(1)')).toHaveLength(4);
    expect(screen.getByText(mockReviewAPI.results[0].body)).toBeInTheDocument();
  });
});
