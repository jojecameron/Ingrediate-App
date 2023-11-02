export interface Recipe {
  recipe: string;
}

export interface Favorite {
  recipeTitle: string;
  recipeText: string;
  recipeLinkTitle: string;
  recipeLink: string;
}

export interface RecipeProps {
  deleteRecipe: VoidFunction;
  favoriteRecipe: (isFavorite: boolean, recipe: Favorite) => void;
  recipeTitle: string;
  recipeText: string;
  recipeLinkTitle: string;
  recipeLink: string;
};

export interface RecipeContainerProps {
  recipeList: {recipe: string}[];
  deleteRecipe: VoidFunction;
  favoriteRecipe: (isFavorite: boolean, recipe: Favorite) => void;
};