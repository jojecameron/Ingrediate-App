import Recipe from '../../components/Recipe/Recipe';
import { RecipeContainerProps } from '../../types';

const RecipeContainer = (props: RecipeContainerProps): JSX.Element => {
  const { recipeList, deleteRecipe, favoriteRecipe } = props;

  const recipes = recipeList.map((recipe, i) => {
    const splitRecipe = recipe.recipe.split('|');
    return (
      <Recipe
        key={`Recipe${i}`}
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
    <div className="RecipeContainer">
      <div className="containerTitle">
        <h1>
          <em>Recipes</em>
        </h1>
        <hr />
      </div>
      <div className="recipeDisplay">{recipes}</div>
    </div>
  );
};

export default RecipeContainer;
