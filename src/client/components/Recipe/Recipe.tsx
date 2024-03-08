import {
  FavoriteBorder,
  Favorite,
  DeleteOutline,
  DeleteForever,
  HeartBroken,
  OpenInFull,
} from '@mui/icons-material';
import { useState } from 'react';
import { RecipeProps } from '../../types';

const Recipe = (props: RecipeProps): JSX.Element => {
  const {
    id,
    deleteRecipe,
    favoriteRecipe,
    recipeTitle,
    recipeText,
    favorite,
    setRecipeModal,
  } = props;

  const [isFavorite, setIsFavorite] = useState(favorite || false);
  const [isDeleteHover, setIsDeleteHover] = useState(false);
  const [isFavoriteHover, setIsFavoriteHover] = useState(false);
  const [isExpandHover, setIsExpandHover] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    favoriteRecipe(true, {
      id: id,
      recipeTitle: recipeTitle,
      recipeText: recipeText,
    });
  };

  return (
    <div className="Recipe">
      <div className="recipe-header">
        {isFavorite ? (
          <>
            <button
              className="expand"
              onClick={() =>
                setRecipeModal({
                  isOpen: true,
                  recipe: {
                    recipeText: recipeText,
                    recipeTitle: recipeTitle,
                    id: id,
                  },
                })
              }
              onMouseEnter={() => setIsExpandHover(true)}
              onMouseLeave={() => setIsExpandHover(false)}
            >
              {isExpandHover ? (
                <>
                  <OpenInFull />
                  <span id="expand-memo" className="memo">
                    Expand
                  </span>
                </>
              ) : (
                <OpenInFull />
              )}
            </button>
            <div className="delete-invisible">
              {/* Placeholder to maintain space */}
              <DeleteOutline style={{ visibility: 'hidden' }} />
            </div>
          </>
        ) : (
          <button
            onMouseEnter={() => setIsDeleteHover(true)}
            onMouseLeave={() => setIsDeleteHover(false)}
            className="delete"
            onClick={() => deleteRecipe(id)}
          >
            {isDeleteHover ? (
              <>
                <DeleteForever color="error" />
                <span id="delete-memo" className="memo">
                  Delete recipe?
                </span>
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
            onClick={
              !isFavorite ? () => toggleFavorite() : () => deleteRecipe(id)
            }
          >
            <div className="favorite-container">
              {isFavorite && isFavoriteHover ? (
                <>
                  <HeartBroken color="error" />
                  <span id="delete-favorite-memo" className="memo">
                    Delete favorite?
                  </span>
                </>
              ) : (
                <>
                  {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                  {isFavoriteHover && (
                    <span id="favorite-memo" className="memo">
                      Favorite recipe?
                    </span>
                  )}
                </>
              )}
            </div>
          </button>
        </div>
      </div>
        <h3 className="recipe-title">
          {recipeTitle}
        </h3>
      <p className="recipe-text">{recipeText}</p>
    </div>
  );
};
export default Recipe;
