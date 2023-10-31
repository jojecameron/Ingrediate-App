import * as React from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const Recipe = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };

  useEffect(() => {
    props.favoriteRecipe({
      isFavorite: isFavorite,
      recipeIndex: props.recipeIndex,
    });
  }, [isFavorite]);

  return (
    <div className="Recipe">
      <div className="recipe-header">
        <h3 className="recipe-title">{props.recipeTitle}</h3>
        <button className="favorite" onClick={toggleFavorite}>
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </button>
      </div>
      <p className="recipe-text">{props.recipeText}</p>
      <h3 className="recipe-linkTitle">{props.recipeLinkTitle}</h3>
      <a className="recipe-link" target="_blank" href={`${props.recipeLink}`}>
        {props.recipeLink}
      </a>
    </div>
  );
};
export default Recipe;
