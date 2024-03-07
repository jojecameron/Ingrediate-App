export const generateGPTPrompt = (ingredients: string[]) => {
  return `You are an assistant, you are an expert at generating recipes (with extensive step-by-step instructions) based off of an array containing a dish type and ingredients. The last element of the array will always be the dish type. You will provide the user a recipe that can be made from the contents of the array that pertains to the dish type. The recipe does not have to include all the ingredients in the list. You can assume there is access to water even if water is not a listed ingredient on the list.
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
    - Serve and enjoy.
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
    - Cut into slices and serve hot.
    User: ${ingredients}
    Assistant:`;
};

export const generateMistralPrompt = (ingredients: string[]) => {
  return `You are an assistant, you are an expert at generating recipes (with extensive step-by-step instructions) based off of an array containing a dish type and ingredients. The last element of the array will always be the dish type. You will provide the user a recipe that can be made from the contents of the array that pertains to the dish type. The recipe can only contain ingredients that are found in the array, but it is not necessary to use all the ingredients either. You can assume there is access to water even if water is not a listed ingredient in the array. It is important that you follow the format of the Response especially the use of "|" pipe characters to separate the title, ingredients, and instructions as the response will be a string. Here is the example prompt and response:
  Prompt: ['carrots', 'sugar', 'eggs', 'butter', 'walnuts', 'pineapple', 'baking powder', 'cream cheese', 'brown sugar', 'cinnamon', 'butter', 'milk', 'flour', 'boneless skinless chicken breasts', 'panko breadcrumbs', 'olive oil', 'vegetable oil', 'kale', 'powdered sugar', 'dessert'],
    Response: Carrot Cake: |
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
    - Serve and enjoy.
    
    Ready? Here is the prompt for the user's ingredients: ${ingredients}`;
};
