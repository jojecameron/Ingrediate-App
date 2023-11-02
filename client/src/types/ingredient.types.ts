export interface IngredientFormProps {
  ingredientChoices: {label: string}[] | [];
  setIngredientChoices: (ingredients: {label: string}[]) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};