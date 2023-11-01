// IngredientForm.js
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ingredients from '../ingredients/ingredients';

const IngredientForm = ({ setIngredientChoices, handleSubmit }) => {
  
  return (
    <form onSubmit={handleSubmit} className="IngredientForm">
      <Autocomplete
        multiple
        id="autocompleteInput"
        options={ingredients}
        getOptionLabel={(option) => option.label}
        onChange={(event, value) => setIngredientChoices(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Add Ingredients..."
          />
        )}
      />
      <input id="submit-button" type="submit" value="Generate Recipe" />
    </form>
  );
};

export default IngredientForm;
