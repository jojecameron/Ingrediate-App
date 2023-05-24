import React, { Component } from 'react';
import AutocompleteInput from '../components/IngredientForm';
import RecipeContainer from './RecipeContainer';

const url = 'http://localhost:3000/generate'

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.ingredients = [];
    this.state.dishType = [];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendIngredientsToServer = this.sendIngredientsToServer.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit is running');
    const listOfIngredients = [];
    this.state.ingredients.forEach(ingredient => {
        listOfIngredients.push(ingredient.label);
    })
    // send list of ingredients to Server
    this.sendIngredientsToServer(listOfIngredients);
  }

  sendIngredientsToServer = async (ingredients) => {
    console.log('ingredients to send to Server..', ingredients)
    // console.log(ingredients);
    // console.log(this.state);
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // mode: 'no-cors',
        body: JSON.stringify( ingredients )
    })
  }

  handleChange(value) {
    console.log('Before', this.state);
    const newState = this.state;
    newState.ingredients = value;
    this.setState({...newState});
    console.log('After', this.state);
  }

  render() {
    return (
      <div className="container">
        <h1>INGREDIATE</h1>
        <AutocompleteInput 
          handleChange={this.handleChange}
          handleSubmit ={this.handleSubmit}
        />
        <RecipeContainer />
      </div>
    );
  }
}

export default MainContainer;
