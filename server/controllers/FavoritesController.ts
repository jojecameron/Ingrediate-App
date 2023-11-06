import Favorites from '../models/favoritesModel';
import { Request, Response, NextFunction } from 'express';
import { FavoritesController } from '../types';

const FavoritesController: FavoritesController = {
  getFavorites: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    try {
      const favorites = await Favorites.find({});
      res.locals.favorites = favorites;
      return next();
    } catch (err) {
      return next({ err: err });
    }
  },

  //adding favorite to database
  addFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const { index, recipe } = req.body;
    try {
      const newFavorite = await Favorites.create({
        favorites: [{ index, recipe }],
      });
      res.locals.newFavorite = newFavorite;
      return next();
    } catch (err) {
      return next({ err: err });
    }
  },

  //deleting favorite from database
  deleteFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const { index } = req.body;
    try {
      const deletedFavorite = await Favorites.findOneAndDelete({
        'favorites.index': index,
      });
      res.locals.deletedFavorite = deletedFavorite;
    } catch (err) {
      return next({ err: err });
    }
  },
};

export default FavoritesController;
