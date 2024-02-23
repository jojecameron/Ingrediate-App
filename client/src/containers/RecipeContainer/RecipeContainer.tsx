import { useState } from 'react';
import { Recipe } from '../../components';
import { RecipeContainerProps, Favorite } from '../../types';

const RecipeContainer = (props: RecipeContainerProps): JSX.Element => {
  const [favoriteMode, setFavoriteMode] = useState<boolean>(false);

  const {
    recipeList,
    deleteRecipe,
    favoriteRecipe,
    favoriteRecipes,
    setFavoriteRecipes,
    updateRecipeTitle
  } = props;

  const recipes = recipeList.map((recipe, i) => {
    return (
      <Recipe
        key={recipe.id}
        id={recipe.id}
        deleteRecipe={deleteRecipe}
        favoriteRecipe={favoriteRecipe}
        recipeTitle={recipe.recipeTitle}
        recipeText={recipe.recipeText}
        recipeLinkTitle={recipe.recipeLinkTitle}
        recipeLink={recipe.recipeLink}
        updateRecipeTitle={updateRecipeTitle}
      />
    );
  });

  const favorites = favoriteRecipes.map((favorite) => {
    return (
      <Recipe
        key={favorite.id}
        id={favorite.id}
        deleteRecipe={deleteRecipe}
        favoriteRecipe={favoriteRecipe}
        recipeTitle={favorite.recipeTitle}
        recipeText={favorite.recipeText}
        recipeLinkTitle={favorite.recipeLinkTitle}
        recipeLink={favorite.recipeLink}
        updateRecipeTitle={updateRecipeTitle}
        favorite={true}
      />
    );
  });

  return (
    <>
      <div className="containerTitle">
        {!favoriteMode ? (
          <>
            <h1 onClick={() => setFavoriteMode(false)} className="active">
              <em>Recipes</em>
            </h1>
            <h1 onClick={() => setFavoriteMode(true)} className="inactive">
              <em>Favorites</em>
              {favoriteRecipes.length > 0 ? (
                <span id="numFavorites">{favoriteRecipes.length}</span>
              ) : null}
            </h1>
          </>
        ) : (
          <>
            <h1 onClick={() => setFavoriteMode(false)} className="inactive">
              <em>Recipes</em>
            </h1>
            <h1 onClick={() => setFavoriteMode(true)} className="active">
              <em>Favorites</em>
            </h1>
          </>
        )}
      </div>
      <div className="RecipeContainer">
        <div className="recipeDisplay">
          {!favoriteMode ? recipes : favorites}
        </div>
      </div>
    </>
  );
};

export default RecipeContainer;
