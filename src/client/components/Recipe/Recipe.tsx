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
  const {
    id,
    deleteRecipe,
    favoriteRecipe,
    recipeTitle,
    recipeText,
    favorite,
    updateRecipeTitle,
  } = props;

  const [isFavorite, setIsFavorite] = useState(favorite || false);
  const [isDeleteHover, setIsDeleteHover] = useState(false);
  const [isFavoriteHover, setIsFavoriteHover] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(recipeTitle);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleEnter = () => {
    if (title.length) {
      setIsEditingTitle(false);
      updateRecipeTitle(id, title, isFavorite);
    }
  };

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
          <div className="delete-invisible">
            {/* Placeholder to maintain space */}
            <DeleteOutline style={{ visibility: 'hidden' }} />
          </div>
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
            onClick={
              !isFavorite ? () => toggleFavorite() : () => deleteRecipe(id)
            }
          >
            <div className="favorite-container">
              {isFavorite && isFavoriteHover ? (
                <>
                  <HeartBroken color="error" />
                  <span className="memo">Delete favorite?</span>
                </>
              ) : (
                <>
                  {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                  {isFavoriteHover && (
                    <span className="memo">Favorite recipe?</span>
                  )}
                </>
              )}
            </div>
          </button>
        </div>
      </div>
      {!isEditingTitle ? (
        <h3 className="recipe-title" onClick={handleTitleClick}>
          {recipeTitle}
        </h3>
      ) : (
        <input
          className="recipe-title-edit"
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={() => handleEnter()}
          onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
          autoFocus
        />
      )}

      <p className="recipe-text">{recipeText}</p>
    </div>
  );
};
export default Recipe;
