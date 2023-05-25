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
      <div>
      <input 
        type='checkbox' 
        className='checkbox'
        name='breakfast'
        checked={selectedDish === 'breakfast'}
        onChange={handleDishChange}
        />
      <label>Breakfast</label>
      </div>
      <div>
      <input 
        type='checkbox' 
        className='checkbox'
        name='lunch'
        checked={selectedDish === 'lunch'}
        onChange={handleDishChange}
      />
      <label>Lunch</label>
      </div>
      <div>
      <input 
        type='checkbox' 
        className='checkbox'
        name='dinner'
        checked={selectedDish === 'dinner'}
        onChange={handleDishChange}
        />
      <label>Dinner</label>
      </div>
      <div>
      <input 
        type='checkbox' 
        className='checkbox'
        name='dessert'
        checked={selectedDish === 'dessert'}
        onChange={handleDishChange}
        />
      <label>Dessert</label>
      </div>
      
    </form>
  );
}
  

export default DishForm;