import React from 'react';
import { render } from '@testing-library/react';
import DishForm from '../../../../client/src/components/DishForm/DishForm';

test('renders a basic snapshot', () => {
  const mockProps = {
    setDishType: jest.fn(),
    dishType: 'breakfast' as 'breakfast' | 'lunch' | 'dinner' | 'dessert',
  };

  const { container } = render(<DishForm {...mockProps} />);
  expect(container).toMatchSnapshot();
});

const dishTypes = ['breakfast', 'lunch', 'dinner', 'dessert'] as const;

dishTypes.forEach((dishType) => {
  test(`renders a snapshot for dishType: ${dishType}`, () => {
    const mockProps = {
      setDishType: jest.fn(),
      dishType,
    };

    const { container } = render(<DishForm {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});