import {
  FavoriteBorder,
  Favorite,
  DeleteOutline,
  DeleteForever,
  HeartBroken,
} from '@mui/icons-material';
import { useState } from 'react';
import { RecipeProps } from '../../types';

const Recipe = (props: RecipeProps): JSX.Element => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDeleteHover, setIsDeleteHover] = useState(false);
  const [isFavoriteHover, setIsFavoriteHover] = useState(false);

  const {
    index,
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
        {isFavorite ? (
          <div className="delete-invisible">
            {/* Placeholder to maintain space */}
            <DeleteOutline style={{ visibility: 'hidden' }} />
          </div>
        ) : (
          <button
            onMouseEnter={() => setIsDeleteHover(true)}
            onMouseLeave={() => setIsDeleteHover(false)}
            className="delete"
            onClick={() => deleteRecipe(index)}
          >
            {isDeleteHover ? (
              <>
                <DeleteForever color="error" />
                <span className="memo">Delete recipe?</span>
              </>
            ) : (
              <DeleteOutline />
            )}
          </button>
        )}
        <div className="favorite-wrapper">
          <button
            className="favorite"
            onMouseEnter={() => setIsFavoriteHover(true)}
            onMouseLeave={() => setIsFavoriteHover(false)}
            onClick={() => toggleFavorite()}
          >
            <div className="favorite-container">
              {isFavorite && isFavoriteHover ? (
                <>
                  <HeartBroken color="error" />
                  <span className="memo">Unfavorite?</span>
                </>
              ) : (
                <>
                  {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                  {isFavoriteHover && (
                    <span className="memo">
                      {isFavorite ? 'Unfavorite recipe?' : 'Favorite recipe?'}
                    </span>
                  )}
                </>
              )}
            </div>
          </button>
        </div>
      </div>
      <h3 className="recipe-title">{recipeTitle}</h3>
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
