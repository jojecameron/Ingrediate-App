import React, { Component } from 'react';
import IngredientForm from '../components/IngredientForm';
import RecipeContainer from './RecipeContainer';
import DishForm from '../components/DishForm';
import Loading from '../components/Loading';

const url = 'http://localhost:3000/generate';
const favoritesUrl = 'http://localhost:3000/favorites';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.ingredients = [];
    this.state.dishType = [];
    this.state.recipeList = [];
    this.state.favoriteRecipes = [];
    this.state.isLoading = false;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDishChange = this.handleDishChange.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
    this.sendIngredientsToServer = this.sendIngredientsToServer.bind(this);
    this.saveFavorites = this.saveFavorites.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  // on select favorite add to favoriteRecipes array, deselect favorite removes from array
  favoriteRecipe(recipe) {
    const { isFavorite, recipeIndex } = recipe;
    const { favoriteRecipes } = this.state;
    if (isFavorite) {
      const favoritedRecipe = this.state.recipeList[recipeIndex];
      favoriteRecipes.push({ index: recipeIndex, recipe: favoritedRecipe });
      this.setState({ favoriteRecipes });
      this.saveFavorites({ index: recipeIndex, recipe: favoritedRecipe });
    }
    if (this.state.favoriteRecipes.length) {
      if (!isFavorite) {
        const index = favoriteRecipes.findIndex((recipe) => {
          recipe.index === recipeIndex;
        });
        favoriteRecipes.splice(index, 1);
        this.setState({ favoriteRecipes });
        this.deleteFavorite(recipeIndex);
      }
    }
  }

  saveFavorites = async (favoriteObject) => {
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

  deleteFavorite = async (index) => {
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
  handleSubmit(event) {
    event.preventDefault();
    const listOfIngredients = [];
    this.state.ingredients.forEach((ingredient) => {
      listOfIngredients.push(ingredient.label);
    });
    const { dishType } = this.state;
    const dishAndIngredients = dishType.concat(listOfIngredients);
    this.sendIngredientsToServer(listOfIngredients);
  }

  // updates state for ingredients
  handleChange(value) {
    const newState = this.state;
    newState.ingredients = value;
    this.setState({ ...newState });
  }

  // udpates state for dishType
  handleDishChange(value) {
    const newState = this.state;
    newState.dishType = [value];
    this.setState({ ...newState });
  }

  // makes post request to server, handles loading state change, receives data and udpates state
  sendIngredientsToServer = async (ingredients) => {
    if (!ingredients.length) {
      return alert('Please enter ingredients...');
    }
    const newState = this.state;
    newState.isLoading = true;
    this.setState({ ...newState });
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredients),
      });
      const data = await result.json();
      newState.recipeList.push(data);
      newState.isLoading = false;
      this.setState({ ...newState });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="MainContainer">
        <h1>
          <em>Ingrediate</em>
          <br />
          <span>Recipe Generator</span>
        </h1>
        <DishForm id="DishForm" handleDishChange={this.handleDishChange} />
        <IngredientForm
          id="IngredientForm"
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          isLoading={this.state.isLoading}
        />
        {this.state.isLoading ? <Loading /> : <br />}
        <RecipeContainer
          recipeList={this.state.recipeList}
          deleteRecipe={this.deleteRecipe}
          favoriteRecipe={this.favoriteRecipe}
        />
      </div>
    );
  }
}

export default MainContainer;
