import * as React from 'react';
import { useState, useEffect } from 'react';

const Recipe = (props) => (
  <div className="Recipe" >
    <div className="recipe-header">
      <h3 className="recipe-title">{props.recipeTitle}</h3>
      <button className="favorite"></button>
    </div>
    <p className="recipe-text">{props.recipeText}</p>
    <h3 className="recipe-linkTitle">{props.recipeLinkTitle}</h3>
    <a className="recipe-link" target="_blank" href={`${props.recipeLink}`}>{props.recipeLink}</a>
  </div>
)

export default Recipe;
