import { Request, Response, NextFunction } from 'express';
import { FavoritesController } from '../types';
import { query } from '../models/postgres';

const FavoritesController: FavoritesController = {
  getFavorites: async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = res.locals.user;
    const text = 'SELECT * FROM favorites WHERE user_id = $1';
    try {
      const favorites = await query({
        text: text,
        params: [user_id],
      });
      if (favorites.rows.length > 0) {
        res.locals.user.favorites = favorites.rows;
      }
      return next();
    } catch (err) {
      return next(err);
    }
  },

  //adding favorites to database
  saveFavorites: async (req: Request, res: Response, next: NextFunction) => {
    const { favorites, user_id } = req.body;
    const text =
      `INSERT INTO
      favorites 
      (id, user_id, "recipeTitle", "recipeText", "recipeLinkTitle", "recipeLink")
      VALUES 
      ($1, $2, $3, $4, $5, $6) 
      ON CONFLICT (id) DO NOTHING
      `;
    try {
      for (const favorite of favorites) {
        const { id, recipeTitle, recipeText, recipeLinkTitle, recipeLink } =
          favorite;
        await query({
          text: text,
          params: [
            id,
            user_id,
            recipeTitle,
            recipeText,
            recipeLinkTitle,
            recipeLink,
          ],
        });
      }
      return next();
    } catch (error) {
      console.error('An error occurred:', error);
      return next({ code: 'INTERNAL_ERROR', message: 'An internal error occurred' });
    }
  },

  //deleting favorite from database
  deleteFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const text = `DELETE FROM favorites WHERE id = $1`;
    try {
      await query({
        text: text,
        params: [id],
      });
      return next();
    } catch (err) {
      return next(err);
    }
  },

  //updating favorite in database
  updateFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const { id, newTitle } = req.body;
    const text = `UPDATE favorites SET "recipeTitle" = $1 WHERE id = $2`;
    try {
      await query({
        text: text,
        params: [newTitle, id],
      });
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

export default FavoritesController;