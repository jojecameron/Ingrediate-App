import { Request, Response, NextFunction } from 'express';

export interface FavoritesController {
  getFavorites: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  addFavorite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  deleteFavorite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export interface IngredientController {
  processRequest: (req: Request, res: Response, next: NextFunction) => void;
}