import React from 'react';
import { render } from '@testing-library/react';
import App from '../../../../src/client/components/App/App';

test('renders a basic snapshot', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
