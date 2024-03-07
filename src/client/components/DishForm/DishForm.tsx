import { DishFormProps, DishType } from '../../types';

const DishForm = (props: DishFormProps): JSX.Element => {
  const { setDishType, dishType } = props;

  return (
    <div className="dish-form">
      <form id="checkboxes">
        <div className="radio-label">
          <label htmlFor="breakfast">Breakfast</label>
          <input
            type="radio"
            id="breakfast"
            className="checkbox"
            name="breakfast"
            value="breakfast"
            checked={dishType === 'breakfast'}
            onChange={(event) => setDishType(event.target.name as DishType)}
          />
        </div>
        <div className="radio-label">
          <label htmlFor="lunch">Lunch</label>
          <input
            type="radio"
            id="lunch"
            className="checkbox"
            name="lunch"
            value="lunch"
            checked={dishType === 'lunch'}
            onChange={(event) => setDishType(event.target.name as DishType)}
          />
        </div>
        <div className="radio-label">
          <label htmlFor="dinner">Dinner</label>
          <input
            type="radio"
            id="dinner"
            className="checkbox"
            name="dinner"
            value="dinner"
            checked={dishType === 'dinner'}
            onChange={(event) => setDishType(event.target.name as DishType)}
          />
        </div>
        <div className="radio-label">
          <label htmlFor="dessert">Dessert</label>
          <input
            type="radio"
            id="dessert"
            className="checkbox"
            name="dessert"
            value="dessert"
            checked={dishType === 'dessert'}
            onChange={(event) => setDishType(event.target.name as DishType)}
          />
        </div>
      </form>
    </div>
  );
};

export default DishForm;
