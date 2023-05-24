const { Router } = require('express');
const routes = Router();



// -------------IMPORT CONTROLLERS-----------

const APIController = require('../controllers/APIControllers');
const IngredientController = require('../controllers/IngredientControllers');


// -------------ROUTES------------

routes.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

routes.get('/gpt', APIController.getGPTResult);

routes.post('/generate', 
  IngredientController.processRequest, 
  APIController.getGPTResult,
  (_req, res) => {
    console.log('This is result', res.locals.recipe);
    const result = { recipe: res.locals.recipe };
    res.status(200).send(JSON.stringify(result));
  }
)

module.exports = { routes };
