const { Router } = require('express');
const routes = Router();
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');


const test = ['snack', 'spinach', 'butter', 'cheddar cheese', 'ham', 'eggs', 'milk', 'red pepper', 'sourdough bread', 'lettuce', 'tomato', 'dark chocolate', 'sugar', 'flour'];

const configuration = new Configuration({
});
const openai = new OpenAIApi(configuration);

const getGPTResult = async (req, res) => {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(test),
      temperature: 0.7,
      max_tokens: 50
    });
    res.status(200).json({ result: completion.data.choices[0].text });
    // res.status(200).json({ result: completion.data.choices });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
};

function generatePrompt(ingredients) {
  // const capitalizedAnimal =
  //   animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  // return `Suggest three names for an animal that is a superhero.

  // Animal: Cat
  // Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
  // Animal: Dog
  // Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
  // Animal: ${capitalizedAnimal}
  // Names:`;

  return `You are an assistant, you are an expert at generating recipes (with extensive step-by-step instructions) based off of an array containing a dish type and ingredients. The first element of the array will always be the dish type. You will provide the user a recipe that can be made from the contents of the array that pertains to the dish type. The recipe does not have to include all the ingredients. You can assume there is access to water even if water is not a listed ingredient on the list. You will also provide a link to a recipe website for each recipe.
  User: ['dessert', 'carrots', 'flour', 'sugar', 'cream cheese', 'eggs', 'butter', 'walnuts', 'pineapple', 'baking powder', 'powdered sugar', 'brown sugar', 'cinnamon', 'butter', 'milk', 'boneless skinless chicken breasts', 'panko breadcrumbs', 'olive oil', 'vegetable oil', 'kale']
  Assistant: Carrot Cake: You can use the carrots, flour, sugar, cream cheese, eggs, butter, walnuts, pineapple, baking powder, powdered sugar, brown sugar, cinnamon, and butter to make a delicious carrot cake. Here is a recipe link: https://www.allrecipes.com/recipe/8235/carrot-cake-iii/
  User: ['breakfast', 'spinach', 'butter', 'cheddar cheese', 'ham', 'eggs', 'milk', 'red pepper']
  Assistant: Spinach and Ham Breakfast Quiche:
  Ingredients:
  1 tablespoon butter
  1 cup fresh spinach, chopped
  1/2 cup cooked ham, diced
  1/2 cup cheddar cheese, shredded
  4 eggs
  1/4 cup milk
  1/4 cup red pepper, diced
  Salt and pepper to taste
  Instructions:
  Preheat your oven to 375°F (190°C).
  In a skillet, melt the butter over medium heat.
  Add the chopped spinach and diced red pepper to the skillet. Sauté for 2-3 minutes until the spinach is wilted.
  In a mixing bowl, beat the eggs and milk together. Season with salt and pepper.
  Grease a pie dish or a baking dish with butter or cooking spray.
  Spread the sautéed spinach and red pepper evenly on the bottom of the dish.
  Sprinkle the diced ham over the vegetables.
  Pour the beaten eggs and milk mixture over the ham and vegetables.
  Sprinkle the shredded cheddar cheese on top.
  Place the dish in the preheated oven and bake for 25-30 minutes or until the eggs are set and the cheese is melted and lightly browned.
  Remove from the oven and let it cool for a few minutes.
  Cut into slices and serve hot.
  Here is a recipe link for reference: https://www.servedfromscratch.com/spinach-ham-and-cheddar-quiche/
  User: ${ingredients}
  Assistant:`;
}

// -------------ROUTES------------

routes.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

routes.get('/gpt', getGPTResult);

module.exports = { routes };
