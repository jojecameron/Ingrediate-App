const { Router } = require('express');
const routes = Router();

// -------------IMPORT CONTROLLERS-----------

const APIController = require('../controllers/APIControllers');
const IngredientController = require('../controllers/IngredientControllers');
const FavoritesController = require('../controllers/FavoritesController');

// -------------ROUTES------------

routes.get('/', (_req, res) => {
  res.status(200).send('Hello world!');
});

routes.post(
  '/generate',
  IngredientController.processRequest,
  APIController.getGPTResult,
  (_req, res) => {
    const result = { recipe: res.locals.recipe };
    res.status(200).send(JSON.stringify(result));
  }
);

routes.get('/favorites', FavoritesController.getFavorites, (_req, res) => {
  res.status(200).json(res.locals.favorites);
});

routes.post('/favorites', FavoritesController.addFavorite, (_req, res) => {
  res.status(200).json(res.locals.newFavorite);
});

routes.delete('/favorites', FavoritesController.deleteFavorite, (_req, res) => {
  res.sendStatus(200);
});

module.exports = { routes };
