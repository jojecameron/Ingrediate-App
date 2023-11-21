import { Router, Request, Response } from 'express';
const routes = Router();

// -------------IMPORT CONTROLLERS-----------

import APIController from '../controllers/APIControllers';
import IngredientController from '../controllers/IngredientControllers';
import FavoritesController from '../controllers/FavoritesController';
import UserController from '../controllers/UserController';

// -------------ROUTES------------

routes.get('/', (_req: Request, res: Response) => {
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

routes.post('/user/signup', UserController.userSignUp, (_req: Request, res: Response) => {
  res.status(200).send('User signed up successfully');
});

routes.post('/user/login', UserController.userLogin, (_req: Request, res: Response) => {
  res.status(200).send('User logged in successfully');
});

routes.post('/user/logout', UserController.userSignOut, (_req: Request, res: Response) => {
  res.status(200).send('User logged out successfully');
});

routes.get('/favorites', FavoritesController.getFavorites, (_req: Request, res: Response) => {
  res.status(200).json(res.locals.favorites);
});

routes.post('/favorites', FavoritesController.addFavorite, (_req: Request, res: Response) => {
  res.status(200).json(res.locals.newFavorite);
});

routes.delete('/favorites', FavoritesController.deleteFavorite, (_req: Request, res: Response) => {
  res.sendStatus(200);
});

export default routes ;
