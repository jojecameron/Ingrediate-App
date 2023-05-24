import React, { Component } from 'react';
import IngredientForm from '../components/IngredientForm';
import RecipeContainer from './RecipeContainer';

const url = 'http://localhost:3000/generate'

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.ingredients = [];
    this.state.dishType = [];
    this.state.recipeList = [];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
    this.sendIngredientsToServer = this.sendIngredientsToServer.bind(this)
  }

  deleteRecipe(recipe) {
    console.log('deleteRecipe');
  }

  favoriteRecipe(recipe) {
    console.log('deleteRecipe');
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('handleSubmit is running');
    const listOfIngredients = [];
    this.state.ingredients.forEach(ingredient => {
        listOfIngredients.push(ingredient.label);
    })
    // send list of ingredients to Server
    this.sendIngredientsToServer(listOfIngredients);
  }

  sendIngredientsToServer = async (ingredients) => {
    if (!ingredients.length) {
      return alert('Please enter ingredients...');
    }
    console.log('ingredients to send to Server..', ingredients);
    const newState = this.state;
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // mode: 'no-cors',
        body: JSON.stringify( ingredients )
      })
      const data = await result.json();
      console.log(data);
      newState.recipeList.push(data);
      // console.log(newState.recipes);
      this.setState({...newState});
      console.log(this.state.recipeList);
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(value) {
    // console.log('Before', this.state);
    const newState = this.state;
    newState.ingredients = value;
    this.setState({...newState});
    // console.log('After', this.state);
  }

  render() {
    return (
      <div className="MainContainer">
        <h1><em>Ingrediate</em><br/><span>Recipe Generator</span></h1>
        <IngredientForm 
          id = 'IngredientForm'
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
        />
        <RecipeContainer 
          recipeList = {this.state.recipeList}
          deleteRecipe = {this.deleteRecipe}
          favoriteRecipe = {this.favoriteRecipe}
        />
      </div>
    );
  }
}

export default MainContainer;
