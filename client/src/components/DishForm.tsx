import { DishFormProps, DishType } from "../types";

const DishForm = (props: DishFormProps): JSX.Element => {

  const { setDishType, dishType } = props;

  return (
    <form id="checkboxes">
      <div>
        <input
          type="radio"
          className="checkbox"
          name="breakfast"
          value="breakfast"
          checked={dishType === "breakfast"}
          onChange={(event) => setDishType(event.target.name as DishType)}
        />
        <label>Breakfast</label>
      </div>
      <div>
        <input
          type="radio"
          className="checkbox"
          name="lunch"
          value="lunch"
          checked={dishType === "lunch"}
          onChange={(event) => setDishType(event.target.name as DishType)}        
        />
        <label>Lunch</label>
      </div>
      <div>
        <input
          type="radio"
          className="checkbox"
          name="dinner"
          value="dinner"
          checked={dishType === "dinner"}
          onChange={(event) => setDishType(event.target.name as DishType)}       
        />
        <label>Dinner</label>
      </div>
      <div>
        <input
          type="radio"
          className="checkbox"
          name="dessert"
          value="dessert"
          checked={dishType === "dessert"}
          onChange={(event) => setDishType(event.target.name as DishType)}        
        />
        <label>Dessert</label>
      </div>
    </form>
  );
};

export default DishForm;
