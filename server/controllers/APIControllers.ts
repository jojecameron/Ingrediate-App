import { Configuration, OpenAIApi } from 'openai';
import { Request, Response, NextFunction } from 'express';
import { APIController } from '../types';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// set true to avoid using OpenAI API, false to use OpenAI API$$
const testMode = true;

const openai = new OpenAIApi(configuration);

const APIController: APIController = {
  getGPTResult: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      if (!testMode) {
        const completion = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: APIController.generatePrompt(res.locals.ingredients),
          temperature: 0.7,
          max_tokens: 350,
        });
        res.locals.recipe = completion.data.choices[0].text;
      } else {
        res.locals.recipe = `Test Mode Recipe: |
        Ingredients:
    
        - Test Ingredients
    
        Instructions:
    
        - Test Instructions

        - Test Instructions

        - Test Instructions

        - Test Instructions|
        Link: |https://www.testmodelink.com`
      }
      return next();
    } catch (error: unknown) {
      let errorMsg = 'An error occurred with the OpenAI API request.';
      if (error instanceof Error) {
        console.error(`Error with OpenAI API request: ${error.message}`);
        errorMsg = error.message;
      } else if (error instanceof Object && 'response' in error) {
        const axiosError = error as { response: { status: number; data: unknown } };
        console.error(axiosError.response.status, axiosError.response.data);
        errorMsg = JSON.stringify(axiosError.response.data);
      }
      return next(new Error(errorMsg));
    }
  },

  generatePrompt(ingredients: string[]) {

    return `You are an assistant, you are an expert at generating recipes (with extensive step-by-step instructions) based off of an array containing a dish type and ingredients. The last element of the array will always be the dish type. You will provide the user a recipe that can be made from the contents of the array that pertains to the dish type. The recipe does not have to include all the ingredients in the list. You can assume there is access to water even if water is not a listed ingredient on the list. You will also provide a link to a similar recipe from a single website for each recipe.
    User: ['carrots', 'flour', 'sugar', 'cream cheese', 'eggs', 'butter', 'walnuts', 'pineapple', 'baking powder', 'powdered sugar', 'brown sugar', 'cinnamon', 'butter', 'milk', 'boneless skinless chicken breasts', 'panko breadcrumbs', 'olive oil', 'vegetable oil', 'kale', 'dessert']
    Assistant: Carrot Cake: |
    Ingredients:

    - 2 cups grated carrots
    - 2 cups all-purpose flour
    - 1 and 1/2 cups granulated sugar
    - 1 cup cream cheese, softened
    - 3 large eggs
    - 1/2 cup unsalted butter, melted
    - 1/2 cup chopped walnuts
    - 1/2 cup crushed pineapple, drained
    - 2 teaspoons baking powder
    - 1 cup powdered sugar
    - 1/2 cup packed brown sugar
    - 2 teaspoons ground cinnamon
    - 1/4 cup unsalted butter, softened

    Instructions:

    - Preheat the oven to 350°F (175°C). Grease and flour a 9-inch round cake pan.
    - In a large mixing bowl, combine the grated carrots, all-purpose flour, granulated sugar, softened cream cheese, eggs, melted butter, chopped walnuts, crushed pineapple, baking powder, brown sugar, and ground cinnamon. Mix well until all the ingredients are evenly incorporated.
    - Pour the batter into the prepared cake pan, spreading it out evenly.
    - Bake in the preheated oven for 35-40 minutes, or until a toothpick inserted into the center of the cake comes out clean.
    - Remove the cake from the oven and let it cool in the pan for 10 minutes. - Then transfer the cake to a wire rack to cool completely.
    - In a small bowl, prepare the cream cheese frosting by combining the powdered sugar and softened butter. Mix until smooth and creamy.
    - Once the cake has cooled, spread the cream cheese frosting evenly over the top of the cake.
    - Serve and enjoy. |
    Link: |https://www.allrecipes.com/recipe/8235/carrot-cake-iii/
    User: ['spinach', 'butter', 'cheddar cheese', 'ham', 'eggs', 'milk', 'red pepper', 'breakfast']
    Assistant: Spinach and Ham Breakfast Quiche: |
    Ingredients:

    - 1 tablespoon butter
    - 1 cup fresh spinach, chopped
    - 1/2 cup cooked ham, diced
    - 1/2 cup cheddar cheese, shredded
    - 4 eggs
    - 1/4 cup milk
    - 1/4 cup red pepper, diced
    - Salt and pepper to taste
    - Instructions:
    - Preheat your oven to 375°F (190°C).
    - In a skillet, melt the butter over medium heat.
    - Add the chopped spinach and diced red pepper to the skillet. Sauté for 2-3 minutes until the spinach is wilted.
    - In a mixing bowl, beat the eggs and milk together. Season with salt and pepper.
    - Grease a pie dish or a baking dish with butter or cooking spray.
    - Spread the sautéed spinach and red pepper evenly on the bottom of the dish.
    - Sprinkle the diced ham over the vegetables.
    - Pour the beaten eggs and milk mixture over the ham and vegetables.
    - Sprinkle the shredded cheddar cheese on top.
    - Place the dish in the preheated oven and bake for 25-30 minutes or until the eggs are set and the cheese is melted and lightly browned.
    - Remove from the oven and let it cool for a few minutes.
    - Cut into slices and serve hot. |
    Link: |https://www.servedfromscratch.com/spinach-ham-and-cheddar-quiche/
    User: ${ingredients}
    Assistant:`;
  },
};

export default APIController;
