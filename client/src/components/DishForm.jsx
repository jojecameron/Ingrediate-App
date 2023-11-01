import * as React from "react";
import { useState, useEffect } from "react";

const DishForm = ({ setDishType, dishType }) => {

  const handleDishChange = (event) => {
    setDishType(event.target.name);
  };

  return (
    <form id="checkboxes">
      <div>
        <input
          type="checkbox"
          className="checkbox"
          name="breakfast"
          checked={dishType === "breakfast"}
          onChange={handleDishChange}
        />
        <label>Breakfast</label>
      </div>
      <div>
        <input
          type="checkbox"
          className="checkbox"
          name="lunch"
          checked={dishType === "lunch"}
          onChange={handleDishChange}        
        />
        <label>Lunch</label>
      </div>
      <div>
        <input
          type="checkbox"
          className="checkbox"
          name="dinner"
          checked={dishType === "dinner"}
          onChange={handleDishChange}       
        />
        <label>Dinner</label>
      </div>
      <div>
        <input
          type="checkbox"
          className="checkbox"
          name="dessert"
          checked={dishType === "dessert"}
          onChange={handleDishChange}        
        />
        <label>Dessert</label>
      </div>
    </form>
  );
};

export default DishForm;
