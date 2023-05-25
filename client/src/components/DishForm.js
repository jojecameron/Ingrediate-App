import * as React from 'react';
import { useState, useEffect } from 'react';

const DishForm = (props) => {

  const [selectedDish, setSelectedDish] = useState('breakfast');

  useEffect(() => {
    props.handleDishChange(selectedDish);
  }, [selectedDish]);

  const handleDishChange = (event) => {
    setSelectedDish(event.target.name);
  };

  return (
    <form id='checkboxes'>
      <input 
        type='checkbox' 
        name='breakfast'
        checked={selectedDish === 'breakfast'}
        onChange={handleDishChange}
        />
      <label>Breakfast</label>
      <input 
        type='checkbox' 
        name='lunch'
        checked={selectedDish === 'lunch'}
        onChange={handleDishChange}
      />
      <label>Lunch</label>
      <input 
        type='checkbox' 
        name='dinner'
        checked={selectedDish === 'dinner'}
        onChange={handleDishChange}
        />
      <label>Dinner</label>
      <input 
        type='checkbox' 
        name='dessert'
        checked={selectedDish === 'dessert'}
        onChange={handleDishChange}
        />
      <label>Dessert</label>
    </form>
  );
}
  

export default DishForm;