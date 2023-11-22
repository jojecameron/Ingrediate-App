export interface Recipe {
  recipe: string;
  id: string;
}

export interface Favorite {
  recipeTitle: string;
  recipeText: string;
  recipeLinkTitle: string;
  recipeLink: string;
}

export interface RecipeProps {
  id: string;
  deleteRecipe: (id: string) => void;
  favoriteRecipe: (isFavorite: boolean, recipe: Favorite) => void;
  recipeTitle: string;
  recipeText: string;
  recipeLinkTitle: string;
  recipeLink: string;
};

export interface RecipeContainerProps {
  recipeList: {recipe: string, id: string}[];
  deleteRecipe: (id: string) => void;
  favoriteRecipe: (isFavorite: boolean, recipe: Favorite) => void;
};