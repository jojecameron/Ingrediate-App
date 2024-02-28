import { DishFormProps, DishType } from '../../types';

const DishForm = (props: DishFormProps): JSX.Element => {
  const { setDishType, dishType } = props;

  return (
    <form id="checkboxes">
      <div>
        <input
          type="radio"
          id="breakfast"
          className="checkbox"
          name="breakfast"
          value="breakfast"
          checked={dishType === 'breakfast'}
          onChange={(event) => setDishType(event.target.name as DishType)}
        />
        <label htmlFor="breakfast">Breakfast</label>
      </div>
      <div>
        <input
          type="radio"
          id="lunch"
          className="checkbox"
          name="lunch"
          value="lunch"
          checked={dishType === 'lunch'}
          onChange={(event) => setDishType(event.target.name as DishType)}
        />
        <label htmlFor="lunch">Lunch</label>
      </div>
      <div>
        <input
          type="radio"
          id="dinner"
          className="checkbox"
          name="dinner"
          value="dinner"
          checked={dishType === 'dinner'}
          onChange={(event) => setDishType(event.target.name as DishType)}
        />
        <label htmlFor="dinner">Dinner</label>
      </div>
      <div>
        <input
          type="radio"
          id="dessert"
          className="checkbox"
          name="dessert"
          value="dessert"
          checked={dishType === 'dessert'}
          onChange={(event) => setDishType(event.target.name as DishType)}
        />
        <label htmlFor="dessert">Dessert</label>
      </div>
    </form>
  );
};

export default DishForm;
