export interface RecipeProps {
    recipeIndex: number;
    deleteRecipe: VoidFunction;
    favoriteRecipe: (recipe: { isFavorite: boolean; recipeIndex: number }) => void;
    recipeTitle: string;
    recipeText: string;
    recipeLinkTitle: string;
    recipeLink: string;
  }

export interface RecipeContainerProps {
    recipeList: {recipe: string}[];
    deleteRecipe: VoidFunction;
    favoriteRecipe: (recipe: { isFavorite: boolean; recipeIndex: number }) => void;
  }