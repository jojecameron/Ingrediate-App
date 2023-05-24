import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ingredients from '../ingredients/ingredients';
import { useState, useEffect } from 'react';

const IngredientForm = (props) => {
  const [ ingredientChoices, setIngredientChoices ] = useState([]);

  const handleIngredients = (event, value) => {
    // console.log('handleIngredients is running.');
    setIngredientChoices(value);
  }

  useEffect(() => {
    // console.log(ingredientChoices);
    props.handleChange(ingredientChoices);
  }, [ingredientChoices]);

  return (
    <form onSubmit={props.handleSubmit} className='IngredientForm'>
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
          // label="Ingredients"
          placeholder="Add Ingredients..."
        />
        )}
      />
      <input id="submit-button" type="submit" value="Generate Recipe"/>
    </form>
  );
}


export default IngredientForm;