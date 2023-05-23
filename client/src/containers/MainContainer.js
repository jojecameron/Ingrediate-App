import React, { Component } from 'react';
import AutocompleteInput from '../components/IngredientForm';
import RecipeContainer from './RecipeContainer';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sendIngredients = this.sendIngredients.bind(this);
  }

  sendIngredients(value) {
    console.log(value);
  }

  render() {
    return (
      <div className="container">
        <h1>INGREDIATE</h1>
        <AutocompleteInput sendIngredients={this.sendIngredients} />
        <RecipeContainer />
      </div>
    );
  }
}

export default MainContainer;
