export type DishType = 'breakfast' | 'lunch' | 'dinner' | 'dessert';

export interface DishFormProps {
  setDishType: (dishType: DishType) => void;
  dishType: DishType;
}
