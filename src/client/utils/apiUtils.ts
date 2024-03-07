import { Model } from '../types';

export const generateRecipe = async (ingredients: string[], model: Model) => {
    const url = 'http://localhost:3000/generate';
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ingredients: ingredients, model: model}),
      });
      const data = await result.json();
      // this data.id is a random string that is used to identify the recipe
      data.id =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to send ingredients to the server.');
    }
  };

  
  

  