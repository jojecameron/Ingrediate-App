export const generateRecipe = async (ingredients: string[]) => {
    const url = 'http://localhost:3000/generate';
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredients),
      });
      const data = await result.json();
      // this data.id is a random string that is used to identify the recipe
      data.id =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      return data;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to send ingredients to the server.');
    }
  };

  
  

  