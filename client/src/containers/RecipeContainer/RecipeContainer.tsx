import { useState } from 'react';
import { Recipe } from '../../components';
import { RecipeContainerProps } from '../../types';

const RecipeContainer = (props: RecipeContainerProps): JSX.Element => {
  const [favoriteMode, setFavoriteMode] = useState<boolean>(false);

  const { recipeList, deleteRecipe, favoriteRecipe } = props;

  const recipes = recipeList.map((recipe, i) => {
    const splitRecipe = recipe.recipe.split('|');
    return (
      <Recipe
        key={recipe.id}
        id={recipe.id}
        deleteRecipe={deleteRecipe}
        favoriteRecipe={favoriteRecipe}
        recipeTitle={splitRecipe[0]}
        recipeText={splitRecipe[1]}
        recipeLinkTitle={splitRecipe[2]}
        recipeLink={splitRecipe[3]}
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
            <h1 onClick={() => setFavoriteMode(true)} className='inactive'>
              <em>Favorites</em>
            </h1>
          </>
        ) : (
          <>
            <h1 onClick={() => setFavoriteMode(false)} className='inactive'>
              <em>Recipes</em>
            </h1>
            <h1 onClick={() => setFavoriteMode(true)} className="active">
              <em>Favorites</em>
            </h1>
          </>
        )}
      </div>
      <div className="RecipeContainer">
        <div className="recipeDisplay">{recipes}</div>
      </div>
    </>
  );
};

export default RecipeContainer;
