import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ingredients from '../ingredients/ingredients';
import { useState, useEffect } from 'react';

// Will want to create callback function in parent component, pass down on props
// put an invocation to callback in handleIngredients to send state up
// when submit is detected in parent component, state of ingredientChoices is available and can send to API request

const IngredientForm = () => {
  const [ ingredientChoices, setIngredientChoices ] = useState([]);

  const handleIngredients = (event, value) => {
    console.log('handleIngredients is running.');
    setIngredientChoices(value);
  }

  const handleSubmit = (event, value)  => {
    event.preventDefault();
    console.log('handleSubmit is running');
    // console.log(ingredientChoices);
    // process ingredient choices
    const listOfIngredients = [];
    ingredientChoices.forEach(ingredient => {
        listOfIngredients.push(ingredient.label);
    })
    // make request with list of Ingredients
    // console.log(listOfIngredients);
    
  }

  useEffect(() => {
    console.log(ingredientChoices);
  }, [ingredientChoices]);

  return (
    <form onSubmit={handleSubmit}>
        <Autocomplete
            onChange={handleIngredients}
            multiple
            id="autocompleteInput"
            options={ingredients}
            getOptionLabel={(option) => option.label}
            // defaultValue={[ingredients[13]]}
            renderInput={(params) => (
            <TextField
                {...params}
                variant="standard"
                label="Ingredients"
                placeholder="Favorites"
            />
            )}
        />
        <input type="submit" />
    </form>
  );
}


export default IngredientForm;