import { Request, Response, NextFunction } from 'express';

export interface APIController {
  getAPIResult: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
};

export interface FavoritesController {
  getFavorites: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  saveFavorites: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  deleteFavorite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  updateFavorite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};

export interface RecipeController {
  processRequest: (req: Request, res: Response, next: NextFunction) => void;
  parseRecipe: (req: Request, res: Response, next: NextFunction) => void;
};

export interface UserController {
  userSignUp: (req: Request, res: Response, next: NextFunction) => void;
  userLogin: (req: Request, res: Response, next: NextFunction) => void;
  userSignOut: (req: Request, res: Response, next: NextFunction) => void;
}
