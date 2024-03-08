import React from 'react';
import { render } from '@testing-library/react';
import RecipeContainer from '../../../../src/client/containers/RecipeContainer/RecipeContainer';

const mockProps = {
  recipeList: [],
  deleteRecipe: jest.fn(),
  favoriteRecipe: jest.fn(),
  favoriteRecipes: [],
  setFavoriteRecipes: jest.fn(),
  updateRecipeTitle: jest.fn(),
  favoriteMode: false,
  setFavoriteMode: jest.fn(),
  setRecipeModal: jest.fn(),
};

test('renders a basic snapshot', () => {
  const { container } = render(<RecipeContainer {...mockProps} />);
  expect(container).toMatchSnapshot();
});
