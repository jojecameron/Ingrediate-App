const IngredientController = {};

IngredientController.processRequest = (req, res, next) => {
  const { body } = req;
  res.locals.ingredients = body;
  return next();
};

module.exports = IngredientController;
