/**
 * `DishForm` is a component that allows the user to select a dish type from a list of options.
 * It takes two props:
 * - `dishType`: The currently selected dish type. Should be one of 'breakfast', 'lunch', 'dinner', or 'dessert'.
 * - `setDishType`: A function that's called when the user selects a new dish type.
 *
 * This test suite checks that the `DishForm` component works as expected.
 */

import React from 'react';
import { render } from '@testing-library/react';
import DishForm from '../../../../src/client/components/DishForm/DishForm';

function createMockProps(
  dishType: 'breakfast' | 'lunch' | 'dinner' | 'dessert',
) {
  return {
    setDishType: jest.fn(),
    dishType,
  };
}

describe('DishForm', () => {
  test('renders a basic snapshot', () => {
    const mockProps = createMockProps('breakfast');
    const { container } = render(<DishForm {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  const dishTypes = ['breakfast', 'lunch', 'dinner', 'dessert'] as const;

  dishTypes.forEach((dishType) => {
    test(`renders a snapshot for dishType: ${dishType}`, () => {
      const mockProps = createMockProps(dishType);
      const { container } = render(<DishForm {...mockProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  test('has initial dishType state set to breakfast', () => {
    const mockProps = createMockProps('breakfast');
    const { getByLabelText } = render(<DishForm {...mockProps} />);
    const button = getByLabelText('Breakfast') as HTMLInputElement;
    expect(button.checked).toBe(true);
  });

  test('handles a dishType change to lunch', () => {
    const mockProps = createMockProps('breakfast');
    const { getByLabelText } = render(<DishForm {...mockProps} />);
    const button = getByLabelText('Lunch') as HTMLInputElement;
    button.click();
    expect(mockProps.setDishType).toHaveBeenCalledWith('lunch');
    expect(mockProps.setDishType).toHaveBeenCalledTimes(1);
  });

  test('handles a dishType change to dinner', () => {
    const mockProps = createMockProps('breakfast');
    const { getByLabelText } = render(<DishForm {...mockProps} />);
    const button = getByLabelText('Dinner') as HTMLInputElement;
    button.click();
    expect(mockProps.setDishType).toHaveBeenCalledWith('dinner');
    expect(mockProps.setDishType).toHaveBeenCalledTimes(1);
  });

  test('handles a dishType change to dessert', () => {
    const mockProps = createMockProps('breakfast');
    const { getByLabelText } = render(<DishForm {...mockProps} />);
    const button = getByLabelText('Dessert') as HTMLInputElement;
    button.click();
    expect(mockProps.setDishType).toHaveBeenCalledWith('dessert');
    expect(mockProps.setDishType).toHaveBeenCalledTimes(1);
  });

  test('handles a dishType change to breakfast', () => {
    const mockProps = createMockProps('dinner');
    const { getByLabelText } = render(<DishForm {...mockProps} />);
    const button = getByLabelText('Breakfast') as HTMLInputElement;
    button.click();
    expect(mockProps.setDishType).toHaveBeenCalledWith('breakfast');
    expect(mockProps.setDishType).toHaveBeenCalledTimes(1);
  });

  test('has only one dishType selected at a time', () => {
    const mockProps = createMockProps('breakfast');
    const { getAllByRole } = render(<DishForm {...mockProps} />);
    const buttons = getAllByRole('radio') as HTMLInputElement[];
    buttons.forEach((button) => {
      if (button.value !== mockProps.dishType) {
        expect(button.checked).toBe(false);
      } else {
        expect(button.checked).toBe(true);
      }
    });
  });

  test('has each label correctly associated with its input', () => {
    const mockProps = createMockProps('breakfast');
    const { getByLabelText } = render(<DishForm {...mockProps} />);
    const labels = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];
    labels.forEach((label) => {
      const button = getByLabelText(label) as HTMLInputElement;
      expect(button).toBeTruthy();
    });
  });
});
