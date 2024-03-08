import { RecipeModal } from '../types/modal.types';

export interface Recipe {
  recipeTitle: string;
  recipeText: string;
  id: string;
}

export interface Favorite {
  id: string;
  recipeTitle: string;
  recipeText: string;
  favorite?: boolean;
}

export interface RecipeProps {
  id: string;
  deleteRecipe: (id: string) => void;
  favoriteRecipe: (isFavorite: boolean, recipe: Favorite) => void;
  recipeTitle: string;
  recipeText: string;
  favorite?: boolean;
  updateRecipeTitle: (
    id: string,
    newTitle: string,
    isFavorite: boolean,
  ) => void;
  setRecipeModal: React.Dispatch<React.SetStateAction<RecipeModal>>;
}

export interface RecipeContainerProps {
  recipeList: {
    recipeTitle: string;
    recipeText: string;
    id: string;
  }[];
  deleteRecipe: (id: string) => void;
  favoriteRecipe: (isFavorite: boolean, recipe: Favorite) => void;
  favoriteRecipes: Favorite[];
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<Favorite[]>>;
  updateRecipeTitle: (
    id: string,
    newTitle: string,
    isFavorite: boolean,
  ) => void;
  favoriteMode: boolean;
  setFavoriteMode: React.Dispatch<React.SetStateAction<boolean>>;
  setRecipeModal: React.Dispatch<React.SetStateAction<RecipeModal>>;
}

export interface ExpandedRecipeProps {
  recipeModal: RecipeModal;
  updateRecipeTitle: (id: string, title: string, isFavorite: boolean) => void;
}
