export interface IngredientFormProps {
  setIngredientChoices: (ingredients: {label: string}[]) => void;
  handleSubmit: VoidFunction;
};