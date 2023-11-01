import React, { useState } from 'react';
import Recipe from '../components/Recipe';

const RecipeContainer = (props) => {

  // Handle recipe components displaying in container
  
    const recipes = props.recipeList.map((recipe, i) => {
      //   console.log('recipe being generated',recipe.recipe, i);
      const splitRecipe = recipe.recipe.split('|');
      //   console.log('this is splitRecipe[1]',splitRecipe[1]);
      return (
        <Recipe
          key={`Recipe${i}`}
          recipeIndex={i}
          deleteRecipe={props.deleteRecipe}
          favoriteRecipe={props.favoriteRecipe}
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
}

export default RecipeContainer;
