import React, { useState } from 'react';
import IngredientForm from '../components/IngredientForm';
import RecipeContainer from './RecipeContainer';
import DishForm from '../components/DishForm';
import Loading from '../components/Loading';

const url = 'http://localhost:3000/generate';
const favoritesUrl = 'http://localhost:3000/favorites';

const MainContainer = (props) => {
    const [ingredients, setIngredients] = useState([]);
    const [dishType, setDishType] = useState('Breakfast');
    const [recipeList, setRecipeList] = useState([]);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

  // on select favorite add to favoriteRecipes array, deselect favorite removes from array
  const favoriteRecipe = (recipe) => {
    const { isFavorite, recipeIndex } = recipe;
    if (isFavorite) {
      const favoritedRecipe = recipeList[recipeIndex];
      favoriteRecipes.push({ index: recipeIndex, recipe: favoritedRecipe });
      setFavoriteRecipes([{ index: recipeIndex, recipe: favoritedRecipe }, ...favoriteRecipes]);
      // TBD should throttle call to server
      // saveFavorites({ index: recipeIndex, recipe: favoritedRecipe });
    }
    if (favoriteRecipes.length) {
      if (!isFavorite) {
        const index = favoriteRecipes.findIndex((recipe) => {
          recipe.index === recipeIndex;
        });
        setFavoriteRecipes(favoriteRecipes.splice(index, 1));
        // TBD should throttle call to server
        // this.deleteFavorite(recipeIndex);
      }
    }
  }

  const deleteRecipe = () => {
    console.log('deleted recipe');
  }

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
    ingredients.forEach((ingredient) => {
      listOfIngredients.push(ingredient.label);
    });
    const dishAndIngredients = dishType.concat(listOfIngredients);
    console.log('this is dishAndIngredients', dishAndIngredients);
    console.log('this is listOfIngredients', listOfIngredients);
    sendIngredientsToServer(listOfIngredients);
  }

  // updates state for ingredients
  const handleChange = (value) => {
    setIngredients([value, ...ingredients ]);
  }

  // udpates state for dishType
  const handleDishChange = (value) => {
    setDishType(value);
  }

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
      <div className="MainContainer">
        <h1>
          <em>Ingrediate</em>
          <br />
          <span>Recipe Generator</span>
        </h1>
        <DishForm id="DishForm" handleDishChange={handleDishChange} />
        <IngredientForm
          id="IngredientForm"
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
        {isLoading ? <Loading /> : <br />}
        <RecipeContainer
          recipeList={recipeList}
          deleteRecipe={deleteRecipe}
          favoriteRecipe={favoriteRecipe}
        />
      </div>
    );
};

export default MainContainer;
