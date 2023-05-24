import React, { Component } from 'react';
import Recipe from '../components/Recipe';


class RecipeContainer extends Component {
    constructor(props) {
      super(props);
    }

    

  // Handle recipe components displaying in container
  render() {
    const recipes = this.props.recipeList.map((recipe, i) => {
      console.log('recipe being generated',recipe.recipe, i);
      const splitRecipe = recipe.recipe.split('|');
      console.log(splitRecipe);
      return <Recipe 
        key={`Recipe${i}`}
        deleteRecipe = {this.props.deleteRecipe}
        favoriteRecipe = {this.props.favoriteRecipe}
        recipeTitle = {splitRecipe[0]}
        recipeText = {splitRecipe[1]}
        recipeLinkTitle = {splitRecipe[2]}
        recipeLink = {splitRecipe[3]}
      />
    });

    return( 
      <div className = "RecipeContainer"> 
        <div className='containerTitle'>
          <h1><em>Recipes</em></h1>
          <hr/>
        </div>
        <div className='recipeDisplay'>
          {recipes}
        </div>
      </div> 
    )
  }
}


export default RecipeContainer;