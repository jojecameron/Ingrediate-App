import React, { Component } from 'react';
import IngredientForm from '../components/IngredientForm';
import RecipeContainer from './RecipeContainer';
import DishForm from '../components/DishForm';
import Loading from '../components/Loading';

const url = 'http://localhost:3000/generate'

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.ingredients = [];
    this.state.dishType = [];
    this.state.recipeList = [];
    this.state.isLoading = false;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDishChange = this.handleDishChange.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
    this.sendIngredientsToServer = this.sendIngredientsToServer.bind(this)
  }

  // add logic to delete recipe from display
  deleteRecipe(recipe) {
    console.log('deleteRecipe');
  }
  
  // add logic to favorite a recipe on display
  favoriteRecipe(recipe) {
    console.log('favoriteRecipe');
  }

  // preps dishType and ingredients to be sent to server
  handleSubmit(event) {
    event.preventDefault();
    // console.log('handleSubmit is running');
    const listOfIngredients = [];
    this.state.ingredients.forEach(ingredient => {
        listOfIngredients.push(ingredient.label);
    })
    const { dishType } = this.state;
    const dishAndIngredients = dishType.concat(listOfIngredients)
    // console.log(dishAndIngredients)
    // console.log(this.state);
    // send list of ingredients to Server
    this.sendIngredientsToServer(listOfIngredients);
  }

  // updates state for ingredients
  handleChange(value) {
    // console.log('Before', this.state);
    // console.log(value)
    const newState = this.state;
    newState.ingredients = value;
    this.setState({...newState});
    // console.log('After', this.state);
  }

  // udpates state for dishType
  handleDishChange(value) {
    console.log('Before', this.state);
    const newState = this.state;
    newState.dishType = [ value ];
    this.setState({...newState});
    console.log('After', this.state);
  }

  // makes post request to server, handles loading state change, receives data and udpates state
  sendIngredientsToServer = async (ingredients) => {
    if (!ingredients.length) {
      return alert('Please enter ingredients...');
    }
    console.log('ingredients to send to Server..', ingredients);
    const newState = this.state;
    newState.isLoading = true;
    this.setState({...newState});
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
      newState.isLoading = false;
      // console.log(newState.recipes);
      this.setState({...newState});
      console.log(this.state.recipeList);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="MainContainer">
        <h1><em>Ingrediate</em><br/><span>Recipe Generator</span></h1>
        <DishForm 
          id = 'DishForm'
          handleDishChange = {this.handleDishChange}
        />
        <IngredientForm 
          id = 'IngredientForm'
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
        />
        {this.state.isLoading ? <Loading /> : <br/>}
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
