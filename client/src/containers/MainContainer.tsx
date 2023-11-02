import { useState } from 'react';
import IngredientForm from '../components/IngredientForm';
import RecipeContainer from './RecipeContainer';
import DishForm from '../components/DishForm';
import Loading from '../components/Loading';
import { DishType, Recipe, Favorite } from '../types';

const url = 'http://localhost:3000/generate';
const favoritesUrl = 'http://localhost:3000/favorites';

interface Ingredient {
  label: string;
}

const MainContainer = (): JSX.Element => {
  const [ingredientChoices, setIngredientChoices] = useState<Ingredient[]>([]);
  const [dishType, setDishType] = useState<DishType>('breakfast');
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const favoriteRecipe = (isFavorite: boolean, recipe: Favorite) => {
    setFavoriteRecipes((currentFavorites) => {
      if (isFavorite) {
        return [...currentFavorites, recipe];
      } else {
        return currentFavorites.filter((fav) => fav.recipeTitle !== recipe.recipeTitle);
      }
    });
  };

  // stores favorited recipes in db
  const saveFavorites = async (favorites: Favorite[]) => {
    try {
      const result = await fetch(favoritesUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteRecipes),
      });
      const data = await result.json();
      console.log('ADDED TO DATABASE: ', data);
    } catch (err) {
      console.log(err);
    }
  };

  // preps dishType and ingredients to be sent to server
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const listOfIngredients = [];
    ingredientChoices.forEach((ingredient) => {
      listOfIngredients.push(ingredient.label);
    });
    listOfIngredients.push(dishType);
    console.log(listOfIngredients);
    sendIngredientsToServer(listOfIngredients);
  };

  // makes post request to server, handles loading state change, receives data and udpates state
  const sendIngredientsToServer = async (ingredients: string[]) => {
    if (!ingredients.length) {
      return alert('Please enter ingredients...');
    }
    setIsLoading(true);
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredients),
      });
      const data = await result.json();
      setRecipeList([data, ...recipeList]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRecipe = () => {
    console.log('deleted recipe');
  };

  return (
    <section className="MainContainer">
      <h1>
        <em>Ingrediate</em>
        <br />
        <span>Recipe Generator</span>
      </h1>
      <DishForm 
        setDishType={setDishType} 
        dishType={dishType} 
      />
      <IngredientForm
        handleSubmit={handleSubmit}
        ingredientChoices={ingredientChoices}
        setIngredientChoices={setIngredientChoices}
      />
      {isLoading ? <Loading /> : <br />}
      <RecipeContainer
        recipeList={recipeList}
        deleteRecipe={deleteRecipe}
        favoriteRecipe={favoriteRecipe}
      />
    </section>
  );
};

export default MainContainer;
