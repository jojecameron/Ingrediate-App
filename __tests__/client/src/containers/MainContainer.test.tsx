import React from 'react';
import { render } from '@testing-library/react'; 
import MainContainer from '../../../../client/src/containers/MainContainer/MainContainer';

test('renders a basic snapshot', () => {
  const { container } = render(<MainContainer />);
  expect(container).toMatchSnapshot(); 
});
