export interface Recipe {
  recipeTitle: string;
  recipeText: string;
  recipeLinkTitle: string;
  recipeLink: string;
  id: string;
}

export interface Favorite {
  id: string;
  recipeTitle: string;
  recipeText: string;
  recipeLinkTitle: string;
  recipeLink: string;
  favorite?: boolean;
}

export interface RecipeProps {
  id: string;
  deleteRecipe: (id: string) => void;
  favoriteRecipe: (isFavorite: boolean, recipe: Favorite) => void;
  recipeTitle: string;
  recipeText: string;
  recipeLinkTitle: string;
  recipeLink: string;
  favorite?: boolean;
}

export interface RecipeContainerProps {
  recipeList: { recipeTitle: string;
    recipeText: string;
    recipeLinkTitle: string;
    recipeLink: string;
    id: string }[];
  deleteRecipe: (id: string) => void;
  favoriteRecipe: (isFavorite: boolean, recipe: Favorite) => void;
  favoriteRecipes: Favorite[];
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<Favorite[]>>;
}
