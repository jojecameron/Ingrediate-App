import React, { useState } from 'react';
import IngredientForm from '../components/IngredientForm';
import RecipeContainer from './RecipeContainer';
import DishForm from '../components/DishForm';
import Loading from '../components/Loading';

const url = 'http://localhost:3000/generate';
const favoritesUrl = 'http://localhost:3000/favorites';

const MainContainer = (props) => {
  const [ingredientChoices, setIngredientChoices] = useState([]);
  const [dishType, setDishType] = useState('breakfast');
  const [recipeList, setRecipeList] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const favoriteRecipe = ({ isFavorite, recipeIndex }) => {
    setFavoriteRecipes((currentFavorites) => {
      // If the recipe is favorited, add it to the favorites array
      if (isFavorite) {
        const favoritedRecipe = recipeList[recipeIndex];
        return [
          { index: recipeIndex, recipe: favoritedRecipe },
          ...currentFavorites,
        ];
      } else {
        // If the recipe is unfavorited, remove it from the favorites array
        return currentFavorites.filter(
          (favorite) => favorite.index !== recipeIndex
        );
      }
    });
  };

  const deleteRecipe = () => {
    console.log('deleted recipe');
  };

  const saveFavorites = async (favoriteObject) => {
    console.log('To send to server', favoriteObject);
    try {
      const result = await fetch(favoritesUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteObject),
      });
      const data = await result.json();
      console.log('ADDED TO DATABASE: ', data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFavorite = async (index) => {
    console.log('To send to server', index);
    try {
      const result = await fetch(favoritesUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index: index }),
      });
      const data = await result.json();
      console.log('DELETED FROM DATABASE: ', data);
    } catch (err) {
      console.log(err);
    }
  };

  // preps dishType and ingredients to be sent to server
  const handleSubmit = (event) => {
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
  const sendIngredientsToServer = async (ingredients) => {
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
        isLoading={isLoading}
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
