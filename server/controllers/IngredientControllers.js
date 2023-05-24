

const IngredientController = {};

IngredientController.processRequest = (req, res, next) => {
   const { body } = req;
   if (!body) {
    return next('No ingredients in body of request');
   }
   res.locals.ingredients = body;
   return next();
}

module.exports = IngredientController;