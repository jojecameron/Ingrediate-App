const { Router } = require('express');
const routes = Router();



// -------------IMPORT CONTROLLERS-----------

const APIController = require('../controllers/APIControllers');
const IngredientController = require('../controllers/IngredientControllers');


// -------------ROUTES------------

routes.get('/', (_req, res) => {
  res.status(200).send('Hello world!');
});

// routes.get('/gpt', APIController.getGPTResult);

routes.post('/generate', 
  IngredientController.processRequest, 
  APIController.getGPTResult,
  (_req, res) => {
    console.log('This is result', res.locals.recipe);
    const result = { recipe: res.locals.recipe };
    res.status(200).send(JSON.stringify(result));
    // res.status(200).send(JSON.stringify({ recipe: `Spinach and Ham Breakfast Quiche: |Ingredients:

    //   - 1 tablespoon butter
    //   - 1 cup fresh spinach, chopped
    //   - 1/2 cup cooked ham, diced
    //   - 1/2 cup cheddar cheese, shredded
    //   - 4 eggs
    //   - 1/4 cup milk
    //   - 1/4 cup red pepper, diced
    //   - Salt and pepper to taste

    //   Instructions:

    //   - Preheat your oven to 375°F (190°C).
    //   - In a skillet, melt the butter over medium heat.
    //   - Add the chopped spinach and diced red pepper to the skillet. Sauté for - 2-3 minutes until the spinach is wilted.
    //   - In a mixing bowl, beat the eggs and milk together. Season with salt and - pepper.
    //   - Grease a pie dish or a baking dish with butter or cooking spray.
    //   - Spread the sautéed spinach and red pepper evenly on the bottom of the dish.
    //   - Sprinkle the diced ham over the vegetables.
    //   - Pour the beaten eggs and milk mixture over the ham and vegetables.
    //   - Sprinkle the shredded cheddar cheese on top.
    //   - Place the dish in the preheated oven and bake for 25-30 minutes or until the eggs are set and the cheese is melted and lightly browned.
    //   - Remove from the oven and let it cool for a few minutes.
    //   - Cut into slices and serve hot.
    //   | Link: |https://www.servedfromscratch.com/spinach-ham-and-cheddar-quiche/`}));
  }
)

module.exports = { routes };
