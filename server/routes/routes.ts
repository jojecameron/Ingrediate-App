import { Router, Request, Response } from 'express';
const routes = Router();

//-------------IMPORT CONTROLLERS-----------//

import APIController from '../controllers/APIController';
import RecipeController from '../controllers/RecipeController';
import FavoritesController from '../controllers/FavoritesController';
import UserController from '../controllers/UserController';

//-------------ROUTES------------//

routes.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Hello world!');
});

//------------RECIPE GENERATOR-----------//

routes.post(
  '/generate',
  RecipeController.processRequest,
  APIController.getGPTResult,
  RecipeController.parseRecipe,
  (_req, res) => {
    const result = { 
      recipeTitle: res.locals.recipeTitle,
      recipeText: res.locals.recipeText,
      recipeLinkTitle: res.locals.recipeLinkTitle,
      recipeLink: res.locals.recipeLink
     };
    res.status(200).send(JSON.stringify(result));
  }
);

//------------USER AUTHENTICATION-----------//

routes.post('/user/signup', UserController.userSignUp, (_req: Request, res: Response) => {
  res.status(200).json(res.locals.user);
});

routes.post('/user/login', UserController.userLogin, FavoritesController.getFavorites, (_req: Request, res: Response) => {
  res.status(200).json(res.locals.user);
});

routes.post('/user/logout', UserController.userSignOut, (_req: Request, res: Response) => {
  res.status(200).send('User logged out successfully');
});

//------------FAVORITES-----------//

// routes.get('/favorites/:user_id', FavoritesController.getFavorites, (_req: Request, res: Response) => {
//   res.status(200).json(res.locals.favorites);
// });

routes.post('/favorites', FavoritesController.saveFavorites, (_req: Request, res: Response) => {
  res.sendStatus(200);
});

routes.delete('/favorites', FavoritesController.deleteFavorite, (_req: Request, res: Response) => {
  res.sendStatus(200);
});

routes.patch('/favorites', FavoritesController.updateFavorite, (_req: Request, res: Response) => {
  res.sendStatus(200);
});

export default routes;
