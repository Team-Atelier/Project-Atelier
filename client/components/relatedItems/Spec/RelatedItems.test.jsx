import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RelatedItems from '../RelatedItems.jsx';

test('renders RelatedProductsList component', () => {
  render(<RelatedItems />);

  expect(getByText('You might like...')).toBeInTheDocument();
});
