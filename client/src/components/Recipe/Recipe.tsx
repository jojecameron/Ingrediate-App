import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useState } from 'react';
import { RecipeProps } from '../../types';

const Recipe = (props: RecipeProps): JSX.Element => {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    deleteRecipe,
    favoriteRecipe,
    recipeTitle,
    recipeText,
    recipeLinkTitle,
    recipeLink,
  } = props;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    favoriteRecipe(isFavorite, {
      recipeTitle: recipeTitle,
      recipeText: recipeText,
      recipeLinkTitle: recipeLinkTitle,
      recipeLink: recipeLink,
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
      <a
        className="recipe-link"
        target="_blank"
        rel="noopener noreferrer"
        href={recipeLink}
      >
        {recipeLink}
      </a>
    </div>
  );
};
export default Recipe;
