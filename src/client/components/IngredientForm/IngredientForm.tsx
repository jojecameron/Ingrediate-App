import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ingredients from '../../ingredients/ingredients';
import { IngredientFormProps } from '../../types';

const IngredientForm = (props: IngredientFormProps): JSX.Element => {
  const { ingredientChoices, setIngredientChoices, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className="IngredientForm">
      <Autocomplete
        multiple
        id="autocompleteInput"
        options={ingredients}
        getOptionLabel={(option) => option.label}
        onChange={(event, value: { label: string }[]) =>
          setIngredientChoices(value)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Add Ingredients..."
          />
        )}
      />
      <input
        id="submit-button"
        type="submit"
        value="Generate Recipe"
        disabled={!ingredientChoices.length}
      />
    </form>
  );
};

export default IngredientForm;
