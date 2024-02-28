import React from 'react';
import { render } from '@testing-library/react'; 
import MainContainer from '../../../../src/client/containers/MainContainer/MainContainer';

test('renders a basic snapshot', () => {
  const { container } = render(<MainContainer />);
  expect(container).toMatchSnapshot(); 
});
