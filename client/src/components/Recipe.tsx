import * as React from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useState } from 'react';

interface RecipeProps {
  recipeIndex: number;
  deleteRecipe: () => void;
  favoriteRecipe: (recipe: { isFavorite: boolean; recipeIndex: number }) => void;
  recipeTitle: string;
  recipeText: string;
  recipeLinkTitle: string;
  recipeLink: string;
}

const Recipe: React.FC<RecipeProps> = ({
  recipeIndex,
  deleteRecipe,
  favoriteRecipe,
  recipeTitle,
  recipeText,
  recipeLinkTitle,
  recipeLink
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    favoriteRecipe({
      isFavorite: newIsFavorite,
      recipeIndex: recipeIndex,
    });
  };

  return (
    <div className="Recipe">
      <div className="recipe-header">
        <h3 className="recipe-title">{recipeTitle}</h3>
        <button className="favorite" onClick={toggleFavorite}>
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </button>
      </div>
      <p className="recipe-text">{recipeText}</p>
      <h3 className="recipe-linkTitle">{recipeLinkTitle}</h3>
      <a className="recipe-link" target="_blank" href={`${recipeLink}`}>
        {recipeLink}
      </a>
    </div>
  );
};
export default Recipe;
